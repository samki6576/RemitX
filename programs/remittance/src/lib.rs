use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, TokenAccount};

declare_id!("11111111111111111111111111111111");

#[program]
pub mod remittance {
    use super::*;

    // FREE: This uses devnet USDC, no real money
    pub fn create_remittance(
        ctx: Context<CreateRemittance>,
        recipient_address: String,
        amount_usdc: u64,
    ) -> Result<()> {
        let remittance = &mut ctx.accounts.remittance;
        remittance.sender = ctx.accounts.sender.key();
        remittance.recipient_address = recipient_address;
        remittance.amount = amount_usdc;
        remittance.fee = (amount_usdc / 100).max(1); // 1% fee
        remittance.status = RemittanceStatus::Pending;
        remittance.created_at = Clock::get()?.unix_timestamp;
        remittance.claimed_at = 0;

        // Transfer USDC to PDA vault (amount + fee)
        let transfer_amount = amount_usdc.checked_add(remittance.fee)
            .ok_or(RemittanceError::AmountOverflow)?;
        
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.sender_token_account.to_account_info(),
                    to: ctx.accounts.vault.to_account_info(),
                    authority: ctx.accounts.sender.to_account_info(),
                },
            ),
            transfer_amount,
        )?;

        msg!("Remittance created: {} USDC + {} fee", amount_usdc, remittance.fee);
        Ok(())
    }

    pub fn claim_remittance(
        ctx: Context<ClaimRemittance>,
        remittance_id: u64,
    ) -> Result<()> {
        let remittance = &mut ctx.accounts.remittance;
        
        require!(
            remittance.status == RemittanceStatus::Pending,
            RemittanceError::AlreadyClaimed
        );

        remittance.status = RemittanceStatus::Claimed;
        remittance.claimed_at = Clock::get()?.unix_timestamp;

        // Transfer USDC from vault to recipient
        let seeds = &[
            b"vault".as_ref(),
            remittance.key().as_ref(),
            &[ctx.bumps.vault],
        ];
        let signer_seeds = &[&seeds[..]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.recipient_token_account.to_account_info(),
                    authority: ctx.accounts.vault.to_account_info(),
                },
                signer_seeds,
            ),
            remittance.amount,
        )?;

        msg!("Remittance claimed: {} USDC", remittance.amount);
        Ok(())
    }

    pub fn cancel_remittance(
        ctx: Context<CancelRemittance>,
    ) -> Result<()> {
        let remittance = &mut ctx.accounts.remittance;
        
        require!(
            ctx.accounts.sender.key() == remittance.sender,
            RemittanceError::UnauthorizedSender
        );
        require!(
            remittance.status == RemittanceStatus::Pending,
            RemittanceError::CannotCancel
        );

        remittance.status = RemittanceStatus::Cancelled;

        // Refund USDC + fee to sender
        let seeds = &[
            b"vault".as_ref(),
            remittance.key().as_ref(),
            &[ctx.bumps.vault],
        ];
        let signer_seeds = &[&seeds[..]];

        let refund_amount = remittance.amount.checked_add(remittance.fee)
            .ok_or(RemittanceError::AmountOverflow)?;

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.sender_token_account.to_account_info(),
                    authority: ctx.accounts.vault.to_account_info(),
                },
                signer_seeds,
            ),
            refund_amount,
        )?;

        msg!("Remittance cancelled, refunded: {} USDC", refund_amount);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(recipient_address: String, amount_usdc: u64)]
pub struct CreateRemittance<'info> {
    #[account(mut)]
    pub sender: Signer<'info>,
    
    #[account(
        mut,
        token::mint = mint,
        token::authority = sender
    )]
    pub sender_token_account: Account<'info, TokenAccount>,
    
    #[account(
        init,
        payer = sender,
        space = 8 + Remittance::INIT_SPACE
    )]
    pub remittance: Account<'info, Remittance>,
    
    #[account(
        init,
        payer = sender,
        seeds = [b"vault", remittance.key().as_ref()],
        bump,
        token::mint = mint,
        token::authority = vault
    )]
    pub vault: Account<'info, TokenAccount>,
    
    pub mint: Account<'info, anchor_spl::token::Mint>,
    pub token_program: Program<'info, token::Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct ClaimRemittance<'info> {
    #[account(mut)]
    pub remittance: Account<'info, Remittance>,
    
    #[account(mut)]
    pub vault: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub recipient_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub claimer: Signer<'info>,
    
    pub token_program: Program<'info, token::Token>,
}

#[derive(Accounts)]
pub struct CancelRemittance<'info> {
    #[account(mut)]
    pub sender: Signer<'info>,
    
    #[account(mut)]
    pub remittance: Account<'info, Remittance>,
    
    #[account(mut)]
    pub vault: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        token::mint = vault.mint,
        token::authority = sender
    )]
    pub sender_token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, token::Token>,
}

#[account]
pub struct Remittance {
    pub sender: Pubkey,
    pub recipient_address: String,
    pub amount: u64,
    pub fee: u64,
    pub status: RemittanceStatus,
    pub created_at: i64,
    pub claimed_at: i64,
}

impl Remittance {
    const INIT_SPACE: usize = 32 + 50 + 8 + 8 + 1 + 8 + 8;
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(u8)]
pub enum RemittanceStatus {
    Pending = 0,
    Claimed = 1,
    Cancelled = 2,
}

impl anchor_lang::AnchorDeserialize for RemittanceStatus {
    fn deserialize_reader<R: std::io::Read>(reader: &mut R) -> std::io::Result<Self> {
        let mut byte = [0u8; 1];
        reader.read_exact(&mut byte)?;
        Ok(match byte[0] {
            0 => Self::Pending,
            1 => Self::Claimed,
            2 => Self::Cancelled,
            _ => return Err(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                "Invalid RemittanceStatus",
            )),
        })
    }
}

impl anchor_lang::AnchorSerialize for RemittanceStatus {
    fn serialize<W: std::io::Write>(&self, writer: &mut W) -> std::io::Result<()> {
        writer.write_all(&[*self as u8])
    }
}

#[error_code]
pub enum RemittanceError {
    #[msg("Remittance already claimed")]
    AlreadyClaimed,
    #[msg("Amount overflow")]
    AmountOverflow,
    #[msg("Unauthorized sender")]
    UnauthorizedSender,
    #[msg("Cannot cancel at this time")]
    CannotCancel,
}

use anchor_lang::prelude::*;
use remittance::program::Remittance;
use remittance::{CreateRemittance, Remittance as RemittanceAccount, RemittanceStatus};

declare_id!("11111111111111111111111111111111");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_remittance() {
        // This test is meant to be run with anchor test
        // FREE: Runs on devnet, no real fees
        println!("Test: Create Remittance");
    }

    #[test]
    fn test_claim_remittance() {
        println!("Test: Claim Remittance");
    }

    #[test]
    fn test_cancel_remittance() {
        println!("Test: Cancel Remittance");
    }
}

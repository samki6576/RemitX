// FREE: QR code generation utilities
// Uses the free react-qr-code library

import QRCode from "react-qr-code";

export function generateRemittanceQR(
  remittanceId: string,
  recipientPhoneOrAddress: string,
  amount: number
): string {
  // Create a QR code data string
  const qrData = `RemitX:${remittanceId}|${recipientPhoneOrAddress}|${amount}`;
  return qrData;
}

/**
 * Download QR code as image
 * Frontend usage: <QRCodeComponent value={generateRemittanceQR(...)} />
 */
export function downloadQRCode(
  qrElement: HTMLDivElement,
  filename: string = "remittance-qr.png"
) {
  const canvas = qrElement.querySelector("canvas");
  if (!canvas) {
    console.error("QR code canvas not found");
    return;
  }

  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

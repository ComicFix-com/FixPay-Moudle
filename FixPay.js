// fixPay.js
class FixPay {
    constructor() {
        this.amount = 0;
        this.merchantDetails = '';
        this.notes = '';
    }

    // Set amount for the QR code
    setAmount(amount) {
        if (typeof amount === 'number' && amount > 0) {
            this.amount = amount;
        } else {
            throw new Error('Amount must be a positive number.');
        }
    }

    // Set merchant details for the QR code
    setMerchantDetails(details) {
        if (typeof details === 'string' && details.length > 0) {
            this.merchantDetails = details;
        } else {
            throw new Error('Merchant details must be a non-empty string.');
        }
    }

    // Set notes for the QR code
    setNotes(notes) {
        if (typeof notes === 'string') {
            this.notes = notes;
        } else {
            throw new Error('Notes must be a string.');
        }
    }

    // Generate the UPI link for the QR code
    generateUpiLink() {
        if (!this.merchantDetails || this.amount <= 0) {
            throw new Error('Merchant details and amount are required to generate UPI link.');
        }
        return `upi://pay?pa=${this.merchantDetails}&pn=${this.merchantDetails}&mc=1234&tid=${Date.now()}&tn=${this.notes}&am=${this.amount}&cu=INR&url=`;
    }

    // Generate the QR code using a library (like qrcode.js)
    generateQRCode() {
        const upiLink = this.generateUpiLink();
        const qrCodeContainer = document.getElementById('qr-code-container');

        // Clear previous QR code
        qrCodeContainer.innerHTML = '';

        // Assuming a QR code generation library is included
        const qrCode = new QRCode(qrCodeContainer, {
            text: upiLink,
            width: 256,
            height: 256,
        });

        return qrCode;
    }
}

// Export the FixPay module
export default FixPay;

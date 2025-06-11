require('dotenv').config();
const imaps = require('imap-simple');

async function getOTPFromEmail() {
    const config = {
        imap: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASS,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false, // Ignore SSL errors
            },
            authTimeout: 3000,
        },
    };

    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');
        for (let attempt = 1; attempt <= 3; attempt++) {
            // console.log(`Attempt ${attempt}: Searching for OTP email...`);
            const searchCriteria = ["UNSEEN", ["SUBJECT", "Forgot Password OTP"]];
            const fetchOptions = { bodies: ["TEXT"], markSeen: true, struct: true };
            const messages = await connection.search(searchCriteria, fetchOptions);

            if (messages.length > 0) {
                // Sort emails by date (latest first)
                messages.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));

                for (let msg of messages) {
                    const text = msg.parts.find(part => part.which === "TEXT").body;
                    const otpMatch = text.match(/\b\d{6}\b/);
                    if (otpMatch) {
                        console.log("✅ OTP Found:", otpMatch[0]);
                        return otpMatch[0]; // Return the latest OTP
                    }
                }
            }

            if (attempt < 3) {
                console.log(`⚠️ No OTP found. Retrying in 3 seconds...`);
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        }

        console.log("⚠️ No OTP found after 3 attempts.");
        return null;
    } catch (error) {
        console.error("❌ Error fetching OTP:", error);
    }
}

module.exports = getOTPFromEmail;

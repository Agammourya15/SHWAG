import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    let transporter;
    let isTestAccount = false;

    // Use actual credentials if they exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    } else {
        // Automatically create a fake test account with Ethereal Email for development
        const testAccount = await nodemailer.createTestAccount();
        isTestAccount = true;
        
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        
        console.log(`\n[DEVELOPMENT MODE] Using generated Ethereal test account...`);
    }

    try {
        const mailOptions = {
            from: isTestAccount ? '"SHWAG App" <noreply@shwag.com>' : `"SHWAG" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html, // Optional HTML format
        };

        const info = await transporter.sendMail(mailOptions);
        
        if (isTestAccount) {
            console.log(`=============================================================`);
            console.log(`✉️ Email Successfully Sent!`);
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
            console.log(`(Ctrl+Click or Cmd+Click the URL to view the generated email)`);
            console.log(`=============================================================\n`);
        }
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

export default sendEmail;

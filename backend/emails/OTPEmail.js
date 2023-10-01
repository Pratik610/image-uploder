import nodemailer from 'nodemailer'

export const OtpMail = (otp) => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		sendMail: true,
		port: 587,
		auth: {
			user: 'prat1ksupek4r@gmail.com',
			pass: 'nfhg ynnh iyzi ormf',
		},
	})

	var mailOptions = {
		from: 'prat1ksupek4r@gmail.com',
		to: 'pratik@emotorad.com',
		subject: 'OTP',
		html: ` 
        <p>Hi,</p>
        <p>  To enhance the security of your account, we have implemented Two-Factor Authentication (2FA) for your account. To ensure it's you logging in, we are providing you with a One-Time Password (OTP) via email.</p>
        <p>Please find your OTP below:</p>
        <h1>${otp}</h1>
        `,
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
}

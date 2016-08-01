var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


class eMail {

	constructor (){
		new Promise((resolve, reject) => {

			let config = App.config.email;
			this.transporter = nodemailer.createTransport(smtpTransport(config));

			console.log(`Email transport initialized: ${config.host}`);

		}).catch(console.log)
	}


	send ({from, to, subject, text, attachments}) {
		return new Promise((resolve, reject) => this.transporter.sendMail({
				from : from || (from = App.config.email.from),
				to, subject, text, attachments
			}, (error, res) => 
				error ? reject(error) : resolve(res)
			)
		)
			.then(
				response => console.log(`message sent to ${to}:`, response),
				error => console.error(`message doen't sent to ${to}:`, error)
			)

	}
}

module.exports = new eMail;
const client = require('@sendgrid/mail');
client.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (req, res, next) => {
	const params = {
		firstName: req.body.firstName,
		transCode: req.body.transCode,
		email: req.body.email
	};
	client
		.send({
			to: {
				email: params.email,
				name: params.firstName
			},
			from: {
				email: process.env.SECRET_EMAIL,
				name: 'IExchange'
			},
			templateId: 'd-13fd210b1d6c426e85c92307b91e8fab',
			dynamicTemplateData: {
				firstName: params.firstName,
				transCode: params.transCode
			}
		})
		.then(() => {
			console.log('email sent');
		});
};

exports.sendEmail = sendEmail;

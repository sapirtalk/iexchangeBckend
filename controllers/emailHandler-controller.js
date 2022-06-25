const client = require('@sendgrid/mail');
const undici = require('undici');

client.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res, next) => {
	const params = {
		firstName: req.body.firstName,
		transCode: req.body.transCode,
		email: req.body.email,
		recapchaToken: req.body.token
	};

	const recaptcha = await undici.request(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env
			.RECAPCHA_SECRET_KEY}&response=${params.recapchaToken}`,
		{
			method: 'POST'
		}
	);

	const recaptchaRes = await recaptcha.body.json();
	console.log(recaptchaRes);

	if (recaptchaRes.success === false) return res.status(403).json({ message: 'Recapcha failed' });

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

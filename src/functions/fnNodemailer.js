import nodemailer from 'nodemailer'

const fnNodemailer = async (toEmail) => {

    let isSendEmail = false
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        service: 'Zoho',
        port: 25,
        secure: false,
        auth: {
            user: process.env.EMAIL_CONTATO_CAPIXABAY,
            pass: process.env.EMAIL_CONTATO_CAPIXABAY_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    /*
        from de: xxxxx 
        to para: xxxxxxx
    */
    
    const _config  = {
        from:process.env.EMAIL_CONTATO_CAPIXABAY,
        to:toEmail,
        subject:"Capixabay Código Acesso",
        html:'<h1>E-mail enviado de contato@capixabay<h1>'
    }

    const fnTransporter = async () =>  {
        try {
            transporter.sendMail(_config, (err, info) => { 
                if (err) {                 
                    console.log('-- Error envio email ---', err)
                    isSendEmail = false
                    transporter.close()
                }
                if(info) {
                    console.log('info e-mail ->', info)
                    isSendEmail = true
                    transporter.close()
                }
            })
        } catch (error) {
            console.log('Não foi possivel enviar e-mail!')
        }
    }
    await fnTransporter()
    return isSendEmail
}

export default fnNodemailer
import sendgrid from "@sendgrid/mail"
import type { NextApiRequest, NextApiResponse } from "next"

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

export default async function sendEmail(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await sendgrid.send({
			to: req.body.kreatorEmail,
			from: "smashbros54@gmail.com",
			subject: req.body.subject,
			text: req.body.message,
			html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      
        <title>The HTML5 Herald</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>You've got a new mail from ${req.body.fullname}, their email is: ✉️${req.body.email} </h3>
              <div style="font-size: 16px;">
              <p>Message:</p>
              <p>${req.body.message}</p>
              <br>
              </div>
              
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Samuel Paintsil<br>HR, DigiKoncept<br>+233501083601</p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                <a href="https://digi-koncept.vercel.app/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
                <a href="https://samuelpaintsil-beta.netlify.app" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Blog</a>
              </div>
              </div>
      </body>
      </html>`,
		})
	} catch (error: any) {
		return res.status(error.statusCode || 500).json({ error: error.message })
	}

	return res.status(200).json({ success: true })
}

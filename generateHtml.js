const generateHtml = (token, reqType) => {

  const baseStyles = `
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

      @media only screen and (min-width: 520px) {
        .u-row { width: 500px !important; }
        .u-row .u-col { vertical-align: top; }
        .u-row .u-col-100 { width: 500px !important; }
      }
      @media (max-width: 520px) {
        .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; }
        .u-row .u-col { min-width: 320px !important; max-width: 100% !important; display: block !important; }
        .u-row { width: 100% !important; }
        .u-col { width: 100% !important; }
        .u-col > div { margin: 0 auto; }
      }

      body { margin: 0; padding: 0; }
      table, tr, td { vertical-align: top; border-collapse: collapse; }
      p { margin: 0; }
      .ie-container table, .mso-container table { table-layout: fixed; }
      * { line-height: inherit; }
      a[x-apple-data-detectors='true'] { color: inherit !important; text-decoration: none !important; }
      table, td { color: #000000; }
    </style>
  `;

  const emailWrapper = (content) => `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  ${baseStyles}
</head>

<body style="margin:0;padding:0;-webkit-text-size-adjust:100%;background-color:#f0f7ee;color:#000000;">
<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->

<table style="border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;min-width:320px;margin:0 auto;background-color:#f0f7ee;width:100%;" cellpadding="0" cellspacing="0">
<tbody><tr style="vertical-align:top;"><td style="word-break:break-word;border-collapse:collapse !important;vertical-align:top;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#f0f7ee;"><![endif]-->

<div class="u-row-container" style="padding:24px 0;background-color:transparent;">
  <div class="u-row" style="margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent;">
    <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color:transparent;"><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="500" style="width:500px;padding:0;border-radius:0;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width:320px;min-width:500px;display:table-cell;vertical-align:top;">
        <div style="height:100%;width:100% !important;border-radius:0;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing:border-box;height:100%;padding:0;"><!--<![endif]-->

          <!-- EMAIL CARD WRAPPER -->
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"
            style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 2px 24px rgba(63,110,30,0.10);">
            <tbody>

              <!-- HEADER -->
              <tr>
                <td style="padding:0;background:linear-gradient(135deg,#4a8c23 0%,#6dbd3a 60%,#9dd96a 100%);border-radius:20px 20px 0 0;text-align:center;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody><tr><td style="padding:40px 40px 36px;text-align:center;">

                      <!-- Logo circle -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 20px;">
                        <tbody><tr><td style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.2);border:2px solid rgba(255,255,255,0.5);text-align:center;vertical-align:middle;">
                          <span style="font-family:'DM Serif Display',Georgia,serif;font-size:26px;color:#ffffff;font-weight:400;letter-spacing:1px;">F</span>
                        </td></tr></tbody>
                      </table>

                      <h1 style="margin:0 0 6px;font-family:'DM Serif Display',Georgia,serif;font-size:13px;font-weight:400;color:rgba(255,255,255,0.75);letter-spacing:3px;text-transform:uppercase;">Formeze</h1>
                      ${content.headerTitle}
                      <p style="margin:8px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.82);font-weight:300;letter-spacing:0.3px;">${content.headerSubtitle}</p>

                    </td></tr></tbody>
                  </table>
                </td>
              </tr>

              <!-- BODY -->
              <tr>
                <td style="padding:36px 40px 28px;background-color:#ffffff;">

                  <!-- Greeting -->
                  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;color:#3a3a3a;margin:0 0 14px;font-weight:400;">Dear Tanishq,</p>

                  <!-- Message -->
                  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#5a5a5a;line-height:1.75;margin:0 0 28px;font-weight:300;">${content.bodyText}</p>

                  <!-- CTA Button -->
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tbody><tr><td style="text-align:center;padding:0 0 28px;">
                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${content.ctaUrl}" style="height:48px;v-text-anchor:middle;width:220px;" arcsize="12%" stroke="f" fillcolor="#4a8c23"><w:anchorlock/><center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${content.ctaLabel}</center></v:roundrect><![endif]-->
                      <!--[if !mso]><!-->
                      <a href="${content.ctaUrl}" target="_blank"
                        style="display:inline-block;text-decoration:none;text-align:center;color:#ffffff;background:linear-gradient(135deg,#4a8c23,#6dbd3a);border-radius:12px;font-family:'DM Sans',Arial,sans-serif;font-size:15px;font-weight:500;letter-spacing:0.4px;padding:14px 48px;mso-border-alt:none;">
                        ${content.ctaLabel}
                      </a>
                      <!--<![endif]-->
                    </td></tr></tbody>
                  </table>

                  <!-- Expiry / info notice -->
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                    style="background-color:#f4fbef;border:1px solid #c9e8b0;border-radius:10px;margin-bottom:28px;">
                    <tbody><tr>
                      <td style="width:14px;padding:14px 4px 14px 16px;vertical-align:top;font-size:18px;">&#9679;</td>
                      <td style="padding:14px 16px 14px 6px;">
                        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#4a6e2e;line-height:1.6;margin:0;">${content.noticeText}</p>
                      </td>
                    </tr></tbody>
                  </table>

                  <!-- Footer message -->
                  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:13.5px;color:#5a5a5a;line-height:1.75;margin:0 0 20px;font-weight:300;">${content.footerBody}</p>

                  <!-- Sign-off -->
                  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#3a3a3a;margin:0 0 4px;">Best regards,</p>
                  <p style="font-family:'DM Serif Display',Georgia,serif;font-size:16px;color:#4a8c23;margin:0;">Formeze</p>

                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td style="padding:20px 40px;background-color:#f8fdf4;border-top:1px solid #e8f5df;border-radius:0 0 20px 20px;text-align:center;">
                  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#b0c89a;margin:0 0 6px;">
                    &copy; 2026 Formeze. All rights reserved.
                  </p>
                  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#b0c89a;margin:0;">
                    If you have questions, contact us at
                    <a href="mailto:support@formeze.com" style="color:#4a8c23;text-decoration:none;">support@formeze.com</a>
                  </p>
                </td>
              </tr>

            </tbody>
          </table>
          <!-- END EMAIL CARD -->

        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>

<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
</td></tr></tbody>
</table>

<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
</body>
</html>`;

  if (reqType === "verify") {
    return emailWrapper({
      headerTitle: `<h2 style="margin:0;font-family:'DM Serif Display',Georgia,serif;font-size:26px;font-weight:400;color:#ffffff;letter-spacing:0.2px;">Verify Your Account</h2>`,
      headerSubtitle: "One small step to complete your account setup",
      bodyText: "Thank you for signing up for Formeze. To complete your account registration and ensure the security of your account, we need to verify your email address. Please click the button below to verify your email and activate your account.",
      ctaUrl: `http://localhost:5000/api/auth/verify/${token}/`,
      ctaLabel: "Verify My Email Address",
      noticeText: "This link is valid for <strong>24 hours</strong>. Once verified, you'll have full access to your account and all its features.",
      footerBody: "If you did not sign up for an account with us, please disregard this email. Your account will not be activated until your email address is verified. If you have any questions or need further assistance, please don't hesitate to contact us.",
    });
  }

  return emailWrapper({
    headerTitle: `<h2 style="margin:0;font-family:'DM Serif Display',Georgia,serif;font-size:26px;font-weight:400;color:#ffffff;letter-spacing:0.2px;">Reset Your Password</h2>`,
    headerSubtitle: "Follow the steps below to set a new password",
    bodyText: "We received a request to reset the password associated with your Formeze account. Click the button below and you'll be directed to a secure page where you can create a new password.",
    ctaUrl: `http://localhost:5000/api/auth/reset/${token}/`,
    ctaLabel: "Reset My Password",
    noticeText: "This password reset link is valid for a <strong>limited time only</strong>. If you did not request a reset, you can safely ignore this email — your password will remain unchanged.",
    footerBody: "If you continue to experience issues or have any questions, please don't hesitate to contact our support team for assistance. Thank you for using Formeze.",
  });

};

module.exports = generateHtml;

const generateHtml = (token, reqType,name) => {
  const baseStyles = `
      <style type="text/css">
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

  const headerDoodles = `
  <div style="
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    pointer-events:none;
    overflow:hidden;
    opacity:0.9;
    z-index:0;
  ">
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 220"
      preserveAspectRatio="xMidYMid slice"
      style="width:100%;height:100%;">

      <!-- soft doodles background -->
      <g stroke="rgba(255,255,255,0.18)" fill="none" stroke-width="1.5" stroke-linecap="round">

        <!-- leaves -->
        <path d="M28 18 Q44 8 52 28 Q36 32 28 18 Z"/>
        <path d="M40 23 L52 28"/>

        <path d="M18 38 Q10 20 30 16 Q28 32 18 38 Z"/>
        <path d="M24 27 L30 16"/>

        <!-- stars -->
        <line x1="452" y1="22" x2="452" y2="32"/>
        <line x1="447" y1="27" x2="457" y2="27"/>

        <line x1="478" y1="14" x2="478" y2="20"/>
        <line x1="475" y1="17" x2="481" y2="17"/>

        <!-- waves -->
        <path d="M0 195 Q20 185 40 195 Q60 205 80 195 Q100 185 120 195"/>
        <path d="M380 200 Q400 190 420 200 Q440 210 460 200 Q480 190 500 200"/>

      </g>

      <!-- soft dots -->
      <g fill="rgba(255,255,255,0.15)">
        <circle cx="80" cy="12" r="2.5"/>
        <circle cx="420" cy="60" r="2"/>
        <circle cx="490" cy="40" r="3"/>
        <circle cx="110" cy="25" r="1.5"/>
      </g>

    </svg>
  </div>
`;

  // SVG doodles for the white body section
  const bodyDoodles = `
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 480" preserveAspectRatio="xMidYMid slice"
          style="position:absolute;top:0;left:0;width:100%;height:100%;">
          <!-- Leaf cluster top-right -->
          <g stroke="#c8e8c0" fill="none" stroke-width="1.3" stroke-linecap="round">
            <path d="M 468 18 Q 486 8 492 26 Q 476 30 468 18 Z"/>
            <path d="M 480 22 L 492 26"/>
            <path d="M 482 36 Q 496 24 498 42 Q 484 44 482 36 Z"/>
            <path d="M 490 39 L 498 42"/>
          </g>
          <!-- Leaf cluster bottom-left -->
          <g stroke="#c8e8c0" fill="none" stroke-width="1.2" stroke-linecap="round">
            <path d="M 12 440 Q 4 424 18 428 Q 18 440 12 440 Z"/>
            <path d="M 15 434 L 18 428"/>
            <path d="M 24 460 Q 12 446 26 448 Q 28 460 24 460 Z"/>
            <path d="M 25 454 L 26 448"/>
          </g>
          <!-- Dots scatter -->
          <g fill="#d4edda">
            <circle cx="18" cy="20" r="3"/>
            <circle cx="488" cy="60" r="2.5"/>
            <circle cx="10" cy="380" r="2"/>
            <circle cx="492" cy="420" r="3"/>
            <circle cx="30" cy="130" r="1.8"/>
            <circle cx="476" cy="200" r="2"/>
          </g>
          <!-- Dashed arc top-left -->
          <path d="M 0 80 Q 30 40 70 60" stroke="#d4edda" fill="none" stroke-width="1.2" stroke-dasharray="3,4" stroke-linecap="round"/>
          <!-- Star right side mid -->
          <g stroke="#b6dfc0" fill="none" stroke-width="1.2" stroke-linecap="round">
            <line x1="490" y1="140" x2="490" y2="148"/><line x1="486" y1="144" x2="494" y2="144"/>
            <line x1="488" y1="141" x2="492" y2="147"/><line x1="492" y1="141" x2="488" y2="147"/>
          </g>
          <!-- Curl top-left -->
          <path d="M 22 72 Q 30 60 40 68 Q 46 78 36 82 Q 26 84 24 76" stroke="#c8e8c0" fill="none" stroke-width="1.2" stroke-linecap="round"/>
          <!-- Arrow doodle near button -->
          <g stroke="#b6dfc0" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 36 248 Q 44 240 52 248"/>
            <line x1="50" y1="244" x2="52" y2="248"/><line x1="52" y1="248" x2="48" y2="252"/>
          </g>
        </svg>
      </div>
    `;

  // SVG doodles for the footer
  const footerDoodles = `
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 80" preserveAspectRatio="xMidYMid slice"
          style="position:absolute;top:0;left:0;width:100%;height:100%;">
          <g stroke="#c8e8c0" fill="none" stroke-width="1.2" stroke-linecap="round">
            <path d="M 18 20 Q 30 10 38 24 Q 24 28 18 20 Z"/>
            <path d="M 28 22 L 38 24"/>
            <path d="M 452 18 Q 464 8 472 22 Q 458 26 452 18 Z"/>
            <path d="M 462 20 L 472 22"/>
          </g>
          <g fill="#c8e8c0">
            <circle cx="80" cy="14" r="2"/>
            <circle cx="420" cy="18" r="2"/>
            <circle cx="50" cy="55" r="1.5"/>
            <circle cx="458" cy="58" r="1.5"/>
          </g>
          <g stroke="#c8e8c0" fill="none" stroke-width="1.2" stroke-linecap="round">
            <line x1="110" y1="18" x2="110" y2="24"/><line x1="107" y1="21" x2="113" y2="21"/>
            <line x1="390" y1="14" x2="390" y2="20"/><line x1="387" y1="17" x2="393" y2="17"/>
          </g>
        </svg>
      </div>
    `;

  const emailWrapper = (
    content,
  ) => `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
  </head>

  <body style="margin:0;padding:0;-webkit-text-size-adjust:100%;background-color:#e8f5e2;color:#000000;">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->

  <table style="border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;min-width:320px;margin:0 auto;background-color:#e8f5e2;width:100%;" cellpadding="0" cellspacing="0">
  <tbody><tr style="vertical-align:top;"><td style="word-break:break-word;border-collapse:collapse !important;vertical-align:top;">
  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#e8f5e2;"><![endif]-->

  <div class="u-row-container" style="padding:28px 0;background-color:transparent;">
    <div class="u-row" style="margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent;">
      <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="500" style="width:500px;padding:0;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width:320px;min-width:500px;display:table-cell;vertical-align:top;">
          <div style="height:100%;width:100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing:border-box;height:100%;padding:0;"><!--<![endif]-->

            <!-- CARD -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"
              style="background-color:#ffffff;border-radius:16px;overflow:hidden;">
              <tbody>

                <!-- HEADER -->
                <tr>
                  <td style="background-color:#1a5c2a;padding:44px 40px 36px;text-align:center;position:relative;">
                    <!--[if !mso]><!-->
                    ${headerDoodles}
                    <!--<![endif]-->

                    <!-- Icon circle -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"
                      style="margin:0 auto 22px;position:relative;z-index:2;">
                      <tbody><tr>
                        <td style="width:72px;height:72px;border-radius:50%;border:2px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.1);text-align:center;vertical-align:middle;">
                          ${content.headerIcon}
                        </td>
                      </tr></tbody>
                    </table>

                    <p style="font-family:'Sora',Arial,sans-serif;font-size:10px;letter-spacing:3.5px;text-transform:uppercase;color:rgba(255,255,255,0.5);margin:0 0 10px;font-weight:400;position:relative;z-index:2;">Formeze</p>
                    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:400;color:#ffffff;margin:0 0 10px;line-height:1.25;position:relative;z-index:2;">${content.headerTitle}</h1>
                    <p style="font-family:'Sora',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.6);margin:0;font-weight:300;position:relative;z-index:2;">${content.headerSubtitle}</p>
                  </td>
                </tr>

                <!-- BODY -->
                <tr>
                  <td style="padding:36px 40px 32px;background-color:#ffffff;position:relative;">
                    <!--[if !mso]><!-->
                    ${bodyDoodles}
                    <!--<![endif]-->

                    <div style="position:relative;z-index:1;">
                      <!-- Greeting -->
                      <p style="font-family:'Sora',Arial,sans-serif;font-size:15px;color:#1a1a1a;margin:0 0 14px;font-weight:400;">Hi Tanishq,</p>

                      <!-- Message -->
                      <p style="font-family:'Sora',Arial,sans-serif;font-size:13.5px;color:#555555;line-height:1.8;margin:0 0 30px;font-weight:300;">${content.bodyText}</p>

                      <!-- CTA -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tbody><tr><td style="text-align:center;padding:0 0 28px;">
                          <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${content.ctaUrl}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="8%" stroke="f" fillcolor="#1a5c2a"><w:anchorlock/><center style="color:#ffffff;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">${content.ctaLabel}</center></v:roundrect><![endif]-->
                          <!--[if !mso]><!-->
                          <a href="${content.ctaUrl}" target="_blank"
                            style="display:inline-block;text-decoration:none;text-align:center;color:#ffffff;background-color:#1a5c2a;border-radius:8px;font-family:'Sora',Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:0.5px;padding:14px 44px;mso-border-alt:none;">
                            ${content.ctaLabel}
                          </a>
                          <!--<![endif]-->
                        </td></tr></tbody>
                      </table>

                      <!-- Notice -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                        style="background-color:#f0faf2;border:1px solid #b6dfc0;border-radius:10px;margin-bottom:28px;">
                        <tbody><tr>
                          <td style="width:24px;padding:14px 0 14px 16px;vertical-align:top;">
                            <div style="width:8px;height:8px;border-radius:50%;background-color:#2e8b4a;margin-top:4px;"></div>
                          </td>
                          <td style="padding:14px 16px 14px 8px;">
                            <p style="font-family:'Sora',Arial,sans-serif;font-size:12.5px;color:#1a5c2a;line-height:1.65;margin:0;">${content.noticeText}</p>
                          </td>
                        </tr></tbody>
                      </table>

                      <!-- Divider -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;">
                        <tbody><tr><td style="height:1px;background-color:#eef5ef;font-size:0;line-height:0;">&nbsp;</td></tr></tbody>
                      </table>

                      <!-- Closing -->
                      <p style="font-family:'Sora',Arial,sans-serif;font-size:13px;color:#666666;line-height:1.75;margin:0 0 20px;font-weight:300;">${content.closingText}</p>

                      <!-- Sign-off -->
                      <p style="font-family:'Sora',Arial,sans-serif;font-size:13px;color:#888888;margin:0;">Warm regards,</p>
                      <p style="font-family:'Playfair Display',Georgia,serif;font-size:17px;color:#1a5c2a;margin:4px 0 0;">Formeze</p>
                    </div>
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="padding:20px 40px;background-color:#f5faf6;border-top:1px solid #d4edda;text-align:center;position:relative;">
                    <!--[if !mso]><!-->
                    ${footerDoodles}
                    <!--<![endif]-->
                    <div style="position:relative;z-index:1;">
                      <p style="font-family:'Sora',Arial,sans-serif;font-size:11.5px;color:#8ab89a;margin:0 0 4px;line-height:1.7;">
                        &copy; 2026 Formeze &nbsp;&middot;&nbsp;
                        <a href="mailto:formeze.service@gmail.com" style="color:#2e8b4a;text-decoration:none;">formeze.service@gmail.com</a>
                      </p>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>

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
      headerIcon: `<span style="font-family:Arial,sans-serif;font-size:26px;color:#ffffff;line-height:1;">&#10003;</span>`,
      headerTitle: "Verify your account",
      headerSubtitle: "Confirm your email to unlock full access",
      bodyText:
        "Welcome to Formeze! We're glad you're here. To complete your registration and keep your account secure, please verify your email address by clicking the button below.",
      ctaUrl: `https://formeze.netlify.app/verify/${token}/`,
      ctaLabel: "Verify my email address",
      noticeText: `This link expires in <strong>24 hours</strong>. If you didn't create a Formeze account, you can safely ignore this email — no action is required.`,
      closingText: `Once verified, you'll have full access to all features. If you need any help, reach out to us anytime at <a href="mailto:formeze.service@gmail.com" style="color:#2e8b4a;text-decoration:none;">formeze.service@gmail.com</a>.`,
    });
  }
  if (reqType === "newMsg") {
   return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Message — Formeze</title>
</head>

<body style="margin:0;padding:0;background-color:#0f1117;font-family:Arial,Helvetica,sans-serif;color:#e8efe9;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#0f1117">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- Main Container -->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;">

        <!-- Top Bar -->
        <tr>
          <td style="padding-bottom:24px;">

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>

                <!-- Logo -->
                <td align="left" valign="middle">

                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:10px;">

                        <table role="presentation" width="36" height="36" cellspacing="0" cellpadding="0" border="0" bgcolor="#2ACA65" style="border-radius:10px;">
                          <tr>
                            <td align="center" valign="middle" style="font-size:16px;font-weight:bold;color:#04140a;">
                              <img src="https://formeze.netlify.app/public/logo.png?t=1778682876841" alt="Formeze Logo" width="20" height="20" style="display:block;">
                            </td>
                          </tr>
                        </table>

                      </td>

                      <td valign="middle" style="font-size:22px;font-weight:800;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
                        formeze
                      </td>
                    </tr>
                  </table>

                </td>

                <!-- Badge -->
                <td align="right" valign="middle">
                  <span style="display:inline-block;padding:6px 14px;border:1px solid #2ACA65;border-radius:20px;font-size:11px;font-weight:bold;color:#2ACA65;text-transform:uppercase;letter-spacing:1px;">
                    New Message
                  </span>
                </td>

              </tr>
            </table>

          </td>
        </tr>

        <!-- Hero Card -->
        <tr>
          <td bgcolor="#161b22" style="border-radius:20px;border:1px solid #222831;overflow:hidden;">

            <!-- Top Accent -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td height="5" bgcolor="#2ACA65"></td>
              </tr>
            </table>

            <!-- Body -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:40px 32px;">

                  <!-- Notification Pill -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
                    <tr>
                      <td bgcolor="#1d2b22" style="border:1px solid #2ACA65;border-radius:30px;padding:8px 14px;font-size:12px;font-weight:bold;color:#2ACA65;">
                        ● Incoming message received
                      </td>
                    </tr>
                  </table>

                  <!-- Heading -->
                  <div style="font-size:34px;line-height:42px;font-weight:800;color:#ffffff;padding-bottom:16px;">
                    You've got a<br>
                    <span style="color:#2ACA65;">new message.</span>
                  </div>

                  <!-- Description -->
                  <div style="font-size:15px;line-height:26px;color:#8a9ba8;">
                    A visitor just submitted a message through your Formeze form.
                    Head to your dashboard to read the full message and reply.
                  </div>

                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="center" style="padding:32px;border-top:1px solid #222831;">

                  <div style="font-size:13px;color:#819097;padding-bottom:18px;">
                    Log in to your dashboard to read the full message
                  </div>

                  <!-- Button -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td align="center" bgcolor="#2ACA65" style="border-radius:12px;">
                        <a href="https://formeze.netlify.app/dashboard"
                           style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:bold;color:#04140a;text-decoration:none;">
                          View Message →
                        </a>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Spacer -->
        <tr>
          <td height="24"></td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center">

            <!-- Footer Links -->
            <div style="padding-bottom:16px;">
              <a href="https://formeze.netlify.app/dashboard"
                 style="font-size:12px;color:#5d6b75;text-decoration:none;margin:0 10px;">
                Dashboard
              </a>

              <a href="https://formeze.netlify.app/settings"
                 style="font-size:12px;color:#5d6b75;text-decoration:none;margin:0 10px;">
                Unsubscribe
              </a>

              <a href="https://formeze.netlify.app/help"
                 style="font-size:12px;color:#5d6b75;text-decoration:none;margin:0 10px;">
                Help
              </a>
            </div>

            <!-- Copyright -->
            <div style="font-size:11px;line-height:20px;color:#7b7f81;">
              You're receiving this because message notifications are enabled
              for your Formeze account.
              <br>
              © 2026 Formeze. All rights reserved.
            </div>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`
  }

  if(reqType ==="resetSuccessful"){
    return `
    <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>Password Reset Successful – Formeze</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }

    @media only screen and (max-width: 599px) {
      .email-wrapper  { padding: 20px 12px !important; }
      .card-header    { padding: 28px 24px 24px !important; }
      .card-body      { padding: 24px 24px 28px !important; }
      .card-alert     { padding: 0 24px 28px !important; }
      .card-footer    { padding: 20px 24px 24px !important; }
      .headline       { font-size: 25px !important; line-height: 1.22 !important; }
      .divider-wrap   { padding: 0 24px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#081008;">

  <!-- Preview text -->
  <div style="display:none;font-size:1px;color:#081008;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    Your Formeze password has been reset successfully — sign in with your new credentials.&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
  </div>

  <!-- Wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="email-wrapper"
    style="background-color:#081008;background-image:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(41,201,100,0.13) 0%,transparent 65%);padding:48px 16px;font-family:'Inter',Arial,sans-serif;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560"
          style="max-width:560px;width:100%;background-color:#0d1a0e;border-radius:18px;overflow:hidden;border:1px solid rgba(41,201,100,0.18);box-shadow:0 0 0 1px rgba(41,201,100,0.08),0 32px 64px rgba(0,0,0,0.55);">

          <!-- ── HEADER ── -->
          <tr>
            <td class="card-header" style="padding:36px 44px 32px;background:linear-gradient(160deg,#0f2012 0%,#0d1a0e 100%);border-bottom:1px solid rgba(41,201,100,0.10);">

              <!-- Logo -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <!-- Green rounded square -->
                  <td style="width:38px;height:38px;background:#29C964;border-radius:9px;text-align:center;vertical-align:middle;">
                    <!-- Formeze icon: document with form lines + checkbox, white on green -->
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;">
                      <!-- Document body -->
                      <rect x="3.5" y="1.5" width="13" height="16" rx="2" stroke="white" stroke-width="1.4" fill="none"/>
                      <!-- Folded corner dog-ear -->
                      <path d="M12.5 1.5 L16.5 5.5 L12.5 5.5 Z" fill="white" opacity="0.9"/>
                      <!-- Checkbox (top-left of form) -->
                      <rect x="5.5" y="8" width="3" height="3" rx="0.6" stroke="white" stroke-width="1.2" fill="none"/>
                      <!-- Checkmark inside checkbox -->
                      <path d="M6.2 9.4 L7 10.2 L8.5 8.6" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                      <!-- Form lines -->
                      <line x1="10.5" y1="9" x2="14.5" y2="9" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                      <line x1="10.5" y1="11" x2="14.5" y2="11" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                      <!-- Bottom lines -->
                      <line x1="5.5" y1="13.5" x2="14.5" y2="13.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                      <line x1="5.5" y1="15.5" x2="11"   y2="15.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                    </svg>
                  </td>
                  <td style="padding-left:11px;vertical-align:middle;">
                    <span style="font-family:'Inter',Arial,sans-serif;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.4px;">Formeze</span>
                  </td>
                </tr>
              </table>

              <!-- Badge -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td style="background:rgba(41,201,100,0.12);border:1px solid rgba(41,201,100,0.30);border-radius:100px;padding:5px 14px 5px 9px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:7px;height:7px;background:#29C964;border-radius:50%;"></td>
                        <td style="padding-left:7px;">
                          <span style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:600;color:#29C964;letter-spacing:0.9px;text-transform:uppercase;">Password Reset Successful</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Headline -->
              <h1 class="headline" style="font-family:'Inter',Arial,sans-serif;font-size:30px;font-weight:800;color:#ffffff;line-height:1.22;margin:0 0 12px 0;letter-spacing:-0.6px;">
                Your password has been<br>
                <span style="color:#29C964;">successfully reset.</span>
              </h1>

              <!-- Sub -->
              <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:400;color:#8aab8e;margin:0;line-height:1.6;">
                You can now sign in using your new credentials.
              </p>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td class="card-body" style="padding:32px 44px 36px;">

              <!-- Check circle icon -->

              <!-- Greeting -->
              <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;font-weight:400;color:#c4d9c6;margin:0 0 14px 0;line-height:1.6;">
                Hey <strong style="color:#ffffff;font-weight:600;">${name}</strong>,
              </p>

              <!-- Body copy -->
              <p style="font-family:'Inter',Arial,sans-serif;font-size:14.5px;font-weight:400;color:#8aab8e;margin:0 0 32px 0;line-height:1.8;">
                We're confirming that your <strong style="color:#c4d9c6;font-weight:500;">Formeze</strong> account password was successfully updated. If this was you, no further action is needed — you're all set and ready to go.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
                      href="https://formeze.netlify.app/login"
                      style="height:50px;v-text-anchor:middle;width:220px;" arcsize="18%"
                      strokecolor="#29C964" fillcolor="#29C964">
                      <w:anchorlock/>
                      <center style="color:#081008;font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:700;">Sign in to Formeze</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="https://formeze.netlify.app/login" target="_blank"
                      style="display:inline-block;background:#29C964;color:#081008;font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.1px;text-decoration:none;padding:15px 44px;border-radius:9px;box-shadow:0 0 0 1px rgba(41,201,100,0.4),0 8px 28px rgba(41,201,100,0.22);">
                      Sign in to Formeze &rarr;
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── DIVIDER ── -->
          <tr>
            <td class="divider-wrap" style="padding:0 44px;">
              <div style="height:1px;background:rgba(41,201,100,0.10);"></div>
            </td>
          </tr>

          <!-- ── ALERT BOX ── -->
          <tr>
            <td class="card-alert" style="padding:24px 44px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.20);border-left:3px solid #f5a623;border-radius:9px;">
                <tr>
                  <td style="padding:15px 18px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="vertical-align:top;padding-right:12px;font-size:16px;width:24px;line-height:1.5;">&#9888;</td>
                        <td style="vertical-align:top;">
                          <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;font-weight:400;color:#b89a6a;line-height:1.7;margin:0;">
                            <strong style="color:#f5c842;font-weight:600;">Didn't request this?</strong><br>
                            If you didn't initiate this change, your account may be at risk. Please
                            <a href="https://formeze.netlify.app/support" style="color:#f5c842;text-decoration:underline;font-weight:500;">contact our support team</a>
                            immediately so we can secure your account.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td class="card-footer" style="background:#091209;padding:22px 44px 26px;border-top:1px solid rgba(41,201,100,0.08);">
              <p style="text-align:center;margin:0 0 12px 0;">
                <a href="#" style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#3d6642;text-decoration:none;margin:0 8px;">Privacy Policy</a>
                <span style="color:#1e3320;">&middot;</span>
                <a href="#" style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#3d6642;text-decoration:none;margin:0 8px;">Terms of Service</a>
                <span style="color:#1e3320;">&middot;</span>
                <a href="#" style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#3d6642;text-decoration:none;margin:0 8px;">Help Center</a>
              </p>
              <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#2e522f;text-align:center;margin:0;line-height:1.7;">
                &copy; 2026 Formeze, Inc. &middot; 100 Form St, San Francisco, CA 94105<br>
                <a href="#" style="color:#3d6642;text-decoration:underline;">Unsubscribe</a> from security notifications.
              </p>
            </td>
          </tr>

        </table>
        <!-- END CARD -->

      </td>
    </tr>
  </table>

</body>
</html>

    `
  }

  return emailWrapper({
    headerIcon: `<span style="font-family:Arial,sans-serif;font-size:22px;color:#ffffff;line-height:1;">&#128274;</span>`,
    headerTitle: "Reset your password",
    headerSubtitle: "Follow the steps below to set a new password",
    bodyText:
      "We received a request to reset the password linked to your Formeze account. Click the button below and you'll be taken to a secure page where you can create a new password.",
    ctaUrl: `https://formeze.netlify.app/reset/${token}/`,
    ctaLabel: "Reset my password",
    noticeText: `This reset link is valid for a <strong>limited time only</strong>. If you didn't request a password reset, you can safely ignore this email — your password will remain unchanged.`,
    closingText: `If you continue to experience issues or have questions, our support team is always here to help at <a href="mailto:formeze.service@gmail.com" style="color:#2e8b4a;text-decoration:none;">formeze.service@gmail.com</a>. Thank you for using Formeze.`,
  });
};

module.exports = generateHtml;

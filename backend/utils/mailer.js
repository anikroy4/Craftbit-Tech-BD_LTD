import nodemailer from 'nodemailer';

// Cache transporter instance
let transporter = null;

export const getTransporter = async () => {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || '';
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASS || '';

  // If real SMTP credentials provided in .env
  if (user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    });
    console.log(`📧 Nodemailer configured with real SMTP: ${user}`);
    return transporter;
  }

  // Graceful fallback: Test/Sandbox transporter (does not crash or reject if no SMTP configured)
  try {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log(`📧 Nodemailer initialized in Sandbox / Ethereal mode (User: ${testAccount.user})`);
    return transporter;
  } catch {
    // Ultimate fallback: JSON / console logger transporter
    transporter = nodemailer.createTransport({
      jsonTransport: true
    });
    console.log('📧 Nodemailer running in local stream mode (no SMTP configured)');
    return transporter;
  }
};

const getFromAddress = () => {
  return process.env.SMTP_FROM || '"CraftBit Tech BD LTD" <craftbittechbd@gmail.com>';
};

/**
 * 1. Send Welcome Email upon User Registration
 */
export const sendWelcomeEmail = async ({ to, name, role }) => {
  try {
    const mailer = await getTransporter();
    const portalUrl = process.env.CLIENT_URL || 'http://localhost:5173/login';

    const info = await mailer.sendMail({
      from: getFromAddress(),
      to,
      subject: 'Welcome to CraftBit Tech BD Operations Portal',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #090e1a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <div style="background: linear-gradient(135deg, #0284c7, #2563eb); padding: 32px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">CraftBit Tech BD LTD</h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Enterprise Software & Digital Engineering Portal</p>
          </div>
          <div style="padding: 32px 28px;">
            <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Welcome, ${name}! 👋</h2>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
              Your account has been successfully created and verified on the CraftBit Tech BD platform.
            </p>
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin: 24px 0;">
              <p style="margin: 0 0 8px 0; color: #38bdf8; font-size: 13px; font-weight: 700; text-transform: uppercase;">Account Details:</p>
              <p style="margin: 4px 0; font-size: 14px; color: #e2e8f0;"><strong>Portal Email:</strong> ${to}</p>
              <p style="margin: 4px 0; font-size: 14px; color: #e2e8f0;"><strong>Assigned Role:</strong> <span style="text-transform: capitalize; color: #10b981; font-weight: 700;">${role}</span></p>
              <p style="margin: 4px 0; font-size: 14px; color: #e2e8f0;"><strong>Security:</strong> Bcrypt Salted Hash Protected</p>
            </div>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${portalUrl}" style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);">
                Access Portal Dashboard →
              </a>
            </div>
            <p style="color: #64748b; font-size: 12px; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
              If you did not create this account, please immediately inform <a href="mailto:craftbittechbd@gmail.com" style="color: #38bdf8; text-decoration: none;">craftbittechbd@gmail.com</a>.
            </p>
          </div>
        </div>
      `
    });

    console.log(`✉️ Welcome email dispatched to ${to} (MessageId: ${info.messageId || 'local'})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌ Failed to send welcome email:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * 2. Send Customer Confirmation on Quote Submission
 */
export const sendQuoteConfirmationEmail = async ({ to, name, service, budget, message }) => {
  try {
    const mailer = await getTransporter();

    const info = await mailer.sendMail({
      from: getFromAddress(),
      to,
      subject: 'Inquiry Received — CraftBit Tech BD LTD Consultation',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #090e1a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 28px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800;">CraftBit Tech BD LTD</h1>
            <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.9); font-size: 13px;">Technical Consultation & Estimate</p>
          </div>
          <div style="padding: 30px 24px;">
            <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">Hello ${name},</h2>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
              Thank you for reaching out to <strong>CraftBit Tech BD LTD</strong>. We have received your technical inquiry and our engineering team is reviewing your project requirements.
            </p>
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; color: #34d399; font-size: 12px; font-weight: 700; text-transform: uppercase;">Inquiry Summary:</p>
              <p style="margin: 4px 0; font-size: 13px; color: #e2e8f0;"><strong>Service:</strong> ${service || 'General Software Engineering'}</p>
              <p style="margin: 4px 0; font-size: 13px; color: #e2e8f0;"><strong>Budget:</strong> ${budget || 'Flexible'}</p>
              <p style="margin: 4px 0; font-size: 13px; color: #cbd5e1;"><strong>Scope:</strong> ${message}</p>
            </div>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
              A senior technical architect will evaluate your requirements and contact you within <strong>24 business hours</strong> with an architectural overview and proposal.
            </p>
            <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #64748b;">
              <p style="margin: 2px 0;"><strong>Office:</strong> 15-A/A1, Lane 2, Gopibagh, Dhaka-1203, Bangladesh</p>
              <p style="margin: 2px 0;"><strong>Phone:</strong> +880 1774381687 | <strong>Email:</strong> craftbittechbd@gmail.com</p>
            </div>
          </div>
        </div>
      `
    });

    console.log(`✉️ Quote confirmation sent to ${to} (MessageId: ${info.messageId || 'local'})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌ Failed to send quote confirmation email:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * 3. Send Lead Alert to CraftBit Internal Admin Team
 */
export const sendAdminLeadAlert = async ({ clientName, clientEmail, service, budget, message }) => {
  try {
    const mailer = await getTransporter();
    const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'craftbittechbd@gmail.com';

    const info = await mailer.sendMail({
      from: getFromAddress(),
      to: adminEmail,
      subject: `🔥 New Client Lead: ${clientName} (${service || 'Software'})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
          <h2 style="color: #38bdf8; margin-top: 0;">🚀 New Project Inquiry Received</h2>
          <p style="font-size: 14px; color: #94a3b8;">A prospective client just submitted an inquiry on the CraftBit website:</p>
          <ul style="line-height: 1.8; font-size: 14px;">
            <li><strong>Client Name:</strong> ${clientName}</li>
            <li><strong>Client Email:</strong> <a href="mailto:${clientEmail}" style="color: #38bdf8;">${clientEmail}</a></li>
            <li><strong>Service Requested:</strong> ${service || 'Custom Requirement'}</li>
            <li><strong>Estimated Budget:</strong> ${budget || 'Open / Flexible'}</li>
          </ul>
          <div style="background: rgba(255,255,255,0.05); padding: 12px; border-left: 4px solid #38bdf8; margin-top: 15px;">
            <strong>Project Scope:</strong>
            <p style="margin: 5px 0 0 0; color: #cbd5e1; font-size: 13px;">${message}</p>
          </div>
        </div>
      `
    });

    console.log(`✉️ Admin lead notification dispatched to ${adminEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌ Failed to send admin lead alert:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * 4. Send Direct Reply from Dashboard Admin to Customer
 */
export const sendDirectReplyEmail = async ({ to, clientName, subject, replyMessage, adminName }) => {
  try {
    const mailer = await getTransporter();

    const info = await mailer.sendMail({
      from: getFromAddress(),
      to,
      subject: subject || 'Response to Your CraftBit Tech BD Inquiry',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #090e1a; color: #f8fafc; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <div style="background: #0284c7; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">CraftBit Tech BD LTD</h2>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 14px; color: #e2e8f0;">Dear ${clientName || 'Client'},</p>
            <div style="font-size: 14px; line-height: 1.7; color: #cbd5e1; white-space: pre-wrap; margin: 16px 0;">
              ${replyMessage}
            </div>
            <p style="font-size: 13px; color: #94a3b8; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
              Best regards,<br/>
              <strong>${adminName || 'CraftBit Engineering Team'}</strong><br/>
              CraftBit Tech BD LTD
            </p>
          </div>
        </div>
      `
    });

    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌ Direct reply email error:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * 5. Send Email Verification OTP Code
 */
export const sendVerificationOTPEmail = async ({ to, name, code }) => {
  try {
    const mailer = await getTransporter();

    console.log(`🔐 [EMAIL VERIFICATION OTP] Code for ${to}: ${code}`);

    const info = await mailer.sendMail({
      from: getFromAddress(),
      to,
      subject: `CraftBit Verification Code: ${code}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 580px; margin: 0 auto; background: #090e1a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12);">
          <div style="background: linear-gradient(135deg, #0284c7, #3b82f6); padding: 30px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">CraftBit Tech BD LTD</h1>
            <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.9); font-size: 13px;">Identity Gateway & Email Verification</p>
          </div>
          <div style="padding: 32px 28px; text-align: center;">
            <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Verify Your Work Email</h2>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; max-width: 440px; margin: 0 auto 24px auto;">
              Hello ${name || 'Team Member'}, please enter the following 6-digit verification code to confirm your email address and activate your account:
            </p>

            <div style="background: rgba(56, 189, 248, 0.08); border: 2px dashed rgba(56, 189, 248, 0.4); border-radius: 14px; padding: 22px 20px; display: inline-block; margin: 0 auto 24px auto; min-width: 260px;">
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #38bdf8; display: block;">
                ${code}
              </span>
              <span style="display: block; margin-top: 8px; font-size: 12px; color: #94a3b8;">
                Valid for 15 minutes
              </span>
            </div>

            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0 0 20px 0;">
              Once verified, SuperAdmin can assign you Admin or Moderator privileges on the CraftBit Tech BD platform.
            </p>

            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 12px; color: #64748b; text-align: left;">
              <p style="margin: 4px 0;">• If you did not request this verification, you can safely ignore this email.</p>
              <p style="margin: 4px 0;">• Security notice: Never share your verification code with anyone.</p>
            </div>
          </div>
        </div>
      `
    });

    console.log(`✉️ Verification OTP dispatched to ${to} (MessageId: ${info.messageId || 'local'})`);
    return { success: true, messageId: info.messageId, code };
  } catch (err) {
    console.error('❌ Failed to dispatch verification OTP email:', err.message);
    return { success: false, error: err.message, code };
  }
};


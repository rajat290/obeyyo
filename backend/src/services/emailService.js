const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    this.fromEmail = process.env.FROM_EMAIL || 'noreply@obeyyo.com';
    this.fromName = process.env.FROM_NAME || 'Obeyyo';
  }

  // Send email
  async sendEmail(to, subject, html, text = null, attachments = []) {
    try {
      const mailOptions = {
        from: `"${this.fromName}" <${this.fromEmail}>`,
        to: to,
        subject: subject,
        html: html,
        text: text,
        attachments: attachments
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }

  // Render EJS template
  async renderTemplate(templateName, data) {
    try {
      const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.ejs`);
      return await ejs.renderFile(templatePath, data);
    } catch (error) {
      throw new Error(`Template rendering failed: ${error.message}`);
    }
  }

  // Welcome email for new users
  async sendWelcomeEmail(user) {
    try {
      const subject = 'Welcome to Obeyyo! 🎉';
      const html = await this.renderTemplate('welcome', {
        user: user,
        year: new Date().getFullYear()
      });

      return await this.sendEmail(user.email, subject, html);
    } catch (error) {
      console.error('Welcome email failed:', error);
      // Don't throw error for welcome emails
    }
  }

  // Email verification
  async sendVerificationEmail(user, verificationToken) {
    try {
      const subject = 'Verify Your Email - Obeyyo';
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

      const html = await this.renderTemplate('email-verification', {
        user: user,
        verificationUrl: verificationUrl
      });

      return await this.sendEmail(user.email, subject, html);
    } catch (error) {
      throw new Error(`Verification email failed: ${error.message}`);
    }
  }

  // Password reset email
  async sendPasswordResetEmail(user, resetToken) {
    try {
      const subject = 'Reset Your Password - Obeyyo';
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      const html = await this.renderTemplate('password-reset', {
        user: user,
        resetUrl: resetUrl
      });

      return await this.sendEmail(user.email, subject, html);
    } catch (error) {
      throw new Error(`Password reset email failed: ${error.message}`);
    }
  }

  // Order confirmation email
  async sendOrderConfirmationEmail(order, user) {
    try {
      const subject = `Order Confirmed - #${order.orderNumber}`;

      const html = await this.renderTemplate('order-confirmation', {
        user: user,
        order: order,
        orderUrl: `${process.env.FRONTEND_URL}/orders/${order._id}`
      });

      return await this.sendEmail(user.email, subject, html);
    } catch (error) {
      console.error('Order confirmation email failed:', error);
      // Don't throw error for order emails
    }
  }

  // Order status update email
  async sendOrderStatusUpdateEmail(order, user, oldStatus, newStatus) {
    try {
      const subject = `Order Status Updated - #${order.orderNumber}`;

      const html = await this.renderTemplate('order-status-update', {
        user: user,
        order: order,
        oldStatus: oldStatus,
        newStatus: newStatus,
        orderUrl: `${process.env.FRONTEND_URL}/orders/${order._id}`
      });

      return await this.sendEmail(user.email, subject, html);
    } catch (error) {
      console.error('Order status update email failed:', error);
      // Don't throw error for status update emails
    }
  }

  // Order cancellation email
  async sendOrderCancellationEmail(order, user, reason) {
    try {
      const subject = `Order Cancelled - #${order.orderNumber}`;

      const html = await this.renderTemplate('order-cancellation', {
        user: user,
        order: order,
        reason: reason,
        supportEmail: process.env.SUPPORT_EMAIL || 'support@obeyyo.com'
      });

      return await this.sendEmail(user.email, subject, html);
    } catch (error) {
      console.error('Order cancellation email failed:', error);
      // Don't throw error for cancellation emails
    }
  }

  // Order shipped email
  async sendOrderShippedEmail(order, user, trackingInfo = null) {
    try {
      const subject = `Order Shipped - #${order.orderNumber}`;

      const html = await this.renderTemplate('order-shipped', {
        user: user,
        order: order,
        trackingInfo: trackingInfo,
        orderUrl: `${process.env.FRONTEND_URL}/orders/${order._id}`
      });

      return await this.sendEmail(user.email, subject, html);
    } catch (error) {
      console.error('Order shipped email failed:', error);
      // Don't throw error for shipping emails
    }
  }

  // Order delivered email
  async sendOrderDeliveredEmail(order, user) {
    try {
      const subject = `Order Delivered - #${order.orderNumber}`;

      const html = await this.renderTemplate('order-delivered', {
        user: user,
        order: order,
        reviewUrl: `${process.env.FRONTEND_URL}/products/${order.items[0]?.product?.slug}/review`,
        supportEmail: process.env.SUPPORT_EMAIL || 'support@obeyyo.com'
      });

      return await this.sendEmail(user.email, subject, html);
    } catch (error) {
      console.error('Order delivered email failed:', error);
      // Don't throw error for delivery emails
    }
  }

  // Low stock alert (admin)
  async sendLowStockAlert(product, adminEmails) {
    try {
      const subject = `Low Stock Alert - ${product.name}`;

      const html = await this.renderTemplate('low-stock-alert', {
        product: product,
        adminUrl: `${process.env.ADMIN_URL}/products/${product._id}`
      });

      // Send to all admin emails
      const promises = adminEmails.map(email =>
        this.sendEmail(email, subject, html)
      );

      return await Promise.all(promises);
    } catch (error) {
      console.error('Low stock alert email failed:', error);
      // Don't throw error for admin alerts
    }
  }

  // New review notification (admin)
  async sendNewReviewNotification(review, product, adminEmails) {
    try {
      const subject = `New Review Submitted - ${product.name}`;

      const html = await this.renderTemplate('new-review-notification', {
        review: review,
        product: product,
        adminUrl: `${process.env.ADMIN_URL}/reviews/${review._id}`
      });

      const promises = adminEmails.map(email =>
        this.sendEmail(email, subject, html)
      );

      return await Promise.all(promises);
    } catch (error) {
      console.error('New review notification email failed:', error);
      // Don't throw error for admin notifications
    }
  }

  // Coupon expiry reminder
  async sendCouponExpiryReminder(coupon, user) {
    try {
      const subject = `Coupon Expiring Soon - ${coupon.code}`;

      const html = await this.renderTemplate('coupon-expiry-reminder', {
        user: user,
        coupon: coupon,
        shopUrl: process.env.FRONTEND_URL
      });

      return await this.sendEmail(user.email, subject, html);
    } catch (error) {
      console.error('Coupon expiry reminder email failed:', error);
      // Don't throw error for reminder emails
    }
  }

  // Bulk email to users
  async sendBulkEmail(users, subject, templateName, templateData) {
    try {
      const promises = users.map(async (user) => {
        const html = await this.renderTemplate(templateName, {
          user: user,
          ...templateData
        });

        return this.sendEmail(user.email, subject, html);
      });

      return await Promise.allSettled(promises);
    } catch (error) {
      throw new Error(`Bulk email failed: ${error.message}`);
    }
  }

  // Test email configuration
  async sendTestEmail(to) {
    try {
      const subject = 'Test Email - Obeyyo';
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Test Email</h2>
          <p>This is a test email to verify your email configuration.</p>
          <p>If you received this email, your email service is working correctly!</p>
          <p>Sent at: ${new Date().toISOString()}</p>
        </div>
      `;

      return await this.sendEmail(to, subject, html);
    } catch (error) {
      throw new Error(`Test email failed: ${error.message}`);
    }
  }

  // Verify email configuration
  async verifyConnection() {
    try {
      await this.transporter.verify();
      return { success: true, message: 'Email service is ready' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();

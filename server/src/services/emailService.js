import nodemailer from 'nodemailer';


const createTransporter = () => {
  // Option 1: Brevo SMTP (requires verified sender in Brevo dashboard)
  // Option 2: Gmail SMTP (requires App Password from Google Account)
  
  const useGmail = process.env.USE_GMAIL === 'true';
  
  if (useGmail) {
    // Gmail configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    return transporter;
  } else {
    // Brevo configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });
    return transporter;
  }
};

export const sendBookingReceipt = async (to, bookingDetails) => {
  try {
    const transporter = createTransporter();

    const checkInDate = new Date(bookingDetails.checkIn || bookingDetails.checkInDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const checkOutDate = new Date(bookingDetails.checkOut || bookingDetails.checkOutDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const nights = Math.ceil((new Date(bookingDetails.checkOut || bookingDetails.checkOutDate) - new Date(bookingDetails.checkIn || bookingDetails.checkInDate)) / (1000 * 60 * 60 * 24));

    // Professional HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .booking-id { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          .booking-id strong { color: #92400e; font-size: 18px; }
          .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .details-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
          .details-table td:first-child { font-weight: bold; color: #6b7280; width: 40%; }
          .total-box { background: #d1fae5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .total-box .amount { font-size: 32px; font-weight: bold; color: #059669; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>STAYWISE HOTEL</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Booking Confirmation</p>
          </div>
          
          <div class="content">
            <h2 style="color: #667eea;">Thank You for Your Booking!</h2>
            <p>Dear ${bookingDetails.fullName || 'Guest'},</p>
            <p>We are delighted to confirm your reservation at StayWise Hotel. Your booking has been successfully processed.</p>
            
            <div class="booking-id">
              <strong>Booking ID:</strong> ${bookingDetails.bookingId}
            </div>

            <h3 style="color: #764ba2; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Booking Details</h3>
            <table class="details-table">
              <tr>
                <td>Room Type</td>
                <td>${bookingDetails.selectedRoom || bookingDetails.room?.name || 'N/A'}</td>
              </tr>
              <tr>
                <td>Check-in Date</td>
                <td>${checkInDate}</td>
              </tr>
              <tr>
                <td>Check-out Date</td>
                <td>${checkOutDate}</td>
              </tr>
              <tr>
                <td>Number of Nights</td>
                <td>${nights} night${nights > 1 ? 's' : ''}</td>
              </tr>
              <tr>
                <td>Number of Guests</td>
                <td>${bookingDetails.numberOfGuests || bookingDetails.guests || 'N/A'}</td>
              </tr>
              ${bookingDetails.specialRequests ? `
              <tr>
                <td>Special Requests</td>
                <td>${bookingDetails.specialRequests}</td>
              </tr>
              ` : ''}
            </table>

            <div class="total-box">
              <p style="margin: 0; font-size: 14px; color: #059669;">Total Amount Paid</p>
              <div class="amount">$${bookingDetails.totalPrice.toFixed(2)}</div>
            </div>

            <h3 style="color: #764ba2; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Important Information</h3>
            <ul style="color: #4b5563;">
              <li>Check-in time: 3:00 PM</li>
              <li>Check-out time: 11:00 AM</li>
              <li>Please bring a valid ID and this confirmation email</li>
              <li>Early check-in subject to availability</li>
            </ul>

            <p style="margin-top: 30px;">If you have any questions or need to modify your reservation, please contact us at:</p>
            <p style="margin: 5px 0;">Email: <a href="mailto:bookings@staywise.com" style="color: #667eea;">bookings@staywise.com</a></p>
            <p style="margin: 5px 0;">Phone: +1 (555) 123-4567</p>

            <p style="margin-top: 30px;">We look forward to welcoming you!</p>
            <p><strong>The StayWise Hotel Team</strong></p>
          </div>

          <div class="footer">
            <p style="margin: 5px 0;">StayWise Hotel | 123 Luxury Avenue, Paradise City</p>
            <p style="margin: 5px 0;">This is an automated confirmation email. Please do not reply.</p>
            <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} StayWise Hotel. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const textContent = `
STAYWISE HOTEL - Booking Confirmation

Thank you for your booking!

Booking ID: ${bookingDetails.bookingId}

BOOKING DETAILS:
- Guest Name: ${bookingDetails.fullName || 'Guest'}
- Room Type: ${bookingDetails.selectedRoom || bookingDetails.room?.name || 'N/A'}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Nights: ${nights}
- Guests: ${bookingDetails.numberOfGuests || bookingDetails.guests || 'N/A'}
${bookingDetails.specialRequests ? `- Special Requests: ${bookingDetails.specialRequests}` : ''}

TOTAL AMOUNT: $${bookingDetails.totalPrice.toFixed(2)}

IMPORTANT INFORMATION:
- Check-in time: 3:00 PM
- Check-out time: 11:00 AM
- Please bring a valid ID and this confirmation

Contact us:
Email: bookings@staywise.com
Phone: +1 (555) 123-4567

We look forward to welcoming you!
The StayWise Hotel Team
    `;

    // Send email
    const fromEmail = process.env.USE_GMAIL === 'true' 
      ? `"StayWise Hotel" <${process.env.GMAIL_USER}>`
      : `"StayWise Hotel" <${process.env.BREVO_VERIFIED_SENDER || '9f71ff001@smtp-brevo.com'}>`;
    
    const info = await transporter.sendMail({
      from: fromEmail,
      to: to,
      subject: `✅ Booking Confirmed - ${bookingDetails.bookingId} - StayWise Hotel`,
      text: textContent,
      html: htmlContent,
    });

    console.log("✅ Booking confirmation email sent successfully to:", to);
    console.log("Message ID:", info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending booking confirmation email:", error);
    throw error;
  }
};

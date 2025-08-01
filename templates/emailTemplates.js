const emailTemplates = {
  // Account Deletion Email Template
  accountDeletion: (userName, deleteUrl, userEmail) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirm Account Deletion</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .email-card {
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                margin: 40px 0;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }
            .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content {
                padding: 40px 30px;
            }
            .warning-box {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }
            .warning-box h3 {
                color: #856404;
                margin: 0 0 10px 0;
                font-size: 18px;
            }
            .warning-box p {
                color: #856404;
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
            }
            .btn {
                display: inline-block;
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                margin: 20px 0;
                box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
                transition: all 0.3s ease;
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(255, 107, 107, 0.4);
            }
            .info-box {
                background: #f8f9fa;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }
            .info-box h4 {
                color: #495057;
                margin: 0 0 10px 0;
                font-size: 16px;
            }
            .info-box p {
                color: #6c757d;
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
            }
            .footer {
                background: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #6c757d;
                margin: 0;
                font-size: 12px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="email-card">
                <div class="header">
                    <div class="logo">🧠 PostGen AI</div>
                    <h1>Account Deletion Request</h1>
                    <p>We received a request to delete your account</p>
                </div>
                
                <div class="content">
                    <p style="color: #495057; font-size: 16px; line-height: 1.6;">
                        Hello ${userName || 'there'},
                    </p>
                    
                    <p style="color: #495057; font-size: 16px; line-height: 1.6;">
                        We received a request to permanently delete your PostGen AI account. 
                        This action will remove all your data, preferences, and generated content.
                    </p>
                    
                    <div class="warning-box">
                        <h3>⚠️ Important Warning</h3>
                        <p>
                            This action is <strong>permanent and cannot be undone</strong>. 
                            All your data, including generated content, preferences, and account information 
                            will be permanently deleted from our servers.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${deleteUrl}" class="btn">
                            🗑️ Confirm Account Deletion
                        </a>
                    </div>
                    
                    <div class="info-box">
                        <h4>📧 What happens next?</h4>
                        <p>
                            • Click the button above to confirm deletion<br>
                            • Your account will be permanently deleted<br>
                            • You'll be redirected to our homepage<br>
                            • All data will be removed within 24 hours
                        </p>
                    </div>
                    
                    <div class="info-box">
                        <h4>⏰ Time Limit</h4>
                        <p>
                            This confirmation link expires in <strong>1 hour</strong>. 
                            If you don't confirm within this time, your account will remain active.
                        </p>
                    </div>
                    
                    <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
                        If you didn't request this deletion, please ignore this email. 
                        Your account will remain secure and active.
                    </p>
                </div>
                
                <div class="footer">
                    <p>
                        © 2024 PostGen AI. All rights reserved.<br>
                        This email was sent to ${userEmail}
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `,

  // Email Verification Template
  emailVerification: (userName, verifyUrl, userEmail) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - PostGen AI</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .email-card {
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                margin: 40px 0;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }
            .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content {
                padding: 40px 30px;
            }
            .btn {
                display: inline-block;
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                margin: 20px 0;
                box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
                transition: all 0.3s ease;
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(40, 167, 69, 0.4);
            }
            .info-box {
                background: #f8f9fa;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }
            .info-box h4 {
                color: #495057;
                margin: 0 0 10px 0;
                font-size: 16px;
            }
            .info-box p {
                color: #6c757d;
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
            }
            .footer {
                background: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #6c757d;
                margin: 0;
                font-size: 12px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="email-card">
                <div class="header">
                    <div class="logo">🧠 PostGen AI</div>
                    <h1>Verify Your Email</h1>
                    <p>Welcome to PostGen AI! Please verify your email address</p>
                </div>
                
                <div class="content">
                    <p style="color: #495057; font-size: 16px; line-height: 1.6;">
                        Hello ${userName || 'there'},
                    </p>
                    
                    <p style="color: #495057; font-size: 16px; line-height: 1.6;">
                        Thank you for signing up for PostGen AI! To complete your registration and start creating amazing content, 
                        please verify your email address by clicking the button below.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verifyUrl}" class="btn">
                            ✅ Verify Email Address
                        </a>
                    </div>
                    
                    <div class="info-box">
                        <h4>🚀 What's next?</h4>
                        <p>
                            • Click the button above to verify your email<br>
                            • Complete your profile setup<br>
                            • Start creating AI-powered content<br>
                            • Connect your social media accounts
                        </p>
                    </div>
                    
                    <div class="info-box">
                        <h4>⏰ Time Limit</h4>
                        <p>
                            This verification link expires in <strong>24 hours</strong>. 
                            If you don't verify within this time, you'll need to request a new verification email.
                        </p>
                    </div>
                    
                    <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
                        If you didn't create an account with PostGen AI, please ignore this email.
                    </p>
                </div>
                
                <div class="footer">
                    <p>
                        © 2024 PostGen AI. All rights reserved.<br>
                        This email was sent to ${userEmail}
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `,

  // Password Reset Template
  passwordReset: (userName, resetUrl, userEmail) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - PostGen AI</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .email-card {
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                margin: 40px 0;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }
            .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content {
                padding: 40px 30px;
            }
            .btn {
                display: inline-block;
                background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                margin: 20px 0;
                box-shadow: 0 8px 20px rgba(255, 193, 7, 0.3);
                transition: all 0.3s ease;
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(255, 193, 7, 0.4);
            }
            .warning-box {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }
            .warning-box h3 {
                color: #856404;
                margin: 0 0 10px 0;
                font-size: 18px;
            }
            .warning-box p {
                color: #856404;
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
            }
            .info-box {
                background: #f8f9fa;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }
            .info-box h4 {
                color: #495057;
                margin: 0 0 10px 0;
                font-size: 16px;
            }
            .info-box p {
                color: #6c757d;
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
            }
            .footer {
                background: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #6c757d;
                margin: 0;
                font-size: 12px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="email-card">
                <div class="header">
                    <div class="logo">🧠 PostGen AI</div>
                    <h1>Reset Your Password</h1>
                    <p>We received a request to reset your password</p>
                </div>
                
                <div class="content">
                    <p style="color: #495057; font-size: 16px; line-height: 1.6;">
                        Hello ${userName || 'there'},
                    </p>
                    
                    <p style="color: #495057; font-size: 16px; line-height: 1.6;">
                        We received a request to reset your PostGen AI account password. 
                        Click the button below to create a new password.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" class="btn">
                            🔐 Reset Password
                        </a>
                    </div>
                    
                    <div class="warning-box">
                        <h3>🔒 Security Notice</h3>
                        <p>
                            If you didn't request this password reset, please ignore this email. 
                            Your account will remain secure with your current password.
                        </p>
                    </div>
                    
                    <div class="info-box">
                        <h4>⏰ Time Limit</h4>
                        <p>
                            This password reset link expires in <strong>1 hour</strong>. 
                            If you don't reset your password within this time, you'll need to request a new reset link.
                        </p>
                    </div>
                    
                    <div class="info-box">
                        <h4>💡 Password Tips</h4>
                        <p>
                            • Use a strong, unique password<br>
                            • Include letters, numbers, and symbols<br>
                            • Don't reuse passwords from other accounts<br>
                            • Consider using a password manager
                        </p>
                    </div>
                </div>
                
                <div class="footer">
                    <p>
                        © 2024 PostGen AI. All rights reserved.<br>
                        This email was sent to ${userEmail}
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
};

module.exports = emailTemplates; 
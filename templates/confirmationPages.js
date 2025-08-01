const confirmationPages = {
  // Account Deleted Success Page
  accountDeletedSuccess: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Deleted - PostGen AI</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
            }
            .card {
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                text-align: center;
            }
            .header {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                padding: 40px 30px;
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
            .icon {
                font-size: 64px;
                margin-bottom: 20px;
            }
            .message {
                color: #495057;
                font-size: 18px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .info-box {
                background: #f8f9fa;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
                text-align: left;
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
            .btn {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
            }
            .footer {
                background: #f8f9fa;
                padding: 20px;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #6c757d;
                margin: 0;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="header">
                    <div class="icon">✅</div>
                    <h1>Account Deleted Successfully</h1>
                    <p>Your PostGen AI account has been permanently removed</p>
                </div>
                
                <div class="content">
                    <div class="message">
                        Thank you for using PostGen AI. Your account and all associated data 
                        have been permanently deleted from our servers.
                    </div>
                    
                    <div class="info-box">
                        <h4>📋 What was deleted:</h4>
                        <p>
                            • Your account information<br>
                            • All generated content<br>
                            • User preferences<br>
                            • Twitter credentials<br>
                            • Post history and analytics
                        </p>
                    </div>
                    
                    <div class="info-box">
                        <h4>⏰ Data Removal:</h4>
                        <p>
                            All data has been permanently deleted from our servers. 
                            This action cannot be undone.
                        </p>
                    </div>
                    
                    <a href="https://postgenbackend.onrender.com" class="btn">
                        🏠 Return to PostGen AI
                    </a>
                </div>
                
                <div class="footer">
                    <p>© 2024 PostGen AI. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `,

  // Invalid/Expired Link Page
  invalidDeletionLink: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invalid Deletion Link - PostGen AI</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
            }
            .card {
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                text-align: center;
            }
            .header {
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
                color: white;
                padding: 40px 30px;
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
            .icon {
                font-size: 64px;
                margin-bottom: 20px;
            }
            .message {
                color: #495057;
                font-size: 18px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .btn {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
            }
            .footer {
                background: #f8f9fa;
                padding: 20px;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #6c757d;
                margin: 0;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="header">
                    <div class="icon">⚠️</div>
                    <h1>Invalid Deletion Link</h1>
                    <p>The link you clicked is invalid or has expired</p>
                </div>
                
                <div class="content">
                    <div class="message">
                        This account deletion link is either invalid or has expired. 
                        For security reasons, deletion links are only valid for 1 hour.
                    </div>
                    
                    <a href="https://postgenbackend.onrender.com" class="btn">
                        🏠 Return to PostGen AI
                    </a>
                </div>
                
                <div class="footer">
                    <p>© 2024 PostGen AI. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `,

  // Error Page
  errorPage: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - PostGen AI</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
            }
            .card {
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                text-align: center;
            }
            .header {
                background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
                color: white;
                padding: 40px 30px;
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
            .icon {
                font-size: 64px;
                margin-bottom: 20px;
            }
            .message {
                color: #495057;
                font-size: 18px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .btn {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
            }
            .footer {
                background: #f8f9fa;
                padding: 20px;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #6c757d;
                margin: 0;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="header">
                    <div class="icon">❌</div>
                    <h1>Error Occurred</h1>
                    <p>Something went wrong while processing your request</p>
                </div>
                
                <div class="content">
                    <div class="message">
                        We encountered an error while trying to delete your account. 
                        Please try again or contact our support team for assistance.
                    </div>
                    
                    <a href="https://postgenbackend.onrender.com" class="btn">
                        🏠 Return to PostGen AI
                    </a>
                </div>
                
                <div class="footer">
                    <p>© 2024 PostGen AI. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `,

  // Email Verification Success Page
  emailVerifiedSuccess: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified - PostGen AI</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
            }
            .card {
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                text-align: center;
            }
            .header {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                padding: 40px 30px;
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
            .icon {
                font-size: 64px;
                margin-bottom: 20px;
            }
            .message {
                color: #495057;
                font-size: 18px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .info-box {
                background: #f8f9fa;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
                text-align: left;
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
            .btn {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
            }
            .footer {
                background: #f8f9fa;
                padding: 20px;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #6c757d;
                margin: 0;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="header">
                    <div class="icon">✅</div>
                    <h1>Email Verified Successfully</h1>
                    <p>Welcome to PostGen AI!</p>
                </div>
                
                <div class="content">
                    <div class="message">
                        Congratulations! Your email has been successfully verified. 
                        Your PostGen AI account is now active and ready to use.
                    </div>
                    
                    <div class="info-box">
                        <h4>🚀 What's next?</h4>
                        <p>
                            • Complete your profile setup<br>
                            • Start creating AI-powered content<br>
                            • Connect your social media accounts<br>
                            • Explore our powerful features
                        </p>
                    </div>
                    
                    <div class="info-box">
                        <h4>💡 Getting Started</h4>
                        <p>
                            You can now log in to your account and start creating amazing content 
                            with our AI-powered tools.
                        </p>
                    </div>
                    
                    <a href="https://postgenbackend.onrender.com" class="btn">
                        🚀 Get Started
                    </a>
                </div>
                
                <div class="footer">
                    <p>© 2024 PostGen AI. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `,

  // Password Reset Success Page
  passwordResetSuccess: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Success - PostGen AI</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
            }
            .card {
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                text-align: center;
            }
            .header {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                padding: 40px 30px;
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
            .icon {
                font-size: 64px;
                margin-bottom: 20px;
            }
            .message {
                color: #495057;
                font-size: 18px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .info-box {
                background: #f8f9fa;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
                text-align: left;
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
            .btn {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
            }
            .footer {
                background: #f8f9fa;
                padding: 20px;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #6c757d;
                margin: 0;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="header">
                    <div class="icon">🔐</div>
                    <h1>Password Reset Successful</h1>
                    <p>Your password has been updated</p>
                </div>
                
                <div class="content">
                    <div class="message">
                        Great! Your password has been successfully reset. 
                        You can now log in to your PostGen AI account with your new password.
                    </div>
                    
                    <div class="info-box">
                        <h4>🔒 Security Reminder</h4>
                        <p>
                            • Keep your password secure and unique<br>
                            • Don't share your password with anyone<br>
                            • Consider using a password manager<br>
                            • Enable two-factor authentication if available
                        </p>
                    </div>
                    
                    <a href="https://postgenbackend.onrender.com" class="btn">
                        🔑 Login Now
                    </a>
                </div>
                
                <div class="footer">
                    <p>© 2024 PostGen AI. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
};

module.exports = confirmationPages; 
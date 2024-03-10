namespace LessonLogAPI.Helpers
{
    public class EmailBody
    {
        public static string EmailStringBody(string email, string emailToken)
        {
            return $@"
                <html>
                    <head></head>
                    <body>
                        <div>
                            <h1>Reset your password</h1>
                            <hr>
                            <p>The message was sent because you asked to reset your password in the 
                                Lesson Log app</p>
                            <p>Please tap the button below to chose a new password</p>
                            <a href=""http://localhost:4200/reset?email={email}&code={emailToken}"" 
                                target=""_blank"" type=""button"" style=""color: #fff; background: 
                                #4274e1; padding: 8px; font-size: 13px; border-radius: 5px; 
                                text-decoration: none;"">Reset password</a>
                            <p>Kind Regards, <br>
                            Lesson Log App Administration
                            </p>
                        </div>
                    </body>
                </html>
            ";
        }
    }
}

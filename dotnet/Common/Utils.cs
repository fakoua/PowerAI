using System.Diagnostics;

namespace PowerAI.Common
{
    public class Utils
    {
        /// <summary>
        /// Executes a command in PowerShell and returns the output as a string.
        /// </summary>
        /// <param name="command">The command to execute.</param>
        /// <returns>The output of the command as a string.</returns>
        public static string ExecuteCommand(string command)
        {
            var process = new Process()
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "pwsh",
                    Arguments = $"-Command {command}",
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                }
            };
            process.Start();
            string result = process.StandardOutput.ReadToEnd();
            process.WaitForExit();
            return result;
        }

        /// <summary>
        /// Gets the welcome message for the PowerAI application.
        /// </summary>
        /// <returns>The welcome message.</returns>
        public static string GetWelcomeMessage() {
            var version = typeof(Utils).Assembly.GetName().Version;
            version ??= new Version(1, 0, 0, 0);
            // Remove the last number from the version, as it is not relevant for the user.
            string strVersion = version.ToString(3);
            return $"Welcome to PowerAI {strVersion} Type 'exit' to quit.";
        }
    }
}
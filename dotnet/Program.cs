using PowerAI.Common;
using PowerAI.Services;

class Program
{
    static async Task Main()
    {
        string? input;
        OpenAIService aiService;
        try
        {
            aiService = new OpenAIService();
            do
            {
                Console.WriteLine(Utils.GetWelcomeMessage());
                Console.Write("PowerAI:> ");
                input = Console.ReadLine()?.ToString();
                if (input == "exit")
                {
                    break;
                }
                if (string.IsNullOrEmpty(input))
                {
                    continue;
                }
                string response = await aiService.GetCommand(input);
                Console.WriteLine();
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine(response);
                Console.ResetColor();
                string commandResult = Utils.ExecuteCommand(response);
                Console.WriteLine(commandResult);
            } while (input != "exit");
        }
        catch (ArgumentNullException)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("You must set the OPENAI_API_KEY environment variable in your system, using a key obtained from https://platform.openai.com/account/api-keys");
            Console.ResetColor();
            Console.WriteLine("Press Enter to exit...");
            Console.ReadLine();
        }
    }
}

using OpenAI_API.Models;

namespace PowerAI.Services
{
    /// <inheritdoc />
    public class OpenAIService : IAIService
    {
        private readonly OpenAI_API.OpenAIAPI _api;
        const string SystemMessage = "You are a powershell command generation assistant. You will be given a description of the commands and a text description on what needs to be done. Respond with only the command without explanation and without ```, you may add arguments and parameters based on the question. if you need a directory path assume the user wants the current directory. Try always to use single quote.";

        /// <summary>
        /// Represents a service for interacting with the OpenAI API.
        /// </summary>
        public OpenAIService()
        {
            string? apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new ArgumentNullException("OPENAI_API_KEY");
            }
            _api = new OpenAI_API.OpenAIAPI(apiKey);
        }

        /// <inheritdoc />
        public async Task<string> GetCommand(string userInput)
        {
            var chat = _api.Chat.CreateConversation();
            chat.Model = Model.GPT4_Turbo;
            chat.RequestParameters.Temperature = 0;

            chat.AppendSystemMessage(SystemMessage);
            chat.AppendUserInput(userInput);
            string response = await chat.GetResponseFromChatbotAsync();
            return response;
        }
    }
}
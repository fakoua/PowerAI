namespace PowerAI.Services
{
    /// <summary>
    /// Represents a service for interacting with the chatbot AI.
    /// </summary>
    public interface IAIService
    {
        /// <summary>
        /// Retrieves a response from the chatbot based on the user input.
        /// </summary>
        /// <param name="userInput">The user input to be processed by the chatbot.</param>
        /// <returns>The response generated by the chatbot.</returns>
        Task<string> GetCommand(string userInput);
    }
}
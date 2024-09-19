using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using Microsoft.PowerPlatform.Dataverse.Client;
using System;

namespace PowerApps.Samples
{
    /// <summary>
    /// Manages authentication and initializing samples using WebAPIService
    /// </summary>
    public class App
    {
        private static readonly IConfiguration appSettings = new ConfigurationBuilder()
            // appsettings.json file 'Copy To Output Directory' property must be 'Copy if Newer'
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();

        // Establish the MSAL app to manage caching access tokens
        private static IConfidentialClientApplication confidentialClientApp = ConfidentialClientApplicationBuilder
            .Create(appSettings["ClientId"])
            .WithClientSecret(appSettings["ClientSecret"])  // Use the ClientSecret
            .WithAuthority(new Uri(appSettings["Authority"]))  // Ensure Authority is a URI
            .Build();

        /// <summary>
        /// Returns a Config to pass to the Service constructor.
        /// </summary>
        /// <returns></returns>
        public static Config InitializeApp()
        {
            // Used to configure the service
            Config config = new()
            {
                Url = appSettings["Url"],
                GetAccessToken = GetToken, // Function defined below to manage getting OAuth token

                // Optional settings that have defaults if not specified:
                MaxRetries = byte.Parse(appSettings["MaxRetries"] ?? "2"), // Default: 2
                TimeoutInSeconds = ushort.Parse(appSettings["TimeoutInSeconds"] ?? "120"), // Default: 120
                Version = appSettings["Version"] ?? "9.2", // Default 9.2
                CallerObjectId = new Guid(appSettings["CallerObjectId"] ?? Guid.Empty.ToString()), // Default empty Guid
                DisableCookies = false
            };
            return config;
        }

        /// <summary>
        /// Returns an Access token for the app using client credentials (ClientId and ClientSecret)
        /// </summary>
        /// <returns>An Access token</returns>
        /// <exception cref="Exception"></exception>
        internal static async Task<string> GetToken()
        {
            // Define the scopes (the resource you want to access)
            List<string> scopes = new() { $"{appSettings["Url"]}/.default" };

            try
            {
                // Acquiring token for client using client credentials flow
                AuthenticationResult result = await confidentialClientApp.AcquireTokenForClient(scopes)
                                                                         .ExecuteAsync();

                if (result != null && !string.IsNullOrWhiteSpace(result.AccessToken))
                {
                    return result.AccessToken;
                }
                else
                {
                    throw new Exception("Failed to acquire access token.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error acquiring access token: {ex.Message}");
            }
        }
    }
}

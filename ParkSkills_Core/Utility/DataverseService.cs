using Microsoft.PowerPlatform.Dataverse.Client;
using System.Net;

namespace ParkSkills_Core.Utility
{
    public class DataverseService
    {

        private readonly ServiceClient _serviceClient;
        private static ServiceClient _instance;
        private static readonly object _lock = new object();
        private static DateTime _lastAccessTime;
        private static readonly TimeSpan RefreshInterval = TimeSpan.FromHours(8);

        public static ServiceClient Instance(Microsoft.Extensions.Logging.ILogger _logger)
        {
            //get
            {
                lock (_lock)
                {
                    var now = DateTime.UtcNow;
                    if (_instance == null || now - _lastAccessTime > RefreshInterval)
                    {
                        _instance?.Dispose();
                        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                        var _connectionString = @$"Url=https://parkskilldev.crm.dynamics.com/;AuthType=ClientSecret;ClientId=34f745e8-0b37-409a-954b-56b4b8fa7ccc;
                ClientSecret=tUD8Q~FmfRNQR3mHWOtFEPqxzY9kGeOC5tQdcbNv;RequireNewInstance=true";

                        _instance = new ServiceClient(_connectionString);

                        if (!_instance.IsReady)
                        {
                            _logger.LogInformation("Failed to establish connection to Dataverse: " + _instance.LastError);
                            throw new Exception("Failed to establish connection to Dataverse: " + _instance.LastError);
                        }

                        _logger.LogInformation("Success Dataverse: ");


                        _lastAccessTime = now;
                    }
                    return _instance;
                }
            }
        }
        public static ServiceClient Instance()
        {
            //get
            {
                lock (_lock)
                {
                    var now = DateTime.UtcNow;
                    if (_instance == null || now - _lastAccessTime > RefreshInterval)
                    {
                        _instance?.Dispose();
                        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                        var _connectionString = @$"Url=https://parkskilldev.crm.dynamics.com/;AuthType=ClientSecret;ClientId=34f745e8-0b37-409a-954b-56b4b8fa7ccc;
                ClientSecret=tUD8Q~FmfRNQR3mHWOtFEPqxzY9kGeOC5tQdcbNv;RequireNewInstance=true";

                        _instance = new ServiceClient(_connectionString);

                        if (!_instance.IsReady)
                        {
                            throw new Exception("Failed to establish connection to Dataverse: " + _instance.LastError);
                        }
                        _lastAccessTime = now;
                    }
                    return _instance;
                }
            }
        }

        public ServiceClient GetClient()
        {
            return _serviceClient;
        }
    }
}

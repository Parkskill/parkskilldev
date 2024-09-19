using Microsoft.Xrm.Sdk;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;
using System.Collections.Generic;
using System.Linq;
using PowerApps.Samples.Messages;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ParkSkills_Core.Utility
{
    public static class CommonMethods
    {
        public static IActionResult ConvertResponseToJson(RetrieveMultipleResponse rResponse)
        {
            var parsedJson = JToken.Parse(rResponse.Records.ToString());

            return new JsonResult(parsedJson)
            {
                SerializerSettings = new JsonSerializerSettings
                {
                    Formatting = Formatting.Indented
                }
            };
        }

        public static IActionResult ConvertJObjectToJson(JObject jObject)
        {
            return new JsonResult(jObject)
            {
                SerializerSettings = new JsonSerializerSettings
                {
                    Formatting = Formatting.Indented // Enable pretty-printing
                }
            };
        }
    }
}

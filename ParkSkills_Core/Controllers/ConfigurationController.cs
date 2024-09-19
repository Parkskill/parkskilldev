using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using PowerApps.Samples;
using PowerApps.Samples.Messages;
using PowerApps.Samples.Methods;

namespace ParkSkills_Core.Controllers
{
    [ApiController]
    [Route("[controller]")] 
    public class ConfigurationController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {

            Config config = App.InitializeApp();

            var service = new Service(config);

            string fetchXML = @"<fetch version='1.0' mapping='logical' no-lock='false' distinct='true'><entity name='pst_configuration'><all-attributes /><filter type='and'><condition attribute='statecode' operator='eq' value='0'/></filter></entity></fetch>";
            RetrieveMultipleResponse rResponse = service.RetrieveMultiple("pst_configurations", 1000, false).Result;

            return new JsonResult(rResponse.Records.ToString());
        }

        [HttpGet]
        [Route("GetById")]
        public IActionResult GetById(string guid)
        {
            Config config = App.InitializeApp();

            var service = new Service(config);

            string fetchXML = @"<fetch version='1.0' mapping='logical' no-lock='false' distinct='true'><entity name='pst_configuration'><all-attributes /><filter type='and'><condition attribute='statecode' operator='eq' value='0'/></filter></entity></fetch>";
            //RetrieveMultipleResponse rResponse = service.Retrieve("pst_configurations", new Guid(id), new Column("pst_bannerimage")).Result;

            EntityReference entRe = new EntityReference("pst_configurations", new Guid(guid));
            JObject rResponse = service.Retrieve(entRe, "?$select=pst_bannerimage").Result;

            return new JsonResult(rResponse.ToString());
        }
    }
}

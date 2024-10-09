using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ParkSkills_Core.Utility;
using PowerApps.Samples;
using PowerApps.Samples.Messages;
using PowerApps.Samples.Methods;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Xml.Linq;
using XrmEntities;

namespace ParkSkills_Core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TilesController : ControllerBase
    {



        [HttpGet]
        public IActionResult Get()
        {

            Config config = App.InitializeApp();

            var service = new Service(config);

            string fetchXML = @"<fetch version='1.0' mapping='logical' no-lock='false' distinct='true'><entity name='pst_tile'><all-attributes /><order attribute='pst_name' descending='false'/><filter type='and'><condition attribute='statecode' operator='eq' value='0'/></filter></entity></fetch>";
            RetrieveMultipleResponse rResponse = service.RetrieveMultiple("pst_tiles", 1000, false).Result;

            // DataverseService.Instance().UseWebApi = true;
            // EntityCollection entColl = DataverseService.Instance().RetrieveMultiple(new FetchExpression(fetchXML));

            // return new JsonResult(entColl.Entities.ToList().Select(r => r.ToEntity<pst_tile>()).ToList());
            return CommonMethods.ConvertResponseToJson(rResponse);
           // return new JsonResult(rResponse.Records.ToString());
        }

        [HttpGet("gettiles")]
        public IActionResult GetTiles()
        {

            Config config = App.InitializeApp();

            var service = new Service(config);
            
            RetrieveMultipleResponse rResponse = service.RetrieveMultiple("pst_tiles?$expand=pst_tile_pst_finish_pst_finish($select=pst_finishid,pst_name),pst_tile_pst_shape_pst_shape($select=pst_shapeid,pst_name),pst_tile_pst_size_pst_size($select=pst_sizeid,pst_name)", 1000, false).Result;

            // DataverseService.Instance().UseWebApi = true;
            // EntityCollection entColl = DataverseService.Instance().RetrieveMultiple(new FetchExpression(fetchXML));

            // return new JsonResult(entColl.Entities.ToList().Select(r => r.ToEntity<pst_tile>()).ToList());
            return CommonMethods.ConvertResponseToJson(rResponse);
        }

        [HttpGet("gettilebyid/{tileId}")]
        public async Task<IActionResult> GetTileById(string tileId)
        {
            Config config = App.InitializeApp();

            var service = new Service(config);

            PowerApps.Samples.EntityReference tileRef = new PowerApps.Samples.EntityReference("pst_tiles", new Guid(tileId));
            var rResponse = service.Retrieve(tileRef, "", true, null, null).Result;

            var rResponseAttachment = service.Retrieve(tileRef, "?$select=pst_thumbnail", true, null, null).Result;


            return CommonMethods.ConvertJObjectToJson(rResponse);
        }

        [HttpGet("getroomscene")]
        public async Task<IActionResult> getroomscene()
        {
            Config config = App.InitializeApp();

            var service = new Service(config);

            RetrieveMultipleResponse rResponse = service.RetrieveMultiple("annotations?$select=annotationid,notetext,documentbody,filename,objecttypecode,_objectid_value,subject&$expand=objectid_pst_tile($select=pst_tileid,_pst_collectiontileid_value,pst_name,_pst_tiletypeid_value,_pst_utilizetileid_value)&$filter=subject eq 'Room Scene'", 100, false).Result;

            return CommonMethods.ConvertResponseToJson(rResponse);
        }




        [HttpGet("GetFilters")]
        public async Task<IActionResult> GetFilters()
        {
            Config config = App.InitializeApp();

            var service = new Service(config);


            //string pst_colorFetchXML = @"<fetch version='1.0' mapping='logical' no-lock='false' distinct='true'><entity name='pst_color'><all-attributes /><order attribute='pst_name' descending='false'/><filter type='and'><condition attribute='statecode' operator='eq' value='0'/></filter></entity></fetch>";
            //string pst_finishFetchXML = @"<fetch version='1.0' mapping='logical' no-lock='false' distinct='true'><entity name='pst_finish'><all-attributes /><order attribute='pst_name' descending='false'/><filter type='and'><condition attribute='statecode' operator='eq' value='0'/></filter></entity></fetch>";
            //string pst_sizeFetchXML = @"<fetch version='1.0' mapping='logical' no-lock='false' distinct='true'><entity name='pst_size'><all-attributes /><order attribute='pst_name' descending='false'/><filter type='and'><condition attribute='statecode' operator='eq' value='0'/></filter></entity></fetch>";
            //string pst_typeFetchXML = @"<fetch version='1.0' mapping='logical' no-lock='false' distinct='true'><entity name='pst_type'><all-attributes /><order attribute='pst_name' descending='false'/><filter type='and'><condition attribute='statecode' operator='eq' value='0'/></filter></entity></fetch>";
            //string pst_collectionsFetchXML = @"<fetch version='1.0' mapping='logical' no-lock='false' distinct='true'><entity name='pst_collections'><all-attributes /><order attribute='pst_name' descending='false'/><filter type='and'><condition attribute='statecode' operator='eq' value='0'/></filter></entity></fetch>";

            RetrieveMultipleResponse pst_colorResponse = service.RetrieveMultiple("pst_colors", 100, false).Result;
            
            RetrieveMultipleResponse pst_finishResponse = service.RetrieveMultiple("pst_finishs", 100, false).Result;
          
            RetrieveMultipleResponse pst_sizeResponse = service.RetrieveMultiple("pst_sizes", 100, false).Result;
          
            RetrieveMultipleResponse pst_typeResponse = service.RetrieveMultiple("pst_types", 100, false).Result;
           
            RetrieveMultipleResponse pst_collectionsResponse = service.RetrieveMultiple("pst_collectionses", 100, false).Result;


            var filterResponse = new
            {
                pst_color = JToken.Parse(pst_colorResponse.Records.ToString()),
                pst_finish = JToken.Parse(pst_finishResponse.Records.ToString()),
                pst_size = JToken.Parse(pst_sizeResponse.Records.ToString()),
                pst_type = JToken.Parse(pst_typeResponse.Records.ToString()),
                pst_collections = JToken.Parse(pst_collectionsResponse.Records.ToString())
                //pst_collections = JsonDocument.Parse(pst_collectionsResponse.Records.ToString()).RootElement
            };

            // Return JSON result with proper formatting
            return new JsonResult(filterResponse)
            {
                SerializerSettings = new JsonSerializerSettings
                {
                    Formatting = Formatting.Indented  // This will ensure pretty-printing
                }
            };

           // return Ok(filterResponse);
        }



        [HttpGet("getcolors")]
        public async Task<IActionResult> GetColors()
        {
            Config config = App.InitializeApp();
            var service = new Service(config);
            RetrieveMultipleResponse rResponse = await service.RetrieveMultiple("pst_colors", 100, false);
            return CommonMethods.ConvertResponseToJson(rResponse);
        }

       

        [HttpGet("GetFinishes")]
        public async Task<IActionResult> GetFinishes()
        {
            Config config = App.InitializeApp();
            var service = new Service(config);
            RetrieveMultipleResponse rResponse =  await service.RetrieveMultiple("pst_finishs", 100, false);
            return CommonMethods.ConvertResponseToJson(rResponse);
        }
    }
}

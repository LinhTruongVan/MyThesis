using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ServerApi.DAL;

namespace ApiServer.Services
{
    public class InternationShipData
    {
        public List<float[]> Data { get; set; }
    }

    public class InternationalShipService
    {
        private static readonly string fileJsonPath = @"E:\MyThesis\MyThesis\Monitor\app\data.json";
        private readonly ThesisContext _context = new ThesisContext();

        public InternationShipData GetInternationShipData()
        {
            try
            {
                var latestInternationalShip = (from c in _context.InternationalShips
                                               orderby c.Id descending 
                                               select c).FirstOrDefault();
                if(latestInternationalShip == null) return new InternationShipData();

                var tempObject = JsonConvert.DeserializeObject<JObject>(latestInternationalShip.Data);

                return new InternationShipData()
                {
                    Data = (List<float[]>) tempObject["data"].ToObject(typeof (List<float[]>))
                };
            }
            catch (IOException error)
            {
                return new InternationShipData();
            }
        }
    }
}
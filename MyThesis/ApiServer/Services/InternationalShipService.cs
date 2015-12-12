using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace ApiServer.Services
{
    public class InternationShipData
    {
        public List<float[]> Data { get; set; }
    }

    public class InternationalShipService
    {
        private static readonly string fileJsonPath = @"E:\MyThesis\MyThesis\Monitor\app\data.json";

        public InternationShipData GetInternationShipData()
        {
            try
            {
                InternationShipData data =
                    JsonConvert.DeserializeObject<InternationShipData>(File.ReadAllText(fileJsonPath));
                return data;
            }
            catch (IOException error)
            {
                return new InternationShipData();
            }
        }
    }
}
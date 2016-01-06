using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ApiServer.Models.Ship;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ServerApi.DAL;

namespace ApiServer.Services
{
    public class InternationShipData
    {
        public List<float[]> Data { get; set; }
        public DateTime CreatedAt { get; set; }
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
                if (latestInternationalShip == null) return new InternationShipData()
                 {
                     Data = new List<float[]>()
                 };

                var tempObject = JsonConvert.DeserializeObject<JObject>(latestInternationalShip.Data);

                return new InternationShipData()
                {
                    Data = (List<float[]>)tempObject["data"].ToObject(typeof(List<float[]>)),
                    CreatedAt = latestInternationalShip.CreatedAt
                };
            }
            catch (IOException)
            {
                return new InternationShipData()
                {
                    Data = new List<float[]>()
                };
            }
        }

        public List<InternationShipData> GetAll()
        {
            var result = new List<InternationShipData>();
            try
            {
                var ships = _context.InternationalShips.ToList();

                foreach (var ship in ships)
                {
                    if (ship == null)
                    {
                        result.Add(new InternationShipData()
                        {
                            Data = new List<float[]>()
                        });
                    }
                    else
                    {
                        var tempObject = JsonConvert.DeserializeObject<JObject>(ship.Data);
                        result.Add(new InternationShipData()
                        {
                            Data = (List<float[]>)tempObject["data"].ToObject(typeof(List<float[]>)),
                            CreatedAt = ship.CreatedAt
                        });
                    }
                }

                return result;
            }
            catch (Exception)
            {
                return result;
            }
        }
    }
}
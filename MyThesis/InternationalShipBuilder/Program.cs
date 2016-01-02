using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace InternationalShipBuilder
{
    public class InternationalShip
    {
        public string Data { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    class Program
    {
        static void Main()
        {
            Console.WriteLine("Run in loop mode");
            while (true)
            {
                RunAsync().Wait();
                Thread.Sleep(900000);
            }
        }

        static async Task RunAsync()
        {
            var imagePath = @"E:\MyThesis\MyThesis\InternationalShipBuilder\sp.png";
            if (File.Exists(imagePath))
            {
                File.Delete(imagePath);
                Console.WriteLine("Drop old files");
            }
            DownloadImage(imagePath);
            var data = new InternationalShip()
            {
                CreatedAt = DateTime.Now,
                Data = BuildDataAsString(imagePath)
            };

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:9999/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = await client.PostAsJsonAsync("api/international-ship-data", data);
                Console.WriteLine(response.IsSuccessStatusCode ? "Sent data to server" : "Cannot sent data to server");
            }
        }

        public static void DownloadImage(string imagePath)
        {
            using (var client = new WebClient())
            {
                client.DownloadFile("http://raster.shipfinder.com/r2/sp.dll?cmd=112&scode=11111111&z=6&y=28&x=54", imagePath);
            }
        }
        public static string BuildDataAsString(string imagePath)
        {
            using (var img = (Bitmap)Image.FromFile(imagePath))
            {
                var points = new List<int[]>();
                var shipLocations = new JArray();

                for (var i = 0; i < img.Width; i++)
                {
                    for (var j = 0; j < img.Height; j++)
                    {
                        var pixel = img.GetPixel(i, j);
                        if (pixel.B == 255 && pixel.G == 255 && pixel.R == 255) continue;

                        if (IsValidPoint(points, i, j) == false) continue;

                        var newPoint = new[] { i, j };
                        points.Add(newPoint);
                        shipLocations.Add(new JArray(16 - (float)3 * j / 128, 110 + (float)3 * i / 128));
                    }

                }

                var data = new JObject(new JProperty("data", shipLocations));
                return JsonConvert.SerializeObject(data);
            }
        }

        public static bool IsValidPoint(List<int[]> points, int x, int y)
        {
            return points.All(point => !(CalculateDistance(point[0], point[1], x, y) < 5));
        }

        public static double CalculateDistance(int x1, int y1, int x2, int y2)
        {
            return Math.Sqrt(Math.Pow(x2 - x1, 2) + Math.Pow(y2 - y1, 2));
        }

    }
}
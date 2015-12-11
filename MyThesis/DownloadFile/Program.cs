using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Net;
using System.Threading;
using System.Drawing;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DownloadFile
{

    class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Run in loop mode");
            while (true)
            {
                HandleData();
                Thread.Sleep(900000);
            }
        }

        public static void HandleData()
        {
            var imagePath = @"E:\MyThesis\MyThesis\Monitor\app\sp.png";
            var jsonPath = @"E:\MyThesis\MyThesis\Monitor\app\data.json";

            if (File.Exists(jsonPath)) File.Delete(jsonPath);
            if (File.Exists(imagePath)) File.Delete(imagePath);
            Console.WriteLine("Drop old files");

            WebClient client = new WebClient();
            client.DownloadFile("http://raster.shipfinder.com/r2/sp.dll?cmd=112&scode=11111111&z=6&y=28&x=54", imagePath);
            BuildJsonFile(imagePath, jsonPath);
            Console.WriteLine("Download & create data file");
        }

        public static void BuildJsonFile(string imagePath, string jsonPath)
        {
            using (Bitmap img = (Bitmap)Image.FromFile(imagePath))
            {
                var points = new List<int[]>();
                JArray shipLocations = new JArray();

                for (var i = 0; i < img.Width; i++)
                {
                    for (var j = 0; j < img.Height; j++)
                    {
                        var pixel = img.GetPixel(i, j);
                        if (pixel.B == 255 && pixel.G == 255 && pixel.R == 255) continue;

                        if (IsValidPoint(points, i, j) == false) continue;

                        var newPoint = new int[] { i, j };
                        points.Add(newPoint);
                        shipLocations.Add(new JArray(16 - (float)3 * j / 128, 110 + (float)3 * i / 128));
                    }

                }

                var data = new JObject(new JProperty("data", shipLocations));
                File.WriteAllText(jsonPath, data.ToString());
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

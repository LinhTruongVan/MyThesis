using System;
using System.Collections.Generic;
using System.Linq;
using ApiServer.Models.Location;
using ApiServer.Models.Ship;
using ApiServer.Models.User;
using ApiServer.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ApiServer.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<ServerApi.DAL.ThesisContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        private readonly GenerateShipLocationService _generateShipLocationService = new GenerateShipLocationService();
        protected override void Seed(ServerApi.DAL.ThesisContext context)
        {
            context.Users.AddOrUpdate(new User()
            {
                UserName = "admin",
                Password = "admin",
                FullName = "Người Quản Trị",
                UserRole = UserRole.Admin
            });

            var userNames = new List<string>()
            {
                "buinamlien", "buiphuongnam", "anmnhtang", "chuvanminh",
                "cungminhcuong", "damminhson", "damminhtinh", "danghoangminhhai",
                "dangminhchau", "trananhdung", "phantranvila", "thuongtranbaotruong",
                "totranngocphuc", "nguyentrananh", "nguyentrandai", "nguyentranduan",
                "buiminhsong", "buiducsang", "vongocphuonglam", "vulamdien",
                "nguyenlamhieu", "nguyendanglam", "nguyensonglam", "avancam"
            };

            var fullNames = new List<string>()
            {
                "BÙI NAM LIÊN", "BÙI PHƯƠNG NAM", "AN MINH TĂNG", "CHU VĂN MINH",
                "CUNG MINH CƯỜNG", "ĐÀM MINH SƠN", "ĐÀM MINH TÍNH", "ĐẶNG HOÀNG MINH HẢI",
                "ĐẶNG MINH CHÂU", "TRẦN ANH DŨNG", "PHAN TRẦN VI LA", "THƯỢNG TRẦN BẢO TRƯỜNG",
                "TÔ TRẦN NGỌC PHÚC", "NGUYỄN TRẦN ANH", "NGUYỄN TRẦN ĐẠI", "NGUYỄN TRẦN DUẨN",
                "BÙI ĐÌNH SONG", "BÙI ĐỨC SÁNG", "VÕ NGỌC PHƯƠNG LAM", "VŨ LAM ĐIỀN",
                "NGUYỄN LAM HIẾU", "NGUYỄN ĐĂNG LAM", "NGUYỄN SÔNG LAM", "A VĂN CẢM"
            };
            var phones = new List<string>()
            {
                "01629071668", "01217888668", "01267882468", "01267152468", "01267152489",
                "01267880068", "01267980068", "0986936668", "0971139968", "0971620468",
                "0994155568", "0908452668", "0943876868", "01263556868", "01269556868",
                "01266616868", "01687955268", "01687255268", "01687955267", "01687955224",
                "01667939668", "01667939669", "01667939068", "01667930668"
            };

            for (var index = 0; index < userNames.Count; index++)
            {
                context.Users.Add(new User()
                {
                    FullName = fullNames[index],
                    Phone = phones[index],
                    UserName = userNames[index],
                    UserRole = UserRole.User,
                    Password = "123456"
                });
            }
            context.SaveChanges();

            var shipSpeeds = new List<int>() { 20, 25, 30, 40, 50 };
            var shipWeights = new List<int>() { 1000, 1200, 1500, 1600, 2000 };
            var shipSailedTimestamp = new DateTime(2016, 1, 5);
            var shipCaptions = new List<string>()
            {
                "BÙI THANH NAM", "BÙI THẾ NAM", "BÙI TRUNG NAM", "BÙI TIẾN NAM", "CAO VĂN NAM",
                "ĐÀM QUANG NAM", "NGUYỄN KHẮC ANH", "ĐỖ VĂN NGUYỄN", "DƯƠNG NGUYỄN ANH TUẤN", "HÀ NGUYỄN HỮU DUYÊN",
                "ĐẶNG CHU NAM", "BÙI NGUYỄN BẢO DUY", "HÀ VĂN NGUYỄN", "HUỲNH NGUYỄN CÔNG BẰNG", "HUỲNH NGUYỄN HOÀNG LONG",
                "ĐẶNG ĐÌNH NAM", "BÙI NGUYỄN GIÁP", "HUỲNH NGUYỄN PHƯƠNG CHÂU", "KHỔNG NGUYỄN MINH DƯƠNG", "LÊ NGUYỄN QUÍ NHẤT",
                "ĐẶNG GIANG NAM", "BÙI NGUYỄN HOÀNG", "DƯƠNG HẢI VINH", "LÊ NGUYỄN BẢO TRUNG", "LÊ NGUYỄN HUY CƯỜNG",
                "ĐẶNG XUÂN NAM", "BÙI NGUYỄN NHẬT THỊNH", "ĐOÀN VĂN LINH", "CHU ANH MINH", "DƯƠNG ĐÌNH VINH",
                "ĐÀO ĐÌNH NAM", "BÙI NGUYỄN TRẦN BẢO", "CAO MINH TẤN", "NGUYỄN NGỌC DANH", "NGUYỄN DANH NAM",
                "ĐÀO HOÀI NAM", "BÙI NGUYỄN TÚ", "CHÂU MINH TÂM", "LÊ VĂN NGUYỄN VŨ", "BÙI TINH KHÔI",
                "ĐÀO HẢI NAM", "ĐẶNG NGUYỄN KHÁNH TUÂN", "ĐẶNG QUÝ HUY", "LÊ ĐÌNH NGUYỄN", "VŨ VĂN NGA",
                "ĐÀO NAM CHUNG", "DANH NGUYỄN TÝ", "NGUYỄN HỮU DANH", "ĐẶNG TRỌNG HUY", "ĐÀO XUÂN HUY",
                "ĐẬU ĐÌNH NAM", "ĐINH NGUYỄN DUY THỊNH", "TRẦN VĂN NGAY", "DƯƠNG PHAN LINH QUÂN", "DƯƠNG PHẠM TRỌNG PHƯƠNG",
                "ĐIỀN HOÀ NAM", "CAO MINH TÂM", "ĐẶNG TRỌNG HUY", "ĐẶNG HOÀNG MINH", "ĐẬU THANH HUY",
                "ĐỖ LƯỜNG NAM", "ĐINH NGUYỄN MINH QUÂN", "LÊ TRỌNG NGUYỄN", "PHẠM ANH PHI", "HỒ XUÂN ĐỨC LINH",
                "ĐỖ NAM BÌNH", "HUỲNH HOÀNG DANH", "PHẠM ANH NHÂN", "LÊ NGUYỄN NGỌC TOÀN", "ĐẶNG HIẾU MINH",
                "ĐỖ NGỌC NAM", "KHƯƠNG DANH VIỆT", "MANG NGUYỄN HỒNG DUY", "ĐINH NGUYỄN DUY THỊNH", "HỒ PHẠM DANH",
                "ĐỖ TẤT NAM", "HOÀNG PHẠM DUY", "NGUYỄN SỸ DANH", "ĐẶNG VĂN TINH", "HOÀNG VINH",
                "ĐỖ THÀNH NAM", "DƯƠNG ĐỨC LINH", "ĐOÀN VINH HIỂN", "BÙI HUY HƯNG", "NGUYỄN NGỌC TINH",
                "ĐỖ XUÂN NAM", "LÊ NGUYỄN XUÂN QUANG", "LÊ CÔNG DANH", "ĐINH NGUYỄN QUỐC CƯỜNG", "PHẠM BÁ DŨNG",
                "ĐOÀN HẢI NAM", "NGUYỄN DANH NGỌC", "MAI NGUYỄN QUYẾT THẮNG", "ĐÀO VĂN HUYÊN", "PHẠM ANH QUÂN",
                "ĐOÀN ĐẠI NAM", "HOÀNG VĂN VINH", "NGUYỄN DANH MẠNH", "TRƯƠNG TRỌNG TIN", "HOANG TRỌNG CÔI",
                "ĐỒNG CHÍ NAM", "ĐẶNG HOÀNG MINH HẢI", "VŨ VĂN TINH", "ĐẶNG QUỐC HUY", "ĐÀO VĂN HUYÊN",
                "DƯƠNG HOÀI NAM", "CHU MINH ĐỨC", "DƯƠNG QUANG VINH", "LÊ VĂN NGUYỄN VŨ", "ĐINH NGUYỄN MINH QUÂN"
            };

            var rnd = new Random();
            foreach (var captionName in shipCaptions)
            {
                context.Ships.Add(new Ship()
                {
                    ShipType = ShipType.FishingShip,
                    Speed = shipSpeeds[rnd.Next(0, 5)],
                    Weight = shipWeights[rnd.Next(0, 5)],
                    ShipStatus = ShipStatus.Normal,
                    Caption = captionName,
                    Sailors = rnd.Next(8, 15),
                    SailedAt = shipSailedTimestamp,
                    UserId = rnd.Next(2, 26)
                });
            }
            context.SaveChanges();

            var latitudes = new List<double>()
            {
                9.058702, 9.158366, 9.245126, 9.310181, 9.489022, 9.619029, 9.797707, 10.084474,
                10.311542, 10.372673, 10.489837, 10.614044, 10.770579, 10.959394, 11.115749, 11.239695,
                11.336659, 11.568162, 11.718805, 11.955365, 12.175609, 12.465408, 12.674506, 12.904852,
                13.113586, 13.343524, 13.455741, 13.631974, 13.829412, 14.032013, 14.255732, 14.457953,
                14.723753, 14.899004, 15.127147, 15.217276, 15.349748, 15.368122, 15.384012, 15.394604,
                15.393280, 15.406520, 15.440940, 15.480648, 15.507115, 15.544164, 15.574593, 15.620888,
                15.676428,15.710803 ,15.764997 ,15.813891 ,15.897117 ,15.920642 ,15.932527 , 15.942431,
                15.957616,15.966858,15.976760,15.971479,15.984021,15.999863,16.013724,16.033523,
                16.095093,16.102350,16.111256,16.114884,16.116203,16.121151,16.124119,16.127088,
                16.213150,16.219084,16.219413,16.218095,16.220402,16.223699,16.274788,16.280391,
                16.282801,16.284613,16.286920,16.289886,16.293017,16.294994,16.297300,16.299937,
                16.304220,16.306197,16.308175,16.309987,16.313447,16.316412,16.319872,16.322837,
                15.386722,15.386722,15.386722,15.386722,15.386722,15.386722,15.386722,15.386722,
                15.388874,15.388874,15.388874,15.388874,15.388874,15.388874,15.388874,15.388874,
                13.710431,13.710431,13.710431,13.710431,13.710431,13.710431,13.710431,13.710431
            };
            var longitudes = new List<double>()
            {
                105.592346, 105.798340, 105.968628, 9.310181, 106.430054, 106.578369, 106.677246, 106.798096,
                107.078247, 107.256775, 107.506714, 107.781372, 108.034058, 108.347168, 108.522949, 108.786621,
                108.995361, 109.127197, 109.231567, 109.270020, 109.341431, 109.368896, 109.456787, 109.456787,
                109.341431, 109.330444, 109.335938, 109.264526, 109.324951, 109.270020, 109.209595, 109.121704,
                109.077759, 108.962402, 108.918457, 108.945923, 109.171143, 109.165649, 109.149170, 109.124451,
                108.831940, 15.406520, 108.697357, 108.675385, 108.639679, 108.602600, 108.565521, 108.532562,
                108.495483, 108.468018,108.439178 ,108.417206 ,108.549042 ,108.538742 ,108.540802, 108.537369,
                108.532562,108.514023,108.503036,108.286743,108.280563,108.273010,108.264771,108.256531,
                108.306313,108.310776,108.316269,108.326569,108.338585,108.337555,108.333092,108.331032,
                108.162117,108.152161,108.148041,108.110275,108.103752,108.097916,108.058777,108.055000,
                108.052940,108.051910,108.050194,108.048992,108.047447,108.045731,108.044529,108.042641,
                108.040066,108.038521,108.037663,108.036976,108.041439,108.039894,108.039894,108.037319,
                109.142990,109.142990,109.142990,109.142990,109.142990,109.142990,109.142990,109.142990,
                109.137154,109.137154,109.137154,109.137154,109.137154,109.137154,109.137154,109.137154,
                109.222469,109.222469,109.222469,109.222469,109.222469,109.222469,109.222469,109.222469
            };

            var myShips = context.Ships.ToList();
            for (var m = 0; m < myShips.Count; m++)
            {
                var currentShip = myShips[m];
                var currentLatitude = latitudes[m];
                var currentLongitude = longitudes[m];
                var currentSailedTime = new DateTime(2016, 1, 5, 7, 30, 0);

                var currentAngles = new List<int>() { 90, 80, 70, 100, 110 };

                for (var i = 0; i < 25; i++)
                {
                    context.ShipLocations.Add(new ShipLocation()
                    {
                        ShipId = currentShip.Id,
                        ShipStatus = ShipStatus.Normal,
                        Angle = 90,
                        CreatedAt = currentSailedTime,
                        Latitude = currentLatitude,
                        Longitude = currentLongitude
                    });

                    var newLocation =
                        _generateShipLocationService.FindPointAtDistanceFrom(
                            new SimpleLocation(currentLatitude, currentLongitude), 90, currentShip.Speed / 2);
                    currentLatitude = newLocation.Latitude;
                    currentLongitude = newLocation.Longitude;
                    currentSailedTime = currentSailedTime.AddMinutes(30);

                }

                for (var i = 0; i < 75; i++)
                {
                    var tempAngle = currentAngles[rnd.Next(0, 5)];
                    context.ShipLocations.Add(new ShipLocation()
                    {
                        ShipId = currentShip.Id,
                        ShipStatus = ShipStatus.Normal,
                        Angle = tempAngle,
                        CreatedAt = currentSailedTime,
                        Latitude = currentLatitude,
                        Longitude = currentLongitude
                    });

                    var newLocation =
                        _generateShipLocationService.FindPointAtDistanceFrom(
                            new SimpleLocation(currentLatitude, currentLongitude), tempAngle, currentShip.Speed / 2);
                    currentLatitude = newLocation.Latitude;
                    currentLongitude = newLocation.Longitude;
                    currentSailedTime = currentSailedTime.AddMinutes(30);

                }
                context.SaveChanges();
            }

            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 7.885147,
                Longitude = 108.160400,
                WarningLocationType = WarningLocationType.Reef
            });
            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 6.599131,
                Longitude = 105.963135,
                WarningLocationType = WarningLocationType.Reef
            });
            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 9.795678,
                Longitude = 108.995361,
                WarningLocationType = WarningLocationType.Reef
            });
            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 15.284185,
                Longitude = 109.237061,
                WarningLocationType = WarningLocationType.Reef
            });
            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 11.996338,
                Longitude = 114.071045,
                WarningLocationType = WarningLocationType.ChinaShip
            });
            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 11.350797,
                Longitude = 113.763428,
                WarningLocationType = WarningLocationType.ChinaShip
            });
            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 13.111580,
                Longitude = 114.840088,
                WarningLocationType = WarningLocationType.ChinaShip
            });
            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 5.112830,
                Longitude = 107.874756,
                WarningLocationType = WarningLocationType.Pirate
            });
            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 5.637853,
                Longitude = 104.666748,
                WarningLocationType = WarningLocationType.Pirate
            });
            context.WarningLocations.Add(new WarningLocation()
            {
                UserId = 1,
                CreatedAt = DateTime.Now,
                Latitude = 6.249776,
                Longitude = 103.634033,
                WarningLocationType = WarningLocationType.Pirate
            });
            context.SaveChanges();

            var currentInternationShipTime = new DateTime(2016, 1, 5, 7, 30, 0);
            for (var m = 0; m < 100; m++)
            {
                var tempInternationShip = new InternationalShip()
                {
                    CreatedAt = currentInternationShipTime,
                    Data = JsonConvert.SerializeObject(new JObject(new JProperty("data", _generateShipLocationService.GetRandomInternationalShipLocation())))
                };
                currentInternationShipTime = currentInternationShipTime.AddMinutes(30);
                context.InternationalShips.Add(tempInternationShip);
            }
            context.SaveChanges();

        }
    }
}

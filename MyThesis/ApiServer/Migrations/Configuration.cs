using System;
using System.Collections.Generic;
using ApiServer.Models.Ship;
using ApiServer.Models.User;

namespace ApiServer.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<ServerApi.DAL.ThesisContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ServerApi.DAL.ThesisContext context)
        {
            context.Users.AddOrUpdate(new User()
            {
                UserName = "admin",
                Password = "admin",
                FullName = "Admin",
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

            for (var index=0; index<userNames.Count; index++)
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

            var shipSpeeds = new List<int>(){20,25,30,40,50};
            var shipWeights = new List<int>(){1000,1200,1500,1600,2000};
            var shipSailedTimestamp = new DateTime(2015,12,29);
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
            foreach (string captionName in shipCaptions)
            {
                context.Ships.Add(new Ship()
                {
                    ShipType = ShipType.FishingShip,
                    Speed = shipSpeeds[rnd.Next(0,5)],
                    Weight = shipWeights[rnd.Next(0, 5)],
                    ShipStatus = ShipStatus.Normal,
                    Caption = captionName,
                    Sailors = rnd.Next(8,15),
                    SailedAt = shipSailedTimestamp,
                    UserId = rnd.Next(2,26)
                });
            }
        }
    }
}

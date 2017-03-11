using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 城市公交管理系统_ASP.EntityClass
{
    public class User
    {
        private string user_name;
        public string User_Name
        {
            get { return user_name; }
            set { user_name = value; }
        }

        private string user_password;
        public string User_Password
        {
            get { return user_password; }
            set { user_password = value; }
        }
    }
}
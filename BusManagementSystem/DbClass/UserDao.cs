using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using 城市公交管理系统_ASP.EntityClass;

namespace 城市公交管理系统_ASP.DbClass
{
    public class UserDao : BaseDao
    {
        private UserDao() { }
        public static UserDao userdao = new UserDao();
        public static UserDao getInstance()
        {
            return userdao;
        }

        public bool login(User user)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from User_Table where User_Name = '" + user.User_Name + "' and User_Password = '" + user.User_Password + "'";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataReader sqldatareader = sqlcommand.ExecuteReader();
            if (sqldatareader.HasRows)
            {
                return true;
            }
            return false;

        }
    }
}
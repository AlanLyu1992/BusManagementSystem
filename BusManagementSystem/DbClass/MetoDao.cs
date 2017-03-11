using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using 城市公交管理系统_ASP.EntityClass;
using System.Data.SqlClient;
using System.Data;
using System.Text;


namespace 城市公交管理系统_ASP.DbClass
{
    public class MetoDao :BaseDao
    {
        private MetoDao() { }
        public static MetoDao metodao = new MetoDao();
        public static MetoDao getInstance()
        {
            return metodao;
        }

        public bool OperateMetoInfo(string sql)
        {
            SqlConnection sqlconnection = this.GetConnection();
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            int i = sqlcommand.ExecuteNonQuery();
            if (i > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public DataSet getMetoInfo()
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Meto_Table";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Meto_Table");
            sqlconnection.Close();
            if (dataset.Tables[0].Rows.Count == 0)
            {
                return null;
            }
            else
            {
                return dataset;
            }
        }
    }
}
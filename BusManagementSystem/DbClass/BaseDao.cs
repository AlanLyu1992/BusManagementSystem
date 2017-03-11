using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace 城市公交管理系统_ASP.DbClass
{
    public class BaseDao
    {
        protected string con = "Server=PC-201301111733\\SQLEXPRESS;Database=Transportation management system;Trusted_Connection=SSPI";
        public SqlConnection GetConnection()
        {
            SqlConnection sqlconnection = new SqlConnection(con);
            sqlconnection.Open();
            return sqlconnection;
        }

        public int GetRecordCount(string tableName)
        {
            string sql = "select count(1) as number FROM " + tableName + " ";   
            SqlConnection sqlconnection = this.GetConnection();
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, tableName);
            sqlconnection.Close();
            DataRow dr = dataset.Tables[0].Rows[0];
            return (Convert.ToInt32(dr["number"]));
        }

        public DataSet Query(string sql)
        {
            SqlConnection sqlconnection = this.GetConnection();
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Bus_Table");
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
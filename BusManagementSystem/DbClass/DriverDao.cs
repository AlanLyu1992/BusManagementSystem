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
    public class DriverDao :BaseDao
    {
        private DriverDao() { }
        public static DriverDao driverdao = new DriverDao();
        public static DriverDao getInstance()
        {
            return driverdao;
        }

        public bool deleteDriver(string driverno)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "delete Driver_Table where DriverNo = '" + driverno + "'";
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

        public bool addDriver(DriverEntity driver)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "insert into Driver_Table (Name,BirthDate,BirthPlace,Age,VehicleId,Wage,DriverNo) values('" + driver.Name + "','" + driver.BirthDate + "',' " + driver.BirthPlace + "','" + driver.Age + "','" + driver.VehicleId + "','" + driver.Wage + "','" + driver.DriverNo + "')";
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

        public DataSet GetListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT * FROM ( ");
            strSql.Append(" SELECT ROW_NUMBER() OVER (");
            if (!string.IsNullOrEmpty(orderby.Trim()))
            {
                strSql.Append("order by T." + orderby);
            }
            else
            {
                strSql.Append("order by T.DriverNo asc");
            }
            strSql.Append(")AS Row, T.*  from Driver_Table T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return this.Query(strSql.ToString());
        }

        public bool OperateDriverInfo(string sql)
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

        public DataSet Query(string sql)
        {
            SqlConnection sqlconnection = this.GetConnection();
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Driver_Table");
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

        public DataSet getDriverInfo()
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Driver_Table";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Driver_Table");
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
        public DataSet getDriverInfo(string driverno)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Driver_Table where DriverNo = '" + driverno + "'";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            Driver driver = new Driver();
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Driver_Table");
            sqlconnection.Close();
            if (dataset.Tables[0].Rows.Count == 0)
            {
                return null;
            }
            else
            {
                return dataset;
                //DataRow dr = dataset.Tables[0].Rows[0];
                //driver.Name = dr["Name"].ToString();
                //driver.BirthDate = dr["BirthDate"].ToString();
                //driver.BirthPlace = dr["BirthPlace"].ToString();
                //driver.Age = dr["Age"].ToString();
                //driver.Wage = dr["Wage"].ToString();
                //driver.VehicleId = dr["VehicleId"].ToString();
                //return driver;
            }
        }

        public DataSet DriverInfo(string sql)
        {
            SqlConnection sqlconnection = this.GetConnection();
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Driver_Table");
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

        public DriverEntity getDriverInfo(DriverEntity driver)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Driver_Table where DriverNo = '" + driver.DriverNo + "'";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            
            
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Driver_Table");
            sqlconnection.Close();
            if (dataset.Tables[0].Rows.Count == 0)
            {
                return null;
            }
            else
            {
                DataRow dr = dataset.Tables[0].Rows[0];
                driver.Name = dr["Name"].ToString();
                driver.BirthDate = dr["BirthDate"].ToString();
                driver.BirthPlace = dr["BirthPlace"].ToString();
                driver.Age = dr["Age"].ToString();
                driver.Wage = dr["Wage"].ToString();
                driver.VehicleId = dr["VehicleId"].ToString();
                return driver;
            }
        }
    }
}
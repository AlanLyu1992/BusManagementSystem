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
    public class VehicleDao :BaseDao
    {
        private VehicleDao() { }
        public static VehicleDao vehicledao = new VehicleDao();
        public static VehicleDao getInstance()
        {
            return vehicledao;
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
                strSql.Append("order by T.VehicleNo asc");
            }
            strSql.Append(")AS Row, T.*  from Vehicle_Table T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return this.Query(strSql.ToString());
        }

        public bool OperateVehicleInfo(string sql)
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

        public DataSet VehicleInfo(string sql)
        {
            SqlConnection sqlconnection = this.GetConnection();
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Vehicle_Table");
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

        public DataSet getVehicleInfo()
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Vehicle_Table";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;

            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Vehicle_Table");
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
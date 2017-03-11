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
    public class StationDao :BaseDao
    {
        private StationDao() { }
        public static StationDao stationdao = new StationDao();
        public static StationDao getInstance()
        {
            return stationdao;
        }

        public bool addStation(Station station)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "insert into Station_Table (Station_Name,Bus) values('" + station.Station_Name + "','" + station.Buses +"')";
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

        public bool checkStationInfo(string stationname, string busname)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Station_Table where Station_Name = '" + stationname + "' and Bus like '%" + busname + "%'";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Station_Table");
            sqlconnection.Close();
            if (dataset.Tables[0].Rows.Count == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public bool updateStationInfo(Station station)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "update Station_Table set Bus = '" + station.Buses + "',Station_Name = '" + station.Station_Name + "' where Station_Id = '" + station.Station_Id + "'";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            int i = sqlcommand.ExecuteNonQuery();
            if (i > 0)
            {
                sqlconnection.Close();
                return true;
            }
            else
            {
                sqlconnection.Close();
                return false;
            }
        }

        public bool OperateStationInfo(string sql)
        {
            SqlConnection sqlconnection = this.GetConnection();
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            int i = sqlcommand.ExecuteNonQuery();
            if (i > 0)
            {
                sqlconnection.Close();
                return true;
            }
            else
            {
                sqlconnection.Close();
                return false;
            }
        }

        public DataSet getStationInfo(string sql)
        {
            SqlConnection sqlconnection = this.GetConnection();
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Station_Table");
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

        public DataSet getStationInfo()
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Station_Table";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Station_Table");
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

        public bool updateStationInfo(string bus,string stationname)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Station_Table where Station_Name = '" + stationname + "'";
            DataSet ds = this.getStationInfo(sql);
            if (ds.Tables[0].Rows[0]["Bus"].ToString().Trim() != "" || ds.Tables[0].Rows[0]["Bus"].ToString().Trim()!= string.Empty)
            {
                sql = "update Station_Table set Bus = Bus + '," + bus + "' where Station_Name = '" + stationname + "'";
            }
            else
            {
                sql = "update Station_Table set Bus = '" + bus + "' where Station_Name = '" + stationname + "'";
            }
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            int i = sqlcommand.ExecuteNonQuery();
            if (i > 0)
            {
                sqlconnection.Close();
                return true;
            }
            else
            {
                sqlconnection.Close();
                return false;
            }
        }

        public bool checkStationInfo(string stationname)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Station_Table where Station_Name = '" + stationname +"'";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Station_Table");
            sqlconnection.Close();
            if (dataset.Tables[0].Rows.Count == 0)
            {
                return false;
            }
            else
            {
                return true;
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
                strSql.Append("order by T.Station_Name asc");
            }
            strSql.Append(")AS Row, T.*  from Station_Table T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return this.Query(strSql.ToString());
        }  


    }
}
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
    public class BusDao :BaseDao
    {
        private BusDao() { }
        public static BusDao busdao = new BusDao();
        public static BusDao getInstance()
        {
            return busdao;
        }

        public DataSet getRoute(string originstation, string terminus)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Bus_Table where (Up like '%" + originstation + "%' and Up like '%" + terminus + "%') or (Down like '%" + originstation + "%' and Down like '%" + terminus + "%')";
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

        public DataSet getBusInfoByOriginStation(string station)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Bus_Table Where Up like '%" + station + "%' or Down like '%" + station + "%'";
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

        public DataSet getBusInfo(string busname, string station)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Bus_Table where BusName = '" + busname + "' and (Up like '%" + station + "%' or Down like '%" + station + "%')";
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

        public DataSet BusInfo(string sql)
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

        public DataSet getBusInfo()
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Bus_Table";
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

        public bool OperateBusInfo(string sql)
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

        public bool addBusInfo(Bus bus)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "insert into Bus_Table (BusName,OriginStation,O_FirstBusTime,O_LastBusTime,Terminus,T_FirstBusTime,T_LastBusTime,Up,Down,Note) values('" + bus.BusName + "','" + bus.OriginStation + "',' " + bus.O_FirstBusTime + "','" + bus.O_LastBusTime + "','" + bus.Terminus + "','" + bus.T_FirstBusTime + "','" + bus.T_LastBusTime + "','" + bus.Up + "','" + bus.Down + "','" + bus.Note + "')";
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

        //public Bus getBusInfo(string busname)
        //{
        //    SqlConnection sqlconnection = this.GetConnection();
        //    string sql = "select * from Bus_Table where BusName = '" + busname + "'";
        //    SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
        //    SqlDataAdapter sqldataadapter = new SqlDataAdapter();
        //    sqldataadapter.SelectCommand = sqlcommand;
        //    DataSet dataset = new DataSet();
        //    sqldataadapter.Fill(dataset, "Bus_Table");
        //    sqlconnection.Close();
        //    if (dataset.Tables[0].Rows.Count == 0)
        //    {
        //        return null;
        //    }
        //    else
        //    {
        //        Bus bus = new Bus();
        //        bus.BusName
        //        return bus;
        //    }
        //}
        public bool deleteBus(string busid)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "delete Bus_Table where BusId = '" + busid +"'";
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

        public bool updateBusInfo(Bus bus)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "update Bus_Table set BusName = '" + bus.BusName + "', OriginStation = '" + bus.OriginStation + "', O_FirstBusTime = '" + bus.O_FirstBusTime + "',O_LastBusTime = '" + bus.O_LastBusTime + "',Terminus = '" + bus.Terminus + "',T_FirstBusTime = '" + bus.T_FirstBusTime + "', T_LastBusTime = '" + bus.T_LastBusTime + "',Up = '" + bus.Up + "',Down = '" + bus.Down + "',Note = '" + bus.Note + "' where BusId = '" + bus.BusId + "'";
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


        public bool getBusInfo(string busname)
        {
            SqlConnection sqlconnection = this.GetConnection();
            string sql = "select * from Bus_Table where BusName = '" + busname + "'";
            SqlCommand sqlcommand = new SqlCommand(sql, sqlconnection);
            SqlDataAdapter sqldataadapter = new SqlDataAdapter();
            sqldataadapter.SelectCommand = sqlcommand;
            DataSet dataset = new DataSet();
            sqldataadapter.Fill(dataset, "Bus_Table");
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
                strSql.Append("order by T.BusName asc");
            }
            strSql.Append(")AS Row, T.*  from Bus_Table T ");
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
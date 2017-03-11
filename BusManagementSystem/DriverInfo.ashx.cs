using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text;
using 城市公交管理系统_ASP.EntityClass;
using 城市公交管理系统_ASP.DbClass;

namespace 城市公交管理系统_ASP
{
    /// <summary>
    /// DriverInfo 的摘要说明
    /// </summary>
    public class DriverInfo : IHttpHandler
    {
        private string Empty2Json(DataSet ds)
        {
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.Append("{\"total\":0,\"rows\":[{");
            DataTable dt = ds.Tables[0];
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                jsonBuilder.Append("\"");
                jsonBuilder.Append(dt.Columns[i].ColumnName);
                jsonBuilder.Append("\":\"");
                jsonBuilder.Append("");
                jsonBuilder.Append("\",");
            }
            jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
            jsonBuilder.Append("}]}");
            return jsonBuilder.ToString();
            //string json = "{\"total\":0,\"rows\":[{\"Row\":\"0\",\"BusName\":\"\",\"OriginStation\":\"\",\"O_FirstBusTime\":\"\",\"\":\"\",\"Terminus\":\"\",\"T_FirstBusTime\":\"\",\"T_LastBusTime\":\"\",\"Type\":\"\",\"Up\":\"\",\"Down\":\"\",\"Note\":\"\",\"BusId\":\"\",\"deletemark\":\"\"}]}";
            //return json;
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            int pageRows, page;
            pageRows = 10;
            page = 1;
            string order, sort, oderby; order = sort = oderby = "";
            string strWhere = "";
            string mode = context.Request["mode"].ToString();
            DriverEntity driver = new DriverEntity();
            if (mode == "1")
            {
                if (null != context.Request["page"])
                {
                    page = int.Parse(context.Request["page"].ToString());
                }
                if (null != context.Request["rows"])
                {
                    pageRows = int.Parse(context.Request["rows"].ToString());
                }
                if (null != context.Request["driverno"] && "" != context.Request["driverno"])
                {
                    string driverno = context.Request["driverno"].ToString();
                    strWhere = " DriverNo like '%" + driverno + "%'";
                }
                DataSet ds = DriverDao.getInstance().GetListByPage(strWhere.ToString(), oderby, (page - 1) * pageRows + 1, page * pageRows);
                int count = DriverDao.getInstance().GetRecordCount("Driver_Table");//获取条数  
                string strJson = ToJson.Dataset2Json(ds, count);//DataSet数据转化为Json数据  
                if (strJson != "" || strJson != string.Empty)
                {
                    context.Response.Write(strJson.Trim());//返回给前台页面  
                    context.Response.End();
                }
                else
                {
                    strJson = this.Empty2Json(DriverDao.getInstance().getDriverInfo());
                    context.Response.Write(strJson);//返回给前台页面  
                    context.Response.End();
                }
            }
            else if (mode == "2")
            {
                string flag = context.Request["flag"].ToString();
                driver.Name = context.Request["name"].ToString();
                driver.Vehicle = context.Request["busno"].ToString();
                driver.Wage = context.Request["wage"].ToString();
                driver.DriverNo = context.Request["driverno"].ToString();
                driver.BirthDate = context.Request["birthdate"].ToString();
                driver.BirthPlace = context.Request["birthplace"].ToString();
                driver.Age = context.Request["age"].ToString();
                string sql = "select * from Vehicle_Table where VehicleNo = '"+ driver.Vehicle.ToString().Trim() +"'";
                DataSet ds = VehicleDao.getInstance().VehicleInfo(sql);
                if (ds == null)
                {
                    context.Response.Write("false");//返回给前台页面  
                    context.Response.End();
                }
                else
                {
                    if (flag == "add")
                    {
                        sql = "insert into Driver_Table (Name,BirthDate,BirthPlace,Age,VehicleId,Wage,DriverNo,Vehicle) values('" + driver.Name + "','" + driver.BirthDate + "',' " + driver.BirthPlace + "','" + driver.Age + "',' " + ds.Tables[0].Rows[0]["VehicleId"].ToString() + "',' " + driver.Wage + "',' " + driver.DriverNo + "',' " +driver.Vehicle +"')";
                        if (DriverDao.getInstance().OperateDriverInfo(sql))
                        {
                            context.Response.Write("true");//返回给前台页面  
                            context.Response.End();
                        }
                        else
                        {
                            context.Response.Write("false");//返回给前台页面  
                            context.Response.End();
                        }
                    }
                    else if (flag == "edit")
                    {
                        driver.DriverId = context.Request["driverid"].ToString();
                        sql = "update Driver_Table set Name = '" + driver.Name + "', BirthDate = '" + driver.BirthDate + "', BirthPlace = '" + driver.BirthPlace + "',Age = '" + driver.Age + "',VehicleId = '" + ds.Tables[0].Rows[0]["VehicleId"].ToString() + "' ,Wage = '" + driver.Wage + "', DriverNo = '" +driver.DriverNo + "', Vehicle = '" + driver.Vehicle + "' where DriverId = '" + driver.DriverId + "'";
                        if (DriverDao.getInstance().OperateDriverInfo(sql))
                        {
                            context.Response.Write("true");//返回给前台页面  
                            context.Response.End();
                        }
                        else
                        {
                            context.Response.Write("false");//返回给前台页面  
                            context.Response.End();
                        }
                    }
                }
            }
            else if (mode == "3")
            {
                string driverid = context.Request["driverid"].ToString();
                string sql = "delete Driver_Table where DriverId = '" + driverid + "'";
                if (DriverDao.getInstance().OperateDriverInfo(sql))
                {
                    context.Response.Write("true");//返回给前台页面  
                    context.Response.End();
                }
                else
                {
                    context.Response.Write("false");//返回给前台页面  
                    context.Response.End();
                }
            }
            else if (mode == "4")
            {
                string vehicleno = context.Request["vehicleno"].ToString();
                string sql = "select * from Vehicle_Table where VehicleNo = '"+ vehicleno + "'";
                DataSet ds = VehicleDao.getInstance().VehicleInfo(sql);
                if (ds == null)
                {
                    context.Response.Write("false");//返回给前台页面  
                    context.Response.End();
                }
                else
                {
                    context.Response.Write("true");//返回给前台页面  
                    context.Response.End();
                }
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public void Query(HttpContext context)
        {
            DataSet dataset = VehicleDao.getInstance().getVehicleInfo();
            int count = VehicleDao.getInstance().GetRecordCount("Vehicle_Table");
            string strJson = ToJson.Dataset2Json(dataset, count);//DataSet数据转化为Json数据  
            context.Response.Write(strJson);//返回给前台页面  
            context.Response.End();
        }
    }
}
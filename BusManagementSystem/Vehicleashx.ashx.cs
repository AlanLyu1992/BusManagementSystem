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
    /// Vehicleashx 的摘要说明
    /// </summary>
    public class Vehicleashx : IHttpHandler
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
            this.Query(context);
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
            context.Response.ContentType = "text/plain";
            int pageRows, page;
            pageRows = 10;
            page = 1;
            string order, sort, oderby; order = sort = oderby = "";
            string strWhere = "";
            string mode = context.Request["mode"].ToString();
            if (mode == "1")
            {
                if (null != context.Request["page"] && "" != context.Request["page"])
                {
                    page = int.Parse(context.Request["page"].ToString());
                }
                if (null != context.Request["rows"]&& ""!=context.Request["rows"])
                {
                    pageRows = int.Parse(context.Request["rows"].ToString());
                }
                if (null != context.Request["vehicleno"] && "" != context.Request["vehicleno"])
                {
                    string vehicleno = context.Request["vehicleno"].ToString();
                    strWhere = " VehicleNo like '%"+ vehicleno +"%'";
                }
                DataSet ds = VehicleDao.getInstance().GetListByPage(strWhere.ToString(), oderby, (page - 1) * pageRows + 1, page * pageRows);
                int count = VehicleDao.getInstance().GetRecordCount("Vehicle_Table");
                string strJson = ToJson.Dataset2Json(ds, count);//DataSet数据转化为Json数据  
                if (strJson != "" || strJson != string.Empty)
                {
                    context.Response.Write(strJson.Trim());//返回给前台页面  
                    context.Response.End();
                }
                else
                {
                    strJson = this.Empty2Json(VehicleDao.getInstance().getVehicleInfo());
                    context.Response.Write(strJson);//返回给前台页面  
                    context.Response.End();
                }
            }
            else if (mode == "2")
            {
                string flag = context.Request["flag"].ToString();
                Vehicle vehicle = new Vehicle();
                vehicle.VehicleNo = context.Request["vehicleno"].ToString();
                vehicle.Producer = context.Request["producer"].ToString();
                vehicle.DeliveryTime = context.Request["deliverytime"].ToString();
                vehicle.Bus = context.Request["busname"].ToString();
                string sql = "select * from Bus_Table where BusName = '" + vehicle.Bus + "'";
                DataSet ds = BusDao.getInstance().BusInfo(sql);
                if (ds == null)
                {
                    context.Response.Write("false");//返回给前台页面  
                    context.Response.End();
                }
                else
                {
                    vehicle.BusId = ds.Tables[0].Rows[0]["BusId"].ToString();
                    if (flag == "add")
                    {
                        sql = "insert into Vehicle_Table (VehicleNo,BusId,Producer,DeliveryTime,Bus) values('" + vehicle.VehicleNo + "','" + vehicle.BusId + "',' " + vehicle.Producer + "','" + vehicle.DeliveryTime + "',' " + vehicle.Bus + "')";
                        if (VehicleDao.getInstance().OperateVehicleInfo(sql))
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
                        vehicle.VehicleId = context.Request["vehicleid"].ToString();
                        sql = "update Vehicle_Table set VehicleNo = '" + vehicle.VehicleNo + "', BusId = '" + vehicle.BusId + "', Producer = '" + vehicle.Producer + "',DeliveryTime = '" + vehicle.DeliveryTime + "',Bus = '" + vehicle.Bus + "' where VehicleId = '"+ vehicle.VehicleId+"'";
                        if (VehicleDao.getInstance().OperateVehicleInfo(sql))
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
                string vehicleid = context.Request["vehicleid"].ToString();
                string sql = "delete Vehicle_Table where VehicleId = '" + vehicleid + "'";
                if (VehicleDao.getInstance().OperateVehicleInfo(sql))
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
}
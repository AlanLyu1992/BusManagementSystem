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
    /// BusInfo 的摘要说明
    /// </summary>
    public class BusInfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            Query(context);
        }

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

        public void Query(HttpContext context)
        {
            context.Response.ContentType = "text/plain";  
            int pageRows, page;
            pageRows = 10;
            page = 1;
            string order, sort, oderby; order = sort = oderby = "";
            string strWhere = "";
            string mode = context.Request["mode"].ToString();
            if (mode == "1") //显示数据
            {
                if (null != context.Request["page"])
                {
                    page = int.Parse(context.Request["page"].ToString());
                }
                if (null != context.Request["rows"])
                {
                    pageRows = int.Parse(context.Request["rows"].ToString());
                }
                if (null != context.Request["busname"] &&""!= context.Request["busname"])
                {
                    string busname = context.Request["busname"].ToString();
                    strWhere = " BusName = '" + busname + "' or BusName like '" + busname + "/%' or BusName = 'K" + busname + "'";
                }
                DataSet ds = BusDao.getInstance().GetListByPage(strWhere.ToString(), oderby, (page - 1) * pageRows + 1, page * pageRows);
                int count = BusDao.getInstance().GetRecordCount("Bus_Table");//获取条数  
                string strJson = ToJson.Dataset2Json(ds, count);//DataSet数据转化为Json数据  
                if (strJson != "" || strJson != string.Empty)
                {
                    context.Response.Write(strJson.Trim());//返回给前台页面  
                    context.Response.End();
                }
                else
                {
                    strJson = this.Empty2Json(BusDao.getInstance().getBusInfo());
                    context.Response.Write(strJson);//返回给前台页面  
                    context.Response.End();
                }
            }
            else if (mode == "2")
            {
                string flag = context.Request["flag"].ToString();
                Bus bus = new Bus();
                bus.BusName = context.Request["busname"].ToString();
                bus.OriginStation = context.Request["originstation"].ToString();
                bus.O_FirstBusTime = context.Request["o_firstbustime"].ToString();
                bus.O_LastBusTime = context.Request["o_lastbustime"].ToString();
                bus.Terminus = context.Request["terminus"].ToString();
                bus.T_FirstBusTime = context.Request["t_firstbustime"].ToString();
                bus.T_LastBusTime = context.Request["t_lastbustime"].ToString();
                bus.Up = context.Request["up"].ToString();
                bus.Down = context.Request["down"].ToString();
                bus.Note = context.Request["note"].ToString();
                if (flag == "add")
                {
                    if (BusDao.getInstance().addBusInfo(bus))
                    {
                        string[] upstr = bus.Up.Split('-');
                        string[] downstr = bus.Down.Split('-');
                        string[] stationstr = upstr.Concat(downstr).Distinct().ToArray(); //去重
                        foreach (string s in stationstr)
                        {
                            if (!StationDao.getInstance().updateStationInfo(bus.BusName, s))    //在站名经过的车次后追加
                            {
                                context.Response.Write("false");//返回给前台页面  
                                context.Response.End();
                                break;
                            }
                        }
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
                    bus.BusId = context.Request["busid"].ToString();
                    string sql = "select * from Bus_Table where BusId = '"+ bus.BusId+"'";
                    DataSet ds = BusDao.getInstance().BusInfo(sql);
                    string[] oldupstr = ds.Tables[0].Rows[0]["Up"].ToString().Split('-');
                    string[] olddownstr = ds.Tables[0].Rows[0]["Down"].ToString().Split('-');
                    string[] oldstationstr = oldupstr.Concat(olddownstr).Distinct().ToArray();
                    List<string> deletestationstr = new List<string>();
                    if (BusDao.getInstance().updateBusInfo(bus))
                    {
                        string[] upstr = bus.Up.Split('-');
                        string[] downstr = bus.Down.Split('-');
                        string[] stationstr = upstr.Concat(downstr).Distinct().ToArray(); //去重
                        
                        foreach(string s in oldstationstr)
                        {
                            if (stationstr.Contains(s))             
                            {
                                continue;
                            }
                            else
                            {
                                deletestationstr.Add(s);                //如果原来的车站现在没有了，加入list
                            }
                        }
                        string[] d = deletestationstr.ToArray(); //将需要删除的list转换成string[]
                        foreach (string s in d)
                        {

                            StationDao.getInstance().OperateStationInfo("update Station_Table set Bus = replace(Bus,'" + s + "','') where Station_Name = '" + s + "'");
                        }
                        foreach (string s in stationstr)
                        {
                            if (StationDao.getInstance().checkStationInfo(s, bus.BusName)) //查找各个站点是不是包含该车
                            {
                                continue;
                            }
                            else
                            {
                                StationDao.getInstance().updateStationInfo(bus.BusName, s); //新更新的站名需要增加
                            }
                        }
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
            else if (mode == "3")
            {
                string busname = context.Request["busname"].ToString();
                if (BusDao.getInstance().getBusInfo(busname))
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
                string route = context.Request["route"].ToString();
                string[] routestr = route.Split('-');
                foreach(string s in routestr)
                {
                    if (!StationDao.getInstance().checkStationInfo(s))
                    {
                        context.Response.Write(s);//返回给前台页面  
                        context.Response.End();
                    }
                }
                context.Response.Write("true");//返回给前台页面  
                context.Response.End();
            }
            else if (mode == "5")
            {
                string busname = context.Request["busname"].ToString();
                string busid = context.Request["busid"].ToString();
                string []upstr = context.Request["upstr"].ToString().Split('-'); 
                string[] downstr = context.Request["downstr"].ToString().Split('-');
                string[] stationstr = upstr.Concat(downstr).Distinct().ToArray(); //去重            
                for (int i = 0; i < stationstr.Length; i++)
                {
                    if (StationDao.getInstance().OperateStationInfo("update Station_Table set Bus = replace(Bus,'"+ busname +"','') where Station_Name = '" + stationstr[i] + "'"))//将每站的经过车次删除
                    {
                        continue;
                    }
                    else
                    {
                        if (StationDao.getInstance().OperateStationInfo("update Station_Table set Bus = replace(Bus,'"+ busname +"','') where Station_Name = '" + stationstr[i] + "'"))//如果是第一站，逗号可能在后面
                        {
                            continue;
                        }
                        context.Response.Write("false");
                        context.Response.End();
                    }
                }
                    if (BusDao.getInstance().deleteBus(busid))
                    {
                        context.Response.Write("true");
                        context.Response.End();
                    }
                    else
                    {
                        context.Response.Write("false");
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
    }
}
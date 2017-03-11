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
    /// StationInfo 的摘要说明
    /// </summary>
    public class StationInfo : IHttpHandler
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
            Station station = new Station();
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
                if (null != context.Request["stationname"] && "" != context.Request["stationname"])
                {
                    string stationname = context.Request["stationname"].ToString();
                    strWhere = " Station_Name = '" + stationname + "' or Station_Name like '% " + stationname + " %'";
                }
                DataSet ds = StationDao.getInstance().GetListByPage(strWhere.ToString(), oderby, (page - 1) * pageRows + 1, page * pageRows);
                int count = BusDao.getInstance().GetRecordCount("Station_Table");//获取条数  
                string strJson = ToJson.Dataset2Json(ds, count);//DataSet数据转化为Json数据  
                if (strJson != "" || strJson != string.Empty)
                {
                    context.Response.Write(strJson);//返回给前台页面  
                    context.Response.End();
                }
                else
                {
                    strJson = this.Empty2Json(StationDao.getInstance().getStationInfo());
                    context.Response.Write(strJson);//返回给前台页面  
                    context.Response.End();
                }
            }
            else if (mode == "2")
            {
                string flag = context.Request["flag"].ToString();
                station.Station_Name = context.Request["stationname"].ToString();
                if (flag == "add")
                {
                    if (StationDao.getInstance().addStation(station))
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
                    station.Station_Id = context.Request["stationid"].ToString();
                        if (StationDao.getInstance().updateStationInfo(station))
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
            else if (mode == "3")
            {
                station.Station_Name = context.Request["station"].ToString();
                if (StationDao.getInstance().checkStationInfo(station.Station_Name))
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
                station.Station_Id = context.Request["stationid"].ToString();
                station.Station_Name = context.Request["stationname"].ToString();
                DataSet ds = BusDao.getInstance().BusInfo("select * from Bus_Table where Up like '%" + station.Station_Name + "%' or Down like '%" + station.Station_Name + "%'");
                string busname;
                if (ds!=null)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)//把所有经过该车站的车找出来，修改他们的路线
                    {
                        busname = ds.Tables[0].Rows[i]["BusName"].ToString();
                        if (BusDao.getInstance().OperateBusInfo("update Bus_Table set Up = replace(Up,'-" + station.Station_Name + "','') where BusName = '" + busname + "'"))
                        {//先修改上行路线，讨论不是起点站的情况
                            if (BusDao.getInstance().OperateBusInfo("update Bus_Table set Down = replace(Down,'-" + station.Station_Name + "','') where BusName = '" + busname + "'"))
                            {//下行路线，不是起点站
                                continue;
                            }
                            else if (BusDao.getInstance().OperateBusInfo("update Bus_Table set Down = replace(Down,'" + station.Station_Name + "-','') where BusName = '" + busname + "'"))
                            {//上行不是，下行是
                                continue;
                            }
                            else
                            {//上行不是，下行没有此站
                                continue;
                            }

                        }
                        else if (BusDao.getInstance().OperateBusInfo("update Bus_Table set Up = replace(Up,'" + station.Station_Name + "-','') where BusName = '" + busname + "'"))
                        {//上行是起点站
                            if (BusDao.getInstance().OperateBusInfo("update Bus_Table set Down = replace(Down,'-" + station.Station_Name + "','') where BusName = '" + busname + "'"))
                            {//上行是，下行不是
                                continue;
                            }
                            else if (BusDao.getInstance().OperateBusInfo("update Bus_Table set Down = replace(Down,'" + station.Station_Name + "-','') where BusName = '" + busname + "'"))
                            {//上行是，下行也是（不太可能出现）
                                continue;
                            }
                            else
                            {//上行是，下行没有此站
                                continue;
                            }
                        }
                        else
                        {//上行路线没有此站
                            if (BusDao.getInstance().OperateBusInfo("update Bus_Table set Down = replace(Down,'-" + station.Station_Name + "','') where BusName = '" + busname + "'"))
                            {//上行没，下行非起点站
                                continue;
                            }
                            else if (BusDao.getInstance().OperateBusInfo("update Bus_Table set Down = replace(Down,'" + station.Station_Name + "-','') where BusName = '" + busname + "'"))
                            {//上行没。下行起点站
                                continue;
                            }
                            else
                            {//上行没，下行没，出现异常情况
                                context.Response.Write("false");//返回给前台页面  
                                context.Response.End();
                            }
                        }
                    }
                }
                if (StationDao.getInstance().OperateStationInfo("delete Station_Table where Station_Id = '" + station.Station_Id + "'"))
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

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
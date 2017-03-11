using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using 城市公交管理系统_ASP.EntityClass;
using 城市公交管理系统_ASP.DbClass;
using System.Data;

namespace 城市公交管理系统_ASP
{
    /// <summary>
    /// RouteInfo 的摘要说明
    /// </summary>
    
    public class RouteInfo : IHttpHandler
    {
        public void BubbleSort<T>(T[] array) where T:IComparable
        {
            int length = array.Length;

            for (int i = 0; i <= length - 2; i++)
            {
                for (int j = length - 1; j >= 1; j--)
                {

                    // 对两个元素进行交换
                    if (array[j].CompareTo(array[j - 1]) < 0)
                    {
                        T temp = array[j];
                        array[j] = array[j - 1];
                        array[j - 1] = temp;
                    }
                }
            }
        }

        public void ProcessRequest(HttpContext context)
        {
            Query(context);
        }

        public string getRouteSteps(DataRow dr, string originstation, string terminus)//两辆车之间有多少站
        {
            string[] upstr = dr["Up"].ToString().Split('-');
            string[] downstr = dr["Down"].ToString().Split('-');
            int count;
            if (upstr.ToList().IndexOf(originstation) >= 0 && upstr.ToList().IndexOf(terminus) >= 0)//如果上行路线两站都有
            {
                count = upstr.ToList().IndexOf(terminus) - upstr.ToList().IndexOf(originstation);
                if (count > 0)
                {
                    return count.ToString();
                }
       
            }
            if (downstr.ToList().IndexOf(originstation) >= 0 && downstr.ToList().IndexOf(terminus) >= 0)
            {
                count = downstr.ToList().IndexOf(terminus) - downstr.ToList().IndexOf(originstation);
                if (count > 0)
                {
                    return count.ToString();
                }
            }
            return null;
        }

        public List<string> getOptimalRoute(DataSet ds,string originstation,string terminus) //返回最优路线在数据集中的
        {
            string []upstr;
            string []downstr;
            List<string> routeinfo = new List<string>();
            int count;
            int min = 100;                                  //最小站数
            int position = 0;
            for(int i= 0; i < ds.Tables[0].Rows.Count; i++)
            {
                count = Convert.ToInt32(getRouteSteps(ds.Tables[0].Rows[i], originstation, terminus));
                if (count < min)
                {
                    min = count;
                    position = i;
                }
                
            }
            routeinfo.Add(ds.Tables[0].Rows[position]["BusName"].ToString());
            routeinfo.Add(min.ToString());
            return routeinfo;
        }

        public void Query(HttpContext context)
        {
            string originstation = context.Request["originstation"].ToString();
            string terminus = context.Request["terminus"].ToString();
            
            //先讨论不换乘
            DataSet ds = BusDao.getInstance().getRoute(originstation, terminus);
            DataRow dr;
            List<string> routeinfo = new List<string>();
            if (ds!= null)
            {         
                routeinfo = getOptimalRoute(ds, originstation, terminus);
                string json = routeinfo[0] + "," + routeinfo[1];
                context.Response.Write(json);
                context.Response.End();    
            }
            else //讨论换乘的情况
            {
                ds = BusDao.getInstance().getBusInfoByOriginStation(originstation);
                DataSet ds1;
                DataSet ds2;
                //List<string> routeinfo2 = new List<string>();
                List<Route> routelist = new List<Route>();
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++) //获取经过起点站的所有车次
                {
                    string[] upstr = ds.Tables[0].Rows[i]["Up"].ToString().Split('-');
                    string[] downstr = ds.Tables[0].Rows[i]["Down"].ToString().Split('-');
                    string[] stationstr = upstr.Concat(downstr).Distinct().ToArray(); //获取每辆车次经过的所有站
                    for (int j = 0; j < stationstr.Length; j++)
                    {
                        ds1 = BusDao.getInstance().getBusInfoByOriginStation(stationstr[j]); //获取每个站的所有车
                        for (int k = 0; k < ds1.Tables[0].Rows.Count; k++)
                        {
                            ds2 = BusDao.getInstance().getBusInfo(ds1.Tables[0].Rows[k]["BusName"].ToString(), terminus);
                            if (ds2 != null)
                            {
                                //routeinfo2.Add(ds.Tables[0].Rows[i]["BusName"].ToString());//第一辆车
                                //routeinfo2.Add(getRouteSteps(ds.Tables[0].Rows[i], originstation, stationstr[j]));//第一辆车坐几站
                                //routeinfo2.Add(stationstr[j]);//中转站
                                //routeinfo2.Add(getRouteSteps(ds2.Tables[0].Rows[0], stationstr[j], terminus));//第二辆车坐几站
                                if (Convert.ToInt32(getRouteSteps(ds2.Tables[0].Rows[0], stationstr[j], terminus)) == 0)
                                {
                                    continue;
                                }
                                routelist.Add(new Route(ds.Tables[0].Rows[i]["BusName"].ToString(), Convert.ToInt32(getRouteSteps(ds.Tables[0].Rows[i], originstation, stationstr[j])), stationstr[j],ds1.Tables[0].Rows[k]["BusName"].ToString(), Convert.ToInt32(getRouteSteps(ds2.Tables[0].Rows[0], stationstr[j], terminus))));
                            }
                        }
                    }
                }
                if (routelist.Count > 0)
                {
                    this.BubbleSort<Route>(routelist.ToArray());
                    routeinfo.Add(routelist[0].FirstBus);
                    routeinfo.Add((routelist[0].FirstRouteStep).ToString());
                    routeinfo.Add(routelist[0].MiddleStation);
                    routeinfo.Add(routelist[0].SecoundBus);
                    routeinfo.Add(routelist[0].SecoundRouteStep.ToString());
                    routeinfo.Add(routelist[0].OverallRouteStep.ToString());
                    string json = routeinfo[0] + "," + routeinfo[1] + "," + routeinfo[2] + "," + routeinfo[3] + "," + routeinfo[4] + "," + routeinfo[5];
                    context.Response.Write(json);
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
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
    /// MetoInfo 的摘要说明
    /// </summary>
    public class MetoInfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            Query(context);
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
                if (null != context.Request["rows"] && "" != context.Request["rows"])
                {
                    pageRows = int.Parse(context.Request["rows"].ToString());
                }
                DataSet dataset = MetoDao.getInstance().getMetoInfo();
                int count = MetoDao.getInstance().GetRecordCount("Meto_Table");
                string strJson = ToJson.Dataset2Json(dataset, count);//DataSet数据转化为Json数据  
                context.Response.Write(strJson);//返回给前台页面  
                context.Response.End();
            }
            else if (mode == "2")
            {
                Meto meto = new Meto();
                string flag = context.Request["flag"].ToString();
                meto.MetoName = context.Request["metoname"].ToString();
                meto.MetoText = context.Request["metotext"].ToString();
                meto.SetTime = context.Request["settime"].ToString();
                meto.FinishTime = context.Request["finishtime"].ToString();
                string sql;
                if (flag == "add")
                {
                    sql = "insert into Meto_Table (MetoName,MetoText,Settime,FinishTime) values('" + meto.MetoName + "','" + meto.MetoText + "',' " + meto.SetTime + "','" + meto.FinishTime + "')";
                    if (MetoDao.getInstance().OperateMetoInfo(sql))
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
                    sql = "update Meto_Table set MetoText = '" + meto.MetoText + "', SetTime = '" + meto.SetTime + "',FinishTime = '" + meto.FinishTime + "' where MetoName = '" + meto.MetoName + "'";
                    if (MetoDao.getInstance().OperateMetoInfo(sql))
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
                string metoname = context.Request["metoname"].ToString();
                string sql = "delete Meto_Table where MetoName = '" + metoname + "'";
                if(MetoDao.getInstance().OperateMetoInfo(sql))
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
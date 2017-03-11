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
    /// Driver 的摘要说明
    /// </summary>
    public class Driver : IHttpHandler
    {
        
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
            DataSet dataset = DriverDao.getInstance().getDriverInfo();
            int count = DriverDao.getInstance().GetRecordCount("Driver_Table");
            string strJson = ToJson.Dataset2Json(dataset, count);//DataSet数据转化为Json数据  
            context.Response.Write(strJson);//返回给前台页面  
            context.Response.End();  
        }

    }
}
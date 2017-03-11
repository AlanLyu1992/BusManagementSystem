using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace 城市公交管理系统_ASP
{
    public partial class DriverManage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        protected void savebutton_Click(object sender, EventArgs e)
        {
            Response.Redirect("Admin.aspx");
        }
    }
}
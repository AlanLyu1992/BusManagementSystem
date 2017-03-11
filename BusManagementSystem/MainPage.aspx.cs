using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using 城市公交管理系统_ASP.EntityClass;
using 城市公交管理系统_ASP.DbClass;

namespace 城市公交管理系统_ASP
{
    public partial class MainPage : System.Web.UI.Page
    {
        static int logincount = 0;
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnLogin_Click(object sender, ImageClickEventArgs e)
        {
            if (txtUsername.Text =="")
            {
                Response.Write("<script language=javascript>alert('用户名不能为空！');</" + "script>");  
                txtUsername.Focus();
                return;
            }
            if (txtPassword.Text == "")
            {
                Response.Write("<script language=javascript>alert('密码不能为空！');</" + "script>");  
                txtPassword.Focus();
                return;
            }
            User user = new User();
            user.User_Name = txtUsername.Text;
            user.User_Password = txtPassword.Text;
            if (UserDao.getInstance().login(user))
            {
                Response.Write("<script>window.open('Admin.aspx')</script>");
            }
            else
            {
                logincount++;
                ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script>LoginError();</script>");
                //Response.Write("<script type='text/javascript'>alert("XXX");</script>");
                if (logincount == 5 )
                {
                   // MessageBox.Show("登录次数过多！", "提示");
                    //this.Close();
                }
            }
        }

        protected void btnBus_Click(object sender, EventArgs e)
        {
            Response.Redirect("UserBusPage.aspx");
        }

        protected void btnStation_Click(object sender, EventArgs e)
        {
            Response.Redirect("UserStationPage.aspx");
        }

        protected void btnRoute_Click(object sender, EventArgs e)
        {
            Response.Redirect("UserRoutePage.aspx");
        }
    }
}
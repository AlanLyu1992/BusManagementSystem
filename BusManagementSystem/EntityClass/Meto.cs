using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 城市公交管理系统_ASP.EntityClass
{
    public class Meto
    {
        private string metoname;
        public string MetoName
        {
            get { return metoname; }
            set { metoname = value; }
        }

        private string metotext;
        public string MetoText
        {
            get { return metotext; }
            set { metotext = value; }
        }

        private string settime;
        public string SetTime
        {
            get { return settime; }
            set { settime = value; }
        }

        private string finishtime;
        public string FinishTime
        {
            get { return finishtime; }
            set { finishtime = value; }
        }
    }
}
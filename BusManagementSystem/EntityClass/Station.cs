using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 城市公交管理系统_ASP.EntityClass
{
    public class Station
    {
        private string station_name;
        public String Station_Name
        {
            get { return station_name; }
            set { station_name = value; }
        }

        private string buses;
        public string Buses
        {
            get { return buses;  }
            set { buses = value; }
        }

        private string station_id;
        public string Station_Id
        {
            get { return station_id; }
            set { station_id = value; }
        }
    }
}
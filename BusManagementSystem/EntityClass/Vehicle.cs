using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;

namespace 城市公交管理系统_ASP.EntityClass
{
    public class Vehicle
    {
        private string vehicleid;
        public string VehicleId
        {
            get { return vehicleid; }
            set { vehicleid = value; }
        }

        private string bus;
        public string Bus
        {
            get { return bus; }
            set { bus = value; }
        }

        private string vehicleno;
        public string VehicleNo
        {
            get { return vehicleno; }
            set { vehicleno = value; }
        }

        private string busid;
        public string BusId
        {
            get { return busid; }
            set { busid = value; }
        }

        private string producer;
        public string Producer
        {
            get { return producer; }
            set { producer = value; }
        }

        private string deliverytime;
        public string DeliveryTime
        {
            get { return deliverytime; }
            set { deliverytime = value; }
        }
    }
}
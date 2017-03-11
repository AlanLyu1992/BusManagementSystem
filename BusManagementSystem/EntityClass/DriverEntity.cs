using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 城市公交管理系统_ASP.EntityClass
{
    public class DriverEntity
    {
        private string name;
        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        private string driverno;
        public string DriverNo
        {
            get { return driverno; }
            set { driverno = value; }
        }

        private string vehicle;
        public string Vehicle
        {
            get { return vehicle; }
            set { vehicle = value; }
        }

        private string birthdate;
        public string BirthDate
        {
            get { return birthdate; }
            set { birthdate = value; }
        }

        private string birthplace;
        public string BirthPlace
        {
            get { return birthplace; }
            set { birthplace = value; }
        }

        private string age;
        public string Age
        {
            get { return age; }
            set { age = value; }
        }

        private string wage;
        public string Wage
        {
            get { return wage; }
            set { wage = value; }
        }

        private string vehicleid;
        public string VehicleId
        {
            get { return vehicleid; }
            set { vehicleid = value; }
        }

        private string driverid;
        public string DriverId
        {
            get { return driverid; }
            set { driverid = value; }
        }
    }
}
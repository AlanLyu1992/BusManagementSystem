using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 城市公交管理系统_ASP.EntityClass
{
    public class Route :IComparable
    {
        public Route(string firstbus,int firstroutestep,string middlestation,string secoundbus,int secoundroutestep)
        {
            this.firstbus = firstbus;
            this.firstroutestep = firstroutestep;
            this.middlestation = middlestation;
            this.secoundbus = secoundbus;
            this.secoundroutestep = secoundroutestep;
            this.overallroutestep = this.firstroutestep + this.secoundroutestep;
        }

        private string firstbus;
        public string FirstBus
        {
            get { return firstbus; }
            set { firstbus = value; }
        }

        private int firstroutestep;
        public int FirstRouteStep
        {
            get { return firstroutestep; }
            set { firstroutestep = value; }
        }

        private string middlestation;
        public string MiddleStation
        {
            get { return middlestation; }
            set { middlestation = value; }
        }

        private string secoundbus;
        public string SecoundBus
        {
            get { return secoundbus; }
            set { secoundbus = value; }
        }

        private int secoundroutestep;
        public int SecoundRouteStep
        {
            get { return secoundroutestep; }
            set { secoundroutestep = value; }
        }

        private int overallroutestep;
        public int OverallRouteStep
        {
            get { return overallroutestep; }
            set { overallroutestep = value; }
        }

        public int CompareTo(object obj)
        {
            Route route2 = (Route)obj;
            return this.overallroutestep.CompareTo(route2.overallroutestep);
        }
    }
}
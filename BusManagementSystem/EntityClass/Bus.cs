using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 城市公交管理系统_ASP.EntityClass
{
    public class Bus
    {
        private string busname;     
        public string BusName
        {
            get { return busname; }
            set { busname = value; }
        }

        private string originstation;
        public string OriginStation
        {
            get { return originstation; }
            set { originstation = value; }
        }

        private string o_firstbustime;
        public string O_FirstBusTime
        {
            get { return o_firstbustime; }
            set { o_firstbustime = value; }
        }

        private string o_lastbustime;
        public string O_LastBusTime
        {
            get { return o_lastbustime; }
            set { o_lastbustime = value; }
        }

        private string terminus;
        public string Terminus
        {
            get { return terminus; }
            set { terminus = value; }
        }

        private string t_firstbustime;
        public string T_FirstBusTime
        {
            get { return t_firstbustime; }
            set { t_firstbustime = value; }
        }

        private string t_lastbustime;
        public string T_LastBusTime
        {
            get { return t_lastbustime; }
            set { t_lastbustime = value; }
        }

        private string up;
        public string Up
        {
            get { return up; }
            set { up = value; }
        }

        private string down;
        public string Down
        {
            get { return down; }
            set { down = value; }
        }

        private string note;
        public string Note
        {
            get { return note; }
            set { note = value; }
        }

        private string busid;
        public string BusId
        {
            get { return busid; }
            set { busid = value; }
        }
    }
    }

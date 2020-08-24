using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model
{
    public class HEREMapsResponse
    {
        public Item[] items { get; set; }
    }

    public class Item
    {
        public string title { get; set; }
        public string id { get; set; }
        public string resultType { get; set; }
        public string houseNumberType { get; set; }
        public Address address { get; set; }
        public Position position { get; set; }
        public Access[] access { get; set; }
        public Mapview mapView { get; set; }
        public Scoring scoring { get; set; }
    }

    public class Address
    {
        public string label { get; set; }
        public string countryCode { get; set; }
        public string countryName { get; set; }
        public string state { get; set; }
        public string county { get; set; }
        public string city { get; set; }
        public string district { get; set; }
        public string street { get; set; }
        public string postalCode { get; set; }
        public string houseNumber { get; set; }
    }

    public class Position
    {
        public float lat { get; set; }
        public float lng { get; set; }
    }

    public class Mapview
    {
        public float west { get; set; }
        public float south { get; set; }
        public float east { get; set; }
        public float north { get; set; }
    }

    public class Scoring
    {
        public float queryScore { get; set; }
        public Fieldscore fieldScore { get; set; }
    }

    public class Fieldscore
    {
        public int country { get; set; }
        public int city { get; set; }
        public int[] streets { get; set; }
        public int houseNumber { get; set; }
        public float postalCode { get; set; }
    }

    public class Access
    {
        public float lat { get; set; }
        public float lng { get; set; }
    }

}

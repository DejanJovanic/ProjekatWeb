﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class DateValidation : ValidationAttribute
    {
        public DateValidation()
        {
        }

        public override bool IsValid(object value)
        {
            var dt = (DateTime)value;
            if (dt.Date >= DateTime.Now.Date)
            {
                return true;
            }
            return false;
        }
    }
}

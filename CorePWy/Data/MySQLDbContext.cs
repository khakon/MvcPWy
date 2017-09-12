using CorePWy.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CorePWy.Data
{
    public class MySQLDbContext : DbContext
    {

        public DbSet<UserModel> UserModels { get; set; }
    }
}

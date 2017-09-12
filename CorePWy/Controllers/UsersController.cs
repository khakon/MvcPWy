using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CorePWy.Models;
using CorePWy.Data;

namespace CorePWy.Controllers
{
    public class UsersController : Controller
    {
        ApplicationDbContext _db;
        //MySQLDbContext _db = new MySQLDbContext();
        public UsersController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult GetAll()
        {
            return View(_db.UserModels.ToList());
        }

        public IActionResult Get(int id)
        {
            return View(_db.UserModels.FirstOrDefault(s=>s.UserId == id));
        }

        [HttpPost]
        public IActionResult AddUpdate(UserModel model)
        {
            try
            {
                if (_db.UserModels.Any(s => s.UserId == model.UserId)) _db.Update(model);
                else _db.Add(model);
                _db.SaveChanges();
                return Ok(new { message = "Successfully added the user", success = true });
            }
            catch (Exception ex)
            {
                return Ok(new { message = ex.Message, success = false });
            }

        }

        public IActionResult Delete(int id)
        {
            try
            {
                 var item = _db.UserModels.FirstOrDefault(s => s.UserId == id);
                _db.Remove(item);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
            }
            return RedirectToAction("GetAll");
        }
    }
}
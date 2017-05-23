using BilleCar.BOL;
using BilleCar.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BLL
{
    public class UserBs
    {
        private UserDb objDb;
        public List<string> Errors = new List<string>();

        public UserBs()
        {
            objDb = new UserDb();
        }
        public ICollection<User> GetAll()
        {
            
            return objDb.GetAll().ToList();
        }

        public bool Insert(User user)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                string hash = GetMd5Hash(md5Hash, user.Pass);
                user.Pass = hash;
            }


            if (IsValidOnInsert(user))
            {
                objDb.Insert(user);
                return true;
            }
            else
                return false;

        }
        static bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
        {
            // Hash the input.
            string hashOfInput = GetMd5Hash(md5Hash, input);

            // Create a StringComparer an compare the hashes.
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            if (0 == comparer.Compare(hashOfInput, hash))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        static string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
        public void Delete(string email)
        {
            objDb.Delete(email);
        }
        public bool Update(User user)
        {
            //using (MD5 md5Hash = MD5.Create())
            //{
            //    string hash = GetMd5Hash(md5Hash, user.Pass);
            //    user.Pass = hash;
            //}
            if (IsValidOnUpdate(user))
            {
                objDb.Update(user);
                return true;
            }
            else
                return false;

        }
        public bool UpdatePassword(User user)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                string hash = GetMd5Hash(md5Hash, user.Pass);
                user.Pass = hash;
            }
            if (IsValidOnUpdate(user))
            {
                objDb.Update(user);
                return true;
            }
            else
                return false;
        }
        public User GetByEmailString(string email)
        {
            return objDb.GetByEmail(email);


        }
        public bool GetByEmail(ref User usr)
        {
            var user = objDb.GetByEmail(usr.Email);
            if (user == null)
            {
                Errors.Add("Email nie istnieje");
            }
            else
            {
                using (MD5 md5Hash = MD5.Create())
                {
                    string hash = user.Pass;
                    // string hash = GetMd5Hash(md5Hash, user.Pass);
                    if (!VerifyMd5Hash(md5Hash, usr.Pass, hash))
                    {
                        Errors.Add("Błędne hasło");
                    }
                }
                if (Errors.Count() == 0)
                {
                    usr = user;
                    return true;
                }
                else
                    return false;
            }
            return false;
        }
      
        public bool IsValidOnInsert(User usr)
        {
            UserBs userObjBs = new UserBs();


            int count;
            //Unique Email Validation
            string EmailValue = usr.Email.ToString();
            count = userObjBs.GetAll().Where(x => x.Email == EmailValue).ToList().Count();
            if (count != 0)
            {
                Errors.Add("Konto o takim adresie e-mail istnieje już w systemie");
            }

            if (Errors.Count() == 0)
                return true;
            else
                return false;
        }
        public bool IsValidOnUpdate(User user)
        {
            return true;
        }
    }
}

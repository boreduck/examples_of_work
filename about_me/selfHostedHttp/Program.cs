using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace selfHostedHttp
{
	class Program
	{
		static void Main(string[] args)
		{
            HttpListener server = new HttpListener();
            server.Prefixes.Add("http://localhost:8080/");
            server.Start();
            Console.WriteLine("Сервер начал прослушивание порта 8080");
            while (true)
            {
                HttpListenerContext context = server.GetContext();
                HttpListenerRequest request = context.Request;
                HttpListenerResponse response = context.Response;

                response.Headers.Add("Access-Control-Allow-Origin", "*");
                response.Headers.Add("Access-Control-Allow-Methods", "POST, GET");
                var req = request.Url.ToString();
                var regex1 = new Regex(@"[\w]+\.(html|css|js|jpg|png|ico)");
                var regex2 = new Regex(@"html|css|js|img");
                var regex3 = new Regex(@"about|contacts|instagram|why_itis");
                var regex4 = new Regex(@"png|jpg");
                
                var file = regex1.Matches(req).Select(a => a.Value).FirstOrDefault();
                var ifImage = regex4.Matches(file).Select(a => a.Value).FirstOrDefault();
                var fold = regex2.Matches(req).Select(a => a.Value).FirstOrDefault() + @"/";
                var fold_img = regex3.Matches(req).Select(a => a.Value).FirstOrDefault() + @"/";
                if (fold_img.Length == 1 || ifImage == null)
                    fold_img = "";
                fold = fold.Length == 1 ? "" : fold;
                string data = GetRequestPostData(request);
                if (data != null)
                {
                    WriteNewStudent(data);
                }
                if (file.Contains("students"))
                    AddData(ParseData());
                var bytes = File.ReadAllBytes(@"../../../../www/" + fold + fold_img + file);

                response.ContentLength64 = bytes.Length;

                Stream sw = response.OutputStream;
                sw.Write(bytes, 0, bytes.Length);
                sw.Close();
            }
        }


        static void AddData(string html)
        {
            string new_data = "";
            using (StreamReader sr = new StreamReader("../../../../www/html/students.html"))
            {
                while (!sr.EndOfStream)
                {
                    string data = sr.ReadLine();
                    new_data += data + Environment.NewLine;
                    if (data.Contains("<div class=\"table_group\">"))
                    {
                        new_data += html;
                        break;
                    }
                }
            }
            new_data += "</div></div></div>";


            using (StreamWriter sw = new StreamWriter("../../../../www/html/students.html", false))
            {
                sw.Write(new_data);
            }
        }
        static string ParseData()
        {
            string html = "<table id=\"students\">";
            using (StreamReader sr = new StreamReader("../../../students.csv"))
            {
                while (!sr.EndOfStream)
                {
                    string[] data = sr.ReadLine().Split(';');
                    if (html == "<table id=\"students\">")
                    {
                        html += "<tr>" +
                            "<th>" + data[0] + "</th>" +
                            "<th>" + data[1] + "</th>" +
                            "<th>" + data[2] + "</th>" +
                            "<th>" + data[3] + "</th>" +
                            "<th>" + data[4] + "</th>" +
                            "<th>" + data[5] + "</th>" +
                            "<th>" + data[6] + "</th>" +
                            "<th>" + data[7] + "</th>" + "</tr>" + Environment.NewLine;
                        continue;
                    }
                    html += "<tr>" +
                            "<td>" + data[0] + "</td>" +
                            "<td>" + data[1] + "</td>" +
                            "<td>" + data[2] + "</td>" +
                            "<td>" + data[3] + "</td>" +
                            "<td>" + data[4] + "</td>" +
                            "<td>" + data[5] + "</td>" +
                            "<td>" + data[6] + "</td>" +
                            "<td>" + data[7] + "</td>" + "</tr>" + Environment.NewLine;
                }
            }
            html += "</table>";
            return html;
        }

        public static string GetRequestPostData(HttpListenerRequest request)
        {
            if (!request.HasEntityBody)
            {
                return null;
            }
            System.IO.Stream body = request.InputStream;
            System.Text.Encoding encoding = request.ContentEncoding;
            System.IO.StreamReader reader = new System.IO.StreamReader(body, encoding);
            string s = reader.ReadToEnd();
            body.Close();
            reader.Close();
            return HttpUtility.UrlDecode(s);
        }

        private static void WriteNewStudent(string data)
        {
            string[] student_data = data.Split('&');
            using (StreamWriter sr = new StreamWriter("../../../students.csv", true))
            {
                sr.Write(Environment.NewLine);
                for (int i = 0; i < student_data.Length; i++)
                {
                    sr.Write(student_data[i].Split('=')[1]);
                    if (student_data[i].Split('=')[0] != "info")
                        sr.Write(";");

                }
            }
        }
    }
}

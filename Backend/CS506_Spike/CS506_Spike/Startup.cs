using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CS506_Spike.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CS506_Spike
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddControllers().AddNewtonsoftJson();
    

            var connection = "Server=tcp:ycho73.database.windows.net,1433;Initial Catalog=ABOUT_ME_DB;Persist Security Info=False;" +
                "User ID=ycho73;Password=Perfectdark@;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;" +
                "Connection Timeout=30;";

            services.AddDbContext<ABOUT_ME_DBContext>(options => options.UseSqlServer(connection));
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

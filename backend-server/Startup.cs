using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System.Net;

namespace mvcbulid
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
        }


        private void HandleAppRoute(IApplicationBuilder app)
        {

            var filesProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"app"));
            app.UseDefaultFiles(new DefaultFilesOptions()
            {
                FileProvider = filesProvider
            }
            );

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = filesProvider
            });

            app.MapWhen(IsAngularRoute,
                        branch =>
                        {
                            branch.Use((context, next) =>
                            {
                                context.Request.Path = new PathString(@"/index.html");
                                return next();
                            });

                            branch.UseStaticFiles(new StaticFileOptions()
                            {
                                FileProvider = filesProvider
                            });
                        });

        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }

            app.Map("/app", HandleAppRoute);

            app.UseMvc(
                routes =>
                {
                    routes.MapRoute(
                        name: "api",
                        template: "api/{controller}/{action}/{id?}");
                });
        }

        private bool IsAngularRoute(HttpContext context)
        {
            return Path.HasExtension(context.Request.Path.Value) == false;
        }
    }



}

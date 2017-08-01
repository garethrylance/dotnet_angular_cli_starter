#addin "Cake.Npm"


var target = Argument("target", "Package-Server");


  Task("Show-ng-Version")
  .Does(() =>
{
       // show ng version
        using(var process = StartAndReturnProcess("ng", new ProcessSettings{ Arguments = "version" ,WorkingDirectory="frontend-spa" }))
        {
            process.WaitForExit();
            // This should output 0 as valid arguments supplied
          
            if(process.GetExitCode() != 0)
            {
                Information("Exit code: {0}", process.GetExitCode());
                throw new Exception("Failed to show NG version");
            }
        }
});

  Task("Package-Single-Page-App")
  .IsDependentOn("Show-ng-Version")
  .Does(() =>
{
    var settings = new NpmInstallSettings();

        settings.Global = false;
        settings.Production = false;
        settings.LogLevel = NpmLogLevel.Warn;
        settings.WorkingDirectory = "./frontend-spa/";
        NpmInstall(settings);

        using(var process = StartAndReturnProcess("ng", new ProcessSettings{ Arguments = "build -op ../backend-server/app -bh /app/" ,WorkingDirectory="frontend-spa" }))
        {
            process.WaitForExit();
            // This should output 0 as valid arguments supplied
            Information("Exit code: {0}", process.GetExitCode());
            if(process.GetExitCode() != 0)
            {
                throw new Exception("Failed to build SPA");
            }
        }

});


Task("Package-Server") 
  .IsDependentOn("Package-Single-Page-App")
  .Does(() =>
{
    var settings = new DotNetCorePublishSettings
        {
            Configuration = "Release",
            OutputDirectory = "./dist/"
        };


    var directoriesToClean = new []{
            "artifacts",
            settings.OutputDirectory
        };
        CleanDirectories(directoriesToClean);

    DotNetCoreRestore( "./backend-server/");
    DotNetCorePublish("./backend-server/",settings);
    Zip("./dist", "artifacts/publish.zip");

});



RunTarget(target);
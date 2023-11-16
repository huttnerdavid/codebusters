FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app

COPY appsettings.json ./

ENV IssueAudience=apiWithDockerStuff
ENV ConnectionString="Server=host.docker.internal,1433;Database=codebusters;User Id=sa;Password=yourStrong(!)Password;Encrypt=False;"
ENV IssueSign=!weWillCWhatThisGonnaB!

COPY --from=build-env /app/out .

ENV ASPNETCORE_URLS=http://+:80

ENTRYPOINT ["dotnet", "Codebusters.dll"]

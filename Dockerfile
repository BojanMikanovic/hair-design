FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base

FROM node:lts-alpine3.18 AS node-build
WORKDIR /src/client
COPY ./client/package.json ./client/yarn.lock ./client/.yarnrc.yml ./
RUN corepack enable
RUN yarn install --immutable
COPY ./client .
RUN yarn build


FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["server/HairDesign.App/HairDesign.App.csproj", "HairDesign.App/"]
RUN dotnet restore "HairDesign.App/HairDesign.App.csproj"
COPY ./server/HairDesign.App ./HairDesign.App
COPY --from=node-build /src/client/dist ./HairDesign.App/wwwroot/desktop
WORKDIR /src/HairDesign.App
RUN dotnet build "HairDesign.App.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HairDesign.App.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
EXPOSE 443
ENTRYPOINT ["dotnet", "HairDesign.App.dll"]

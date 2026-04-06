********## Add migration

```
dotnet ef migrations add <Name> --startup-project HairDesign.App --project HairDesign.App -o Infrastructure/Migrations --context ApplicationDbContext
```

## Remove migration

```
dotnet ef migrations remove --startup-project HairDesign.App --project HairDesign.App --context ApplicationDbContext
```

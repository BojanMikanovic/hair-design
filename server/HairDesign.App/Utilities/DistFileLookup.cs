namespace HairDesign.App.Utilities;

public class DistFileLookup(string distPath)
{
    public string ResolveFileName(string? folder, string startsWith, string endsWith)
    {
        var directory = new DirectoryInfo(distPath + (folder != null ? "/" : "") + folder);

        foreach (var fi in directory.EnumerateFiles())
            if (fi.Name.StartsWith(startsWith) && fi.Name.EndsWith(endsWith))
                return fi.Name;

        throw new InvalidOperationException(
            $"Cannot find a dist file matching the given pattern: {startsWith}*{endsWith}");
    }
}
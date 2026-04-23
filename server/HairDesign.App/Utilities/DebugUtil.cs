namespace HairDesign.App.Utilities;

public class DebugUtil
{
#if DEBUG
    public static bool IsDebugMode => true;
#else
    public static bool IsDebugMode => false;
#endif
}
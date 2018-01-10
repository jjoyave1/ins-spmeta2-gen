using SPMeta2.Definitions.Fields;
using SPMeta2.Enumerations;
using System;

namespace ey.xHub.core.SiteCollection.Webs.sell.Webs.models.Webs.divestiture.Artefacts
{
    public static class SampleField
    {
        public static LookupFieldDefinition Field()
        {
            return new LookupFieldDefinition
            {
                Group = ".EY Generic",
                Id = "newGuid",
                Description = "",
                InternalName = "SampleField",
                LookupField = , // Example: BuiltInInternalFieldNames.Title
                LookupListUrl = , // Example: ListName.List().CustomUrl
                LookupWebUrl = "~site",
                Required = false,
                Title = "SampleFieldTitle"
            };
        }
    }
}
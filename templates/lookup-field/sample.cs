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
                Group = "groupName",
                Id = new Guid("newGuid"),
                InternalName = "SampleField",
                LookupField = listLookup().LookupListUrl,
                LookupWebUrl = listLookup().LookupWebUrl,
                LookupWebUrl = "~site",
                Required = false,
                Title = "fieldName"
            };
        }
    }
}
using SPMeta2.Definitions.Fields;
using SPMeta2.Enumerations;
using System;

namespace ey.xHub.core.SiteCollection.Webs.sell.Webs.models.Webs.divestiture.Artefacts
{
    public static class SampleField
    {
        public static DependentLookupFieldDefinition Field()
        {
            return new DependentLookupFieldDefinition
            {
                Group = "groupName",
                Id = new Guid("newGuid"),
                InternalName = "SampleField",
                LookupField = BuiltInInternalFieldNames.Title, // Default lookup set to Title field
                LookupListUrl = listLookup().LookupListUrl,
                LookupWebUrl = listLookup().LookupWebUrl,
                PrimaryLookupFieldId = listLookup().Id,
                Title = "fieldName"
            };
        }
    }
}
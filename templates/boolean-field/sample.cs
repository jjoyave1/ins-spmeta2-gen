using SPMeta2.Definitions.Fields;
using SPMeta2.Enumerations;
using System;

namespace ey.xHub.core.SiteCollection.Webs.sell.Webs.models.Webs.divestiture.Artefacts
{
    public static class SampleField
    {
        public static BooleanFieldDefinition Field()
        {
            return new BooleanFieldDefinition
            {
                Group = "groupName",
                Id = new Guid("newGuid"),
                InternalName = "SampleField",
                DefaultValue = "0", // Default: Yes
                Title = "fieldName"
            }; 
        }
    }
}
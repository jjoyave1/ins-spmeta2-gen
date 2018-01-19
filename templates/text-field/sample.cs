using SPMeta2.Definitions.Fields;
using System;

namespace ey.xHub.core.SiteCollection.Webs.sell.Webs.models.Webs.divestiture.Artefacts
{
    public static class SampleField
    {
        public static TextFieldDefinition Field()
        {
            return new TextFieldDefinition
            {
                Group = "groupName",
                Id = new Guid("newGuid"),
                InternalName = "SampleField",
                Required = false,
                Title = "fieldName"
            };
        }
    }
}
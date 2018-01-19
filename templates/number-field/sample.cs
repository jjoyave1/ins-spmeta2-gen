using SPMeta2.Definitions.Fields;
using SPMeta2.Enumerations;
using System;

namespace ey.xHub.core.SiteCollection.Webs.sell.Webs.models.Webs.divestiture.Artefacts
{
    public static class SampleField
    {
        public static NumberFieldDefinition Field()
        {
            return new NumberFieldDefinition
            {
                Group = "groupName",
                Id = new Guid("newGuid"),
                InternalName = "SampleField",
                MaximumValue = maxVal,
                MinimumValue = minVal,
                Title = "fieldName"
            };
        }
    }
}
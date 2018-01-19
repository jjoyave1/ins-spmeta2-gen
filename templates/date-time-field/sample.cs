using SPMeta2.Definitions.Fields;
using SPMeta2.Enumerations;
using System;

namespace ey.xHub.core.SiteCollection.Webs.sell.Webs.models.Webs.divestiture.Artefacts
{
    public static class SampleField
    {
        public static DateTimeFieldDefinition Field()
        {
            return new DateTimeFieldDefinition
            {
                Group = "groupName",
                Id = new Guid("newGuid"),
                DisplayFormat = BuiltInDateTimeFieldFormatType.DateTime,
                FriendlyDisplayFormat = BuiltInDateTimeFieldFriendlyFormatType.Disabled,
                InternalName = "SampleField",
                Required = false,
                Title = "fieldName"
            }
        }
    }
}
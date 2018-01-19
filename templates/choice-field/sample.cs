using SPMeta2.Definitions.Fields;
using System.Collections.ObjectModel;
using System;

namespace ey.xHub.core.SiteCollection.Webs.sell.Webs.models.Webs.divestiture.Artefacts
{
    public static class SampleField
    {
        public static ChoiceFieldDefinition Field()
        {
            return new ChoiceFieldDefinition
            {
                Group = "groupName",
                Id = new Guid("newGuid"),
                Description = "",
                InternalName = "SampleField",
                Required = false,
                Choices = new Collection<string>
                {
                    choiceList
                },
                DefaultValue = "defaultChoice",
                Title = "fieldName"
            };
        }
    }
}
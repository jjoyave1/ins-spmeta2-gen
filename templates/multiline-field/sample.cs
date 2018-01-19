using SPMeta2.Definitions.Fields;
using SPMeta2.Enumerations;
using System;

namespace ey.xHub.core.SiteCollection.Webs.sell.Webs.models.Webs.divestiture.Artefacts
{
    public static class SampleField
    {
        public static NoteFieldDefinition Field()
        {
            return new NoteFieldDefinition
            {
                Group = "groupName",
                Id = new Guid("newGuid"),
                InternalName = "SampleField",
                NumberOfLines = 6,
                Required = true,
                RichTextMode = BuiltInRichTextMode.Compatible,
                Title = "fieldName"
            };
        }
    }
}
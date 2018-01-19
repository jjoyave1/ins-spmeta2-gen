using SPMeta2.Definitions;
using SPMeta2.Definitions.ContentTypes;
using SPMeta2.Enumerations;
using SPMeta2.Syntax.Default;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System;
using SPMeta2.Utils;

namespace ey.xHub.core.SiteCollection.Webs.sell.Webs.models.Webs.divestiture.Artefacts
{
    public static class SampleCTCT
    {
        // New Content Type Definition
        public static ContentTypeDefinition ContentType()
        {
            return new ContentTypeDefinition
            {
                Group = "groupName",
                Id = new Guid("newGuid"),
                Name = "CTName",
                ParentContentTypeId = BuiltInContentTypeId.Item
            };
        }

        public static WebModelNode AddSampleCTCT(this WebModelNode node)
        {
            node
                .AddContentType(ContentType(), currentContentType =>
                {
                    currentContentType
						fieldLinks
                        ;
                });
            return node;
        }
    }

    public static class SampleList
    {
        // New list definition 
        public static ListDefinition List()
        {
            return new ListDefinition
            {
                ContentTypesEnabled = true,
                CustomUrl = "List/SampleList",
                EnableVersioning = true,
                EnableAttachments = true,
                TemplateType = BuiltInListTemplateTypeId.GenericList,
                Title = "listName"
            };
        }

        // View definition(s)
        public static ListViewDefinition AllItems()
        {
            return new ListViewDefinition
            {
                Fields = new Collection<string>
                {
                    BuiltInInternalFieldNames.ID,
                    additionalFields
                },
                IsDefault = true,
                Query = "<OrderBy>" +
                            "<FieldRef Name='" + BuiltInInternalFieldNames.ID + "'/>" +
                        "</OrderBy>",
                RowLimit = 100,
                Title = "All Items",
                Url = "AllItems.aspx"
            };
        }

        public static QuickLaunchNavigationNodeDefinition QuickLaunch()
        {
            return new QuickLaunchNavigationNodeDefinition
            {
                Title = List().Title,
                Url = UrlUtility.CombineUrl(new string[]
                {
                    "~site",
                    List().CustomUrl,
                    AllItems().Url
                })
            };
        }

        // Add new list method
        public static WebModelNode AddSampleList(this WebModelNode node)
        {
            node
                .AddList(List(), currentList =>
                {
                    currentList
                        .AddContentTypeLink(SampleCTCT.ContentType())
                        .AddRemoveContentTypeLinks(new RemoveContentTypeLinksDefinition
                        {
                            ContentTypes = new List<ContentTypeLinkValue>
                                {
                                    new ContentTypeLinkValue { ContentTypeId = BuiltInContentTypeId.Item }
                                }
                        })
                        .AddListView(AllItems())
                        ;
                });
            return node;
        }
    }
}

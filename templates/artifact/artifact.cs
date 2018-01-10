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
    public static class SampleCT
    {
        // New Content Type Definition
        public static ContentTypeDefinition ContentType()
        {
            return new ContentTypeDefinition
            {
                Description = "List of sub functions",
                Group = ".EY SampleGroup",
                Id = "newGuid",
                Name = "SampleCTDisplayName",
                ParentContentTypeId = BuiltInContentTypeId.Item
            };
        }

        public static WebModelNode AddSampleCT(this WebModelNode node)
        {
            node
                .AddContentType(ContentType(), currentContentType =>
                {
                    currentContentType
                        // .AddContentTypeFieldLink(FieldsInfo.Function())
                        ;
                });
            return node;
        }
    }

    public static class SampleListList
    {
        // New list definition 
        public static ListDefinition List()
        {
            return new ListDefinition
            {
                ContentTypesEnabled = true,
                CustomUrl = "SampleListURL",
                EnableVersioning = true,
                EnableAttachments = true,
                TemplateType = BuiltInListTemplateTypeId.GenericList,
                Title = "SampleListTitle"
            };
        }

        // View definition(s)
        public static ListViewDefinition AllItems()
        {
            return new ListViewDefinition
            {
                Fields = new Collection<string>
                {
                    // BuiltInInternalFieldNames.ID,
                    // Additional Fields
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

        public static ListViewDefinition OMParameters()
        {
            return new ListViewDefinition
            {
                Fields = new Collection<string>
                {
                    BuiltInInternalFieldNames.LinkTitle,
                    FieldsInfo.FontAwesomeIconName().InternalName,
                    FieldsInfo.Ordinal().InternalName
                },
                IsDefault = false,
                Query = "<OrderBy>" +
                            "<FieldRef Name='" + FieldsInfo.Ordinal().InternalName + "'/>" +
                        "</OrderBy>",
                RowLimit = 100,
                Title = "OM Parameters",
                Url = "OM Parameters.aspx"
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
        public static WebModelNode AddSampleListList(this WebModelNode node)
        {
            node
                .AddList(List(), currentList =>
                {
                    currentList
                        .AddContentTypeLink(SampleCT.ContentType())
                        .AddRemoveContentTypeLinks(new RemoveContentTypeLinksDefinition
                        {
                            ContentTypes = new List<ContentTypeLinkValue>
                                {
                                    new ContentTypeLinkValue { ContentTypeId = BuiltInContentTypeId.Item }
                                }
                        })
                        .AddListView(AllItems())
                        .AddListView(OMParameters())
                        ;
                });
            return node;
        }
    }
}

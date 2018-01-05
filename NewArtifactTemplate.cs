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
    public static class SubFunctionCT
    {
        // New Content Type Definition
        public static ContentTypeDefinition ContentType()
        {
            return new ContentTypeDefinition
            {
                // Description = "List of sub functions",
                Group = ".EY Taxonomy",
                Id = new Guid("2e02ffe8-0080-4264-9323-456fd48752f6"),
                Name = "Sub Function",
                ParentContentTypeId = BuiltInContentTypeId.Item
            };
        }

        public static WebModelNode AddSubFunctionCT(this WebModelNode node)
        {
            node
                .AddContentType(ContentType(), currentContentType =>
                {
                    currentContentType
                        .AddContentTypeFieldLink(FieldsInfo.Function())
                        .AddContentTypeFieldLink(FieldsInfo.Ordinal())
                        .AddContentTypeFieldLink(FieldsInfo.FontAwesomeIconName())
                        ;
                });
            return node;
        }
    }

    public static class SubFunctionsList
    {
        // New list definition 
        public static ListDefinition List()
        {
            return new ListDefinition
            {
                ContentTypesEnabled = true,
                CustomUrl = "Lists/Functions",
                EnableVersioning = true,
                TemplateType = BuiltInListTemplateTypeId.GenericList,
                Title = "Functions"
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
                    BuiltInInternalFieldNames.LinkTitle,
                    FieldsInfo.Ordinal().InternalName,
                    FieldsInfo.FontAwesomeIconName().InternalName,
                    FieldsInfo.MenuCategory().InternalName,
                    BuiltInInternalFieldNames.Editor,
                    BuiltInInternalFieldNames.Modified
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
        public static WebModelNode AddSubFunctionsList(this WebModelNode node)
        {
            node
                .AddList(List(), currentList =>
                {
                    currentList
                        .AddContentTypeLink(SubFunctionCT.ContentType())
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

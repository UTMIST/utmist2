import { defineField, defineType } from "sanity";

export const project = defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string"
        }),
        defineField({
            name: "slug",
            type: "slug",
            options:{
                source: "title"
            }
        }),
        // defineField({
        //     name: "user", // TODO: ARRAY OF USERS
        //     type: "reference",
        //     to: {type: 'user'}
        // }),
        defineField({
            name: "user", // ARRAY OF USERS
            type: "array",
            of: [{ type: "reference", to: { type: "user" } }],
        }),
        defineField({
            name: "views",
            type: "number"
        }),
        defineField({
            name: "description",
            type: "text"
        }),
        defineField({
            name: "category",
            type: "string", //TODO: change to enum
            validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category.")
        }),
        defineField({
            name: "image",
            type: "url", //TODO: change to sanity image type
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "details",
            type: "markdown",
        }),
        defineField({
            name: "publishDate",
            type: "datetime",
        }),
        defineField({
            name: "status",
            type: "string",
            options: {
                list: [
                    { title: "Draft", value: "draft" },
                    { title: "Published", value: "published" },
                    { title: "Archived", value: "archived" },
                ],
            },
        }),
        defineField({
            name: "team",
            type: "array",
            of: [{ type: "reference", to: { type: "user" } }],
        }),
    ]
})
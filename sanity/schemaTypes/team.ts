import { defineField, defineType } from "sanity";

export const team = defineType({
    name: "team",
    title: "Team",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Title",
        }),
        defineField({
            name: "description",
            type: "text",
            title: "Description",
        }),
        defineField({
            name: "members",
            type: "array",
            title: "Members",
            of: [{ type: "reference", to: { type: "user" } }],
        }),
    ],
});

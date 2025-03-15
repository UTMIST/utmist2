import { buildCollection, buildProperty } from "@firecms/core";

export const publicUsersCollection = buildCollection({
    id: "publicUsers",
    name: "Public Users",
    path: "publicUsers",
    properties: {
        displayName: {
            dataType: "string",
            name: "Display Name",
            validation: { required: true }
        },
        image: {
            dataType: "string",
            name: "Profile Image",
            validation: { required: true }
        },
        name: {
            dataType: "string",
            name: "Name",
            validation: { required: true }
        },
        role: {
            dataType: "string",
            name: "Role",
            defaultValue: "user",
            validation: { required: true }
        },
        socials: {
            dataType: "map",
            name: "Social Media Links",
            properties: {
                LinkedIn: {
                    dataType: "string",
                    name: "LinkedIn",
                    url: true,
                    validation: { required: false }
                },
                GitHub: {
                    dataType: "string",
                    name: "GitHub",
                    url: true,
                    validation: { required: false }
                },
                Twitter: {
                    dataType: "string",
                    name: "Twitter",
                    url: true,
                    validation: { required: false }
                },
                GoogleScholar: {
                    dataType: "string",
                    name: "Google Scholar",
                    url: true,
                    validation: { required: false }
                },
                Medium: {
                    dataType: "string",
                    name: "Medium",
                    url: true,
                    validation: { required: false }
                },
                Website: {
                    dataType: "string",
                    name: "Personal Website",
                    url: true,
                    validation: { required: false }
                }
            },
            validation: { required: false }
        }
    }
}); 
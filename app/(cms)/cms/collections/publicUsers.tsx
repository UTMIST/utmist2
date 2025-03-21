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
        roles: {
            dataType: "map",
            name: "Roles by Year",
            properties: {
                "2024": {
                    dataType: "array",
                    name: "2024 Roles",
                    of: {
                        dataType: "string",
                        name: "Role"
                    },
                    validation: { required: false }
                },
                "2023": {
                    dataType: "array",
                    name: "2023 Roles",
                    of: {
                        dataType: "string",
                        name: "Role"
                    },
                    validation: { required: false }
                },
                "2022": {
                    dataType: "array",
                    name: "2022 Roles",
                    of: {
                        dataType: "string",
                        name: "Role"
                    },
                    validation: { required: false }
                },
                "2021": {
                    dataType: "array",
                    name: "2021 Roles",
                    of: {
                        dataType: "string",
                        name: "Role"
                    },
                    validation: { required: false }
                },
                "2020": {
                    dataType: "array",
                    name: "2020 Roles",
                    of: {
                        dataType: "string",
                        name: "Role"
                    },
                    validation: { required: false }
                }
            },
            validation: { required: false }
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
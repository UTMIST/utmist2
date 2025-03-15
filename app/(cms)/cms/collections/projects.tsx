import { buildCollection, buildProperty } from "@firecms/core";

export const projectsCollection = buildCollection({
    id: "projects",
    name: "Projects",
    path: "projects",
    properties: {
        id: {
            dataType: "string",
            name: "ID",
            validation: {
                required: true
            }
        },
        teamId: buildProperty({
            dataType: "reference" as any,
            name: "Team",
            path: "teams",
            validation: {
                required: true
            }
        }),
        startDate: {
            dataType: "string",
            name: "Start Date",
            validation: {
                required: true,
                matches: /^\d{4}-\d{2}$/,
                matchesMessage: "Must be in YYYY-MM format"
            }
        },
        endDate: {
            dataType: "string",
            name: "End Date",
            validation: {
                required: true,
                matches: /^\d{4}-\d{2}$/,
                matchesMessage: "Must be in YYYY-MM format"
            }
        },
        title: {
            dataType: "string",
            name: "Title",
            validation: {
                required: true
            }
        },
        thumbnail: {
            dataType: "string",
            name: "Thumbnail",
            validation: {
                required: true
            }
        },
        status: {
            dataType: "string",
            name: "Status",
            enumValues: {
                hiring: "Hiring",
                "not hiring": "Not Hiring"
            },
            defaultValue: "not hiring"
        },
        synopsis: {
            dataType: "string",
            name: "Synopsis",
            multiline: true,
            validation: {
                required: true
            }
        },
        slug: {
            dataType: "string",
            name: "Slug",
            validation: {
                required: false
            }
        },
        content: {
            dataType: "string",
            name: "Content",
            markdown: true,
            validation: {
                required: true
            }
        },
        type: {
            dataType: "string",
            name: "Type",
            enumValues: {
                Academic: "Academic",
                Applied: "Applied",
                Infrastructure: "Infrastructure"
            },
            validation: {
                required: true
            }
        },
        description: {
            dataType: "string",
            name: "Description",
            multiline: true,
            validation: {
                required: false
            }
        },
        youtube: {
            dataType: "string",
            name: "YouTube Link",
            url: true,
            validation: {
                required: false
            }
        },
        proposal: {
            dataType: "string",
            name: "Proposal Link",
            url: true,
            validation: {
                required: false
            }
        }
    }
});
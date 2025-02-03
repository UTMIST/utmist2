import { buildCollection, buildProperty } from "@firecms/core";

export const teamsCollection = buildCollection({
    id: "teams",
    name: "Teams",
    path: "teams",
    properties: {
        // id: {
        //     dataType: "string",
        //     name: "Team ID",
        //     validation: { required: true },
        // },
        title: {
            dataType: "string",
            name: "Team Name",
            validation: { 
                required: true,
                min: 3,
                max: 50
            },
            description: "The display name of the team (e.g., 'Web Dev Team')"
        },
        // Optional: Add team members as references to users
        members: {
            dataType: "array",
            name: "Team Members",
            of: {
                dataType: "reference",
                path: "users"
            },
            description: "Members belonging to this team"
        },
        // Optional: Add team creation date
        createdAt: {
            dataType: "date",
            name: "Creation Date",
            autoValue: "on_create",
            mode: "date_time"
        },
        // Optional: Add team status
        active: {
            dataType: "boolean",
            name: "Active",
            defaultValue: true,
            description: "Whether the team is currently active"
        }
    },
    // Optional permissions configuration
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        delete: authController.extra?.roles?.includes('admin')
    })
});
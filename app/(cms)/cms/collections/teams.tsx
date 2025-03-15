import { buildCollection, buildProperty } from "@firecms/core";

export const teamsCollection = buildCollection({
    id: "teams",
    name: "Teams",
    path: "teams",
    properties: {
        id: {
            dataType: "string",
            name: "Team ID",
            validation: { required: true },
        },
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
        description: {
            dataType: "string",
            name: "Team Description",
            multiline: true,
            validation: { required: true },
            description: "A brief description of what the team does"
        },
        members: {
            dataType: "array",
            name: "Team Members",
            of: {
                dataType: "reference" as any,
                path: "publicUsers"
            },
            description: "Members belonging to this team"
        },
        name: {
            dataType: "string",
            name: "Team Identifier",
            validation: { 
                required: true 
            },
            description: "A unique identifier for the team (used in URLs)"
        }
    }
});
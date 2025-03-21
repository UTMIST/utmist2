import { buildCollection, buildProperty } from "@firecms/core";

export const usersCollection = buildCollection({
    id: "users",
    name: "Users",
    path: "users",
    properties: {
        id: {
            dataType: "string",
            name: "User ID",
            validation: { required: true },
        },
        displayName: {
            dataType: "string", 
            name: "Display Name",
            validation: { required: true }
        },
        name: {
            dataType: "string",
            name: "Name",
            validation: { required: true }
        },
        email: {
            dataType: "string",
            name: "Email",
            email: true,
            validation: { required: true }
        },
        image: {
            dataType: "string",
            name: "Profile Image",
            validation: { required: false }
        },
        emailVerified: {
            dataType: "string",
            name: "Email Verified",
            validation: { required: false }
        },
        createdAt: {
            dataType: "date",
            name: "Creation Date",
            mode: "date_time"
        },
        legacy: {
            dataType: "boolean",
            name: "Legacy User",
            defaultValue: false
        },
        legacyClaimed: {
            dataType: "boolean",
            name: "Legacy Claimed",
            defaultValue: false
        },
        AuthID: {
            dataType: "string",
            name: "Authentication ID (Leave empty if legacy user)",
            validation: { required: false }
        }
    }
});
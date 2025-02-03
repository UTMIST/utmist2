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
        bio: {
            dataType: "string",
            name: "Bio",
            multiline: true,
            validation: { required: false }
        },
        displayName: buildProperty({
            dataType: "string",
            name: "Display Name",
            validation: { required: true }
        }),
        name: {
            dataType: "string",
            name: "URL Handle",
            validation: {
                required: true,
                matches: /^[a-z0-9-]+$/,
                matchesMessage: "Only lowercase letters, numbers, and hyphens allowed"
            },
            description: "Used in URL: utmist.com/users/{name}"
        },
        email: {
            dataType: "string",
            name: "Email",
            email: true,
            validation: { required: true }
        },
        published: {
            dataType: "boolean",
            name: "Published",
            defaultValue: false,
            description: "Controls visibility on public profile"
        },
        verified: {
            dataType: "boolean",
            name: "Verified",
            defaultValue: false,
            description: "Account verification status"
        },
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
        googleScholar: {
            dataType: "string",
            name: "Google Scholar",
            url: true,
            validation: { required: false }
        },
        createdAt: {
            dataType: "date",
            name: "Creation Date",
            autoValue: "on_create",
            mode: "date_time"
        },
        // Dynamic publishing based on positions (example implementation)
        positions: ({ values }) => buildProperty({
            dataType: "array",
            name: "Positions",
            of: {
                dataType: "string"
            },
            description: "Automatically publishes profile when positions exist",
            readOnly: true, // Assuming positions come from another system
            disabled: true,
            validation: {
                required: false
            }
        })
    },
    // callbacks: {
    //     onSaveSuccess: ({ entityId, values }) => {
    //         if (values.positions && values.positions.length > 0) {
    //             return { ...values, published: true };
    //         }
    //         return values;
    //     }
    // }
});
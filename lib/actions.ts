"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createProject = async (
    state: any,
    form: FormData,
    details: string,
    ) => {

    const session = await auth();

    if (!session)
        return parseServerActionResponse({
        error: "Not signed in",
        status: "ERROR",
        });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "details"),
    );

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const project = {
        title,
        description,
        category,
        image: link,
        slug: {
            _type: slug,
            current: slug,
        },
        user: {
            _type: "reference",
            _ref: session?.id,
        },
        details,
        };

        const result = await writeClient.create({ _type: "project", ...project });

        return parseServerActionResponse({
        ...result,
        error: "",
        status: "SUCCESS",
        });
    } catch (error) {
        console.log(error);

        return parseServerActionResponse({
        error: JSON.stringify(error),
        status: "ERROR",
        });
    }
};
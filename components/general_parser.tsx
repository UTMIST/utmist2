import { BaseMetaData } from "@components/schemas/BaseMetaData";

type ContentData<T> = T & { content: string; slug: string };

export async function getContentData<T extends BaseMetaData>(
  contentType: string
): Promise<ContentData<T>[]> {
  return [
    {
        ...({} as T),
        content: "template content",
        slug: "template-slug"
    }
];
}

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { BaseMetaData } from '../schemas/BaseMetaData';

type ContentData<T> = T & { content: string, slug: string };

export async function getContentData<T extends BaseMetaData>(
  contentType: string
): Promise<ContentData<T>[]> {
  const contentPath = path.join(process.cwd(), `src/all-yaml/${contentType}`);

  const files = await fs.readdir(contentPath);
  const contentData = await Promise.all(files.map(async (fileSlug) => {
    const filePath = path.join(contentPath, fileSlug);
    const fileContents = await fs.readFile(filePath);
    const { data, content } = matter(fileContents, {});

    return {
      ...(data as T),
      content,
      slug: fileSlug.replace('.yaml', ''),
    } as ContentData<T>;
  }));

  return contentData;
}
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import dayjs, {Dayjs} from "dayjs";

export type TableExample = {
    e1: string,
    e2: string,
}

export type ArticleMetaData = {
    title: string,
    publishDate: string,
    coverImage: string,
    externalLink: string,
    tableexample: TableExample[],
}

export type Article = {
    title: string,
    publishDate: Dayjs,
    coverImage: string,
    externalLink: string,
    tableexample: TableExample[],
    content: string
    slug: string,
}

const articlesPath = path.join(process.cwd(), 'src/temp-yaml/content');

export async function getArticleData(): Promise<Article[]> {
    const articles = await fs.readdir(articlesPath);
    const parsedArticles = await Promise.all(articles.map(async (articleSlug: string) => {
        const fileContents = await fs.readFile(path.join(articlesPath, articleSlug));
        const {data, content, excerpt} = matter(fileContents, { excerpt: true });
        const articleData = data as ArticleMetaData;
        return {
            ...articleData,
            slug: articleSlug.replace('.yaml', ''),
            content,
            publishDate: dayjs(articleData.publishDate),
        } as Article
    }));

    return parsedArticles;
}
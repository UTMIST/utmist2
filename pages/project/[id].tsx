"use client";

import { getContentData } from "@/common/general_parser";
import { ProjectMetaData } from "@/schemas/ProjectMetaData";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import ReactMarkdown from "react-markdown"
type ContentData<T> = T & { content: string; slug: string };

const individualProject = ({ found }: { found: ContentData<ProjectMetaData> }) => {
  return (
    <div key={"individual-project"}>
      <ReactMarkdown>{found.content}</ReactMarkdown>
    </div>
  );
};

export async function getStaticPaths() {
  const data: ContentData<ProjectMetaData>[] = await getContentData<ProjectMetaData>(
    "projects"
  );

  const paths = data.map((item) => {
    return { params: { id: item.slug } };
  });

    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps(context: GetStaticPropsContext) {
    const params: ParsedUrlQuery = context.params!;
  const data: ContentData<ProjectMetaData>[] = await getContentData<ProjectMetaData>(
    "projects"
  );
    const projId = params.id as string

    const found = data.find((item) => item.slug == projId);

  return {
    props: {
      found,
    },
  };
}

export default individualProject;

"use client";

import { getContentData } from "@/common/general_parser";
import { useRouter } from 'next/router'
import { ProjectMetaData } from "@/schemas/ProjectMetaData";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
var marked = require('marked');
type ContentData<T> = T & { content: string; slug: string };

const whatWeDo = ({ found }: { found: ContentData<ProjectMetaData> }) => {
  const markdownContent = marked.marked(found.content || '');
  console.log('reached')

  return (
    <>
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
    </>
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
    console.log("reached2")
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

export default whatWeDo;

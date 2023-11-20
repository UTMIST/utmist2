"use client";

import { getContentData } from "@/common/general_parser";
import { ProjectMetaData } from "@/schemas/ProjectMetaData";
var marked = require('marked');
type ContentData<T> = T & { content: string; slug: string };

interface ProjectsProp {
  data: ContentData<ProjectMetaData>[];
}

const whatWeDo: React.FC<ProjectsProp> = ({ data }) => {
  const infoCards = data.map((item) => {
    const markdownContent = marked.marked(item.content || '');
    return (
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
    );
  });

  return (
    <>
    {infoCards}
    </>
  );
};

export async function getStaticProps() {
  const data: ContentData<ProjectMetaData>[] = await getContentData<ProjectMetaData>(
    "projects"
  );

  return {
    props: {
      data,
    },
  };
}

export default whatWeDo;

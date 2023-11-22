"use client";

import { getContentData } from "@/common/general_parser";
import { ProjectMetaData } from "@/schemas/ProjectMetaData";
import ReactMarkdown from "react-markdown"
type ContentData<T> = T & { content: string; slug: string };

interface ProjectsProp {
  data: ContentData<ProjectMetaData>[];
}

const allProjects: React.FC<ProjectsProp> = ({ data }) => {

  const infoCards = data.map((item, ind) => {
    return (
    <div key={ind}>
      <ReactMarkdown>{item.content}</ReactMarkdown>
    </div>
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

  console.log(data)

  return {
    props: {
      data,
    },
  };
}

export default allProjects;

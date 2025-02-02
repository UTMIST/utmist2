import ProjectsServer from "./ProjectsServer";
import ProjectsClient from "./ProjectsClient";

export default async function Page({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = await searchParams;

  const projects = await ProjectsServer({ query: query || null });

  return (
    <div className="bg-dark-grey overflow-x-hidden">
      <section className="blue_container">
        <div className="w-screen h-[53vh] bg-cover bg-wwd-banner"></div>
        <div className="absolute left-[16.7vw] top-[18vh] text-white text-[5.2vh] font-roboto-mono">
          <h1 className="heading">Projects</h1>
          <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
        </div>
        <p className="absolute left-[16.7vw] top-[33vh] text-white text-[2.3vh] font-roboto-mono sub-heading">
          Student Projects
        </p>
      </section>

      <ProjectsClient projects={projects} query={query || null} />
    </div>
  );
}

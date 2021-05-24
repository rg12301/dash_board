import React from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

interface Props {}

const ProjectSelection = (props: Props) => {
  return (
    <>
      <Navbar />
      <section className="mt-20 px-20 grid grid-cols-1 md:grid-cols-2 md:grid-row-col md:gap-5 lg:grid-cols-4">
        <ProjectCard
          heading="Project 1"
          description="praesent tristique magna sit amet purus gravida quis blandit turpis"
        />
        <ProjectCard
          heading="Project 1"
          description="nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan"
        />
        <ProjectCard
          heading="Project 1"
          description="nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan"
        />
        <ProjectCard
          heading="Project 1"
          description="praesent tristique magna sit amet purus gravida quis blandit turpis"
        />
        <ProjectCard
          heading="Project 1"
          description="ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet"
        />
        <ProjectCard
          heading="Project 1"
          description="praesent tristique magna sit amet purus gravida quis blandit turpis"
        />
      </section>
    </>
  );
};

export default ProjectSelection;

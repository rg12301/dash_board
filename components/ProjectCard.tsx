import React from "react";
import { ArrowRightIcon as ArrowRight } from "@heroicons/react/outline";

interface Props {
  heading: string;
  description: string;
}

const ProjectCard = ({ heading, description }: Props) => {
  return (
    <div className="card flex flex-row items-center space-x-8 group">
      <div className="flex flex-col justify-evenly group-hover:text-gray-800 w-auto h-full">
        <h1 className="text-xl font-semibold">{heading}</h1>
        <span>{description}</span>
      </div>
      <div className="h-full flex flex-col justify-center">
        <ArrowRight className="w-5 h-5 text-white group-hover:text-_blue" />
      </div>
    </div>
  );
};

export default ProjectCard;

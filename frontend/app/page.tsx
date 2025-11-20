"use client";
import { useEffect } from "react";

type Project = {
  id: number;
  name: string;
};

const mockdata: Project[] = [
  { id: 1, name: "Project 1" },
  { id: 2, name: "Project 2" },
  { id: 3, name: "Project 3" },
  { id: 4, name: "Project 4" },
  { id: 5, name: "Project 5" },
  { id: 6, name: "Project 6" },
];

export default function Home() {
  useEffect(() => {}, []);

  const projects: Project[] = [];

  return (
    <div className="flex min-h-screen justify-center">

      <div className="flex flex-col items-center w-96 relative border-r-2">
        <div className="w-full p-4 text-center border-b-2">
          Projects tab
        </div>

        <div className="flex flex-col overflow-y-scroll w-full">
          {mockdata.map((project) => (
            <div className="p-4 border-b-2" key={project.id}>
              {project.name}
            </div>
          ))}
        </div>

        <button className="p-4 rounded-full absolute bottom-4 border-2 w-44">
          Create Project
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full dark-purple-bg">
        {projects.length === 0 && (
          <div className="backdrop-blur-2xl p-4 border rounded-2xl">
            No projects Created
          </div>
        )}
      </div>
    </div>
  );
}

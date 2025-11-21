"use client";
import { useEffect } from "react";
import NewProjectForm from "@/app/Components/newProjectForm";

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

  function submitProject() {
      /*backend stuff*/
  }
  function submitIssue(){
      /*backend stuff*/
  }

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

        <div>
            <form onSubmit={submitProject}>
                <input name="projectName" type="text" placeholder="My New Project" />
                <button title={"Create new Project"} className="p-4 rounded-full bottom-4 border-2 w-44" type={"submit"}>Create new Project</button>
            </form>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full dark-purple-bg">
        {projects.length === 0 && (
          <div className="backdrop-blur-2xl p-4 border rounded-2xl">
              <form action={submitIssue}>
                  {/* put current project here */}

                  <input name="issueName" type="text" placeholder="Issue Name" />
                  <input name="issueDescription" type="text" placeholder="New Issue Description" />
                  <button title={"Submit Issue"} className="p-4 rounded-full bottom-4 border-2 w-44" type={"submit"}>Submit Issue</button>
              </form>
          </div>
        )}
      </div>
    </div>
  );
}

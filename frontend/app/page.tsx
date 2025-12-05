"use client";
import { useEffect, useState } from "react";
import { addProject, getProjects, Project } from "@/app/lib/projects";
import { getIssues, Issue } from "@/app/lib/issues";
import { useRouter } from "next/navigation";
import IssueForms from "@/app/components/issue_forms";

export default function Home() {
  const [createProject, setCreateProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [empty, setEmpty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      const projects = await getProjects();
      setProjects(projects);
    }
    fetchProjects();
  }, []);

  async function handleSubmit() {
    if(projectName === "") {
      setEmpty(true);
      return
    };
    setEmpty(false);
    await addProject(projectName);
    setCreateProject(false);
    const updated = await getProjects();
    setProjects(updated);
  }

  const handleProjectSelect = async (project: Project) => {
    setCurrentProject(project);
    const fetched = await getIssues((project.id??"").toString());
    setIssues(fetched);
  };

  async function handleIssueSelect(issue: Issue) {
    router.push(`/issue?id=${issue.id}`);
  }

  return (
    <div className="flex min-h-screen w-full bg-zinc-950 text-white">
      <div className="w-80 border-r border-zinc-800 bg-zinc-950 flex flex-col">
        <div className="p-6 text-sm font-medium text-zinc-400 border-b border-zinc-800">Projects</div>

        <div className="flex-1 overflow-y-auto">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className={`w-full text-left px-6 py-3 text-sm border-b border-zinc-800 hover:bg-zinc-900 transition ${
                currentProject?.id === project.id ? 'bg-zinc-900' : ''
              }`}
            >
              {project.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCreateProject(true)}
          className="m-4 p-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition"
        >
          + New Project
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex p-6 overflow-y-auto w-full flex-col justify-items-center">
        {createProject && (
          <div className="max-w-lg mx-auto bg-zinc-900 border border-zinc-800 rounded-lg p-8">
            <h2 className="text-xl font-medium mb-6">Create Project</h2>
            <div className="flex flex-col space-y-4">
              <input
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
                type="text"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition"
              >
                Submit
              </button>
            </div>
            <button
              className="mt-4 text-sm text-zinc-500 hover:text-white transition"
              onClick={() => setCreateProject(false)}
            >
              Cancel
            </button>
            {empty && (
              <div className="mt-4 text-sm text-red-500">
                Project name is required
              </div>
            )}
          </div>
        )}

        {currentProject && !createProject && (
          <div className="max-w flex m-16 flex-col p-6 bg-zinc-900 rounded-md">
            <p className="text-3xl font-medium mb-8">{currentProject.name}</p>
            <IssueForms currentProject={currentProject} setIssues={setIssues}/>

            <div className="space-y-3 bg-zinc-900">

              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="border-zinc-600 rounded-lg p-6 border-1 hover:border-zinc-500 transition cursor-pointer bg-zinc-950 hover:bg-zinc-800"
                  onClick={() => handleIssueSelect(issue)}
                >
                  <div className="flex justify-start items-center mb-2">
                    <h2 className="text-base font-medium mr-2">{issue.title}</h2>

                      <div>
                          {issue.status == 0 ? (
                              <div className="bg-rose-400 aspect-square w-full h-2 rounded-sm"></div>
                          ) : (
                              <div className="bg-lime-400 aspect-square w-full h-2 rounded-sm"></div>
                          )}
                      </div>

                  </div>
                  <p className="text-sm text-zinc-400 mb-2">{issue.description}</p>
                  <p className="text-xs text-zinc-600">Commit: {issue.commit}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
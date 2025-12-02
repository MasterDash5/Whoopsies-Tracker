"use client";
import { useEffect, useState } from "react";
import { addProject, getProjects, Project } from "@/app/lib/projects";
import { addIssue, getIssues, Issue } from "@/app/lib/issues";
import { useRouter } from "next/navigation";

export default function Home() {
  const [createProject, setCreateProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [issueName, setIssueName] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [issueCommit, setIssueCommit] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      const projects = await getProjects();
      setProjects(projects);
    }
    fetchProjects();
  }, []);

  async function handleSubmit() {
    await addProject(projectName);
    setCreateProject(false);
    const updated = await getProjects();
    setProjects(updated);
  }

  async function handleCreateIssue() {
    await addIssue({
      project_id: currentProject!.id??0,
      title: issueName,
      description: issueDescription,
      commit: issueCommit,
    });
    const updated = await getIssues((currentProject!.id??"").toString());
    setIssues(updated?[]:[]);
    setIssueName("");
    setIssueDescription("");
    setIssueCommit("");
  }

  const handleProjectSelect = async (project: Project) => {
    setCurrentProject(project);
    const fetched = await getIssues((project.id??0).toString());
    setIssues(fetched?[]:[]);
  };

  async function handleIssueSelect(issue: Issue) {
    router.push(`/${issue.id}`);
  }

  return (
    <div className="flex min-h-screen justify-center">

      <div className="flex flex-col items-center w-96 relative border-r-2">
        <div className="w-full p-4 text-center border-b-2">
          Projects tab
        </div>

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
      <div className="flex-1 p-10 overflow-y-auto">
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
          </div>
        )}

        {currentProject && !createProject && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-medium mb-8">{currentProject.name}</h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-medium mb-4">New Issue</h2>
              <div className="grid grid-cols-1 gap-3">
                <input
                  className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
                  type="text"
                  placeholder="Issue title"
                  value={issueName}
                  onChange={(e) => setIssueName(e.target.value)}
                />
                <input
                  className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
                  type="text"
                  placeholder="Description"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                />
                <input
                  className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
                  type="text"
                  placeholder="Commit hash"
                  value={issueCommit}
                  onChange={(e) => setIssueCommit(e.target.value)}
                />
                <button
                  onClick={handleCreateIssue}
                  className="py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition"
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition cursor-pointer"
                  onClick={() => handleIssueSelect(issue)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-base font-medium">{issue.title}</h2>
                    <span className="text-xs text-zinc-500">{issue.status}</span>
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
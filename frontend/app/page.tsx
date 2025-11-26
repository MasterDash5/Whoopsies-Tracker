"use client";
import { useEffect, useState } from "react";
import { addProject, getProjects } from "@/app/lib/projects";
import { addIssue, getIssues } from "@/app/lib/issues";
import { useRouter } from "next/navigation";
type Project = {
  id: number;
  name: string;
};

type Issue = {
  id: number;
  project_id: number;
  created_at: string;
  resolved_at: string;
  status: string;
  title: string;
  description: string;
  commit: string;
};

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
    const projects = await getProjects();
    setProjects(projects);
  }

  async function handleCreateIssue() {
    await addIssue({
      project_id: currentProject!.id,
      title: issueName,
      description: issueDescription,
      commit: issueCommit
    })
  }

  const handleCreateProject = () => {
    setCreateProject(true);
  }

  const handleCancel = () => {
    setCreateProject(false);
  }

  const handleProjectSelect = async (project: Project) => {
    setCurrentProject(project);
    const issues = await getIssues(project.id.toString());
    setIssues(issues);
  }

  async function handleIssueSelect(issue: Issue) {
    router.push(`/${issue.id}`);
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center w-96 relative border-r-2">
        <div className="w-full p-4 text-center border-b-2">
          Projects tab
        </div>

        <div className="flex flex-col overflow-y-scroll w-full">
          {projects.map((project) => (
            <button className="p-4 border-b-2 hover:bg-gray-100" key={project.id} onClick={() => handleProjectSelect(project)}>
              {project.name}
            </button>
          ))}
        </div>
        <button className="p-4 border-b-2" onClick={handleCreateProject}>
          Create project
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full dark-purple-bg">
        {
          createProject && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <form className="flex flex-col items-center justify-center w-full h-full">
                <input
                  className="p-4 border-2"
                  type="text"
                  placeholder="Project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <button className="p-4 border-2" type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
              <button className="text-2xl border-2" onClick={handleCancel}>
                X
              </button>
            </div>
          )
        }

        {
          currentProject && (
            <div className="flex flex-col items-center justify-center w-full">
              <h1 className="text-2xl">{currentProject.name}</h1>
              <form className="" onSubmit={handleCreateIssue}>
                Add <i>issue</i>
                <input
                  className="p-4 border-2"
                  type="text"
                  placeholder="Issue name"
                  value={issueName}
                  onChange={(e) => setIssueName(e.target.value)}
                />
                <input
                  className="p-4 border-2"
                  type="text"
                  placeholder="Issue description"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  >
                </input>
                <input
                  className="p-4 border-2"
                  type="text"
                  placeholder="Issue commit"
                  value={issueCommit}
                  onChange={(e) => setIssueCommit(e.target.value)}
                  >
                </input>
                <button className="p-4 border-2" type="submit">
                  Submit
                </button>
              </form>
              {
                issues.map((issue) => (
                  <div className="" key={issue.id}>
                    <h1 className="text-2xl">{issue.title}</h1>
                    <p>{issue.description}</p>
                    <p>{issue.commit}</p>
                    <button className="p-4 border-2" onClick={() => handleIssueSelect(issue)}>Enter</button>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  );
}

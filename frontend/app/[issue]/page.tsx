"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Project, getProject } from "@/app/lib/projects";
import { Issue, getIssue, getIssues } from "@/app/lib/issues";
import IssueForms from "@/app/components/issue_forms";

export default function Home() {
    const params = useSearchParams();
    const router = useRouter();
    const id: string | null = params.get('id');
    const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [createIssue, setCreateIssue] = useState(false);

    useEffect(() => {
        async function fetchIssue() {
            if (id !== null) {
                const issue = await getIssue(id);
                setCurrentIssue(issue);
                setCurrentProject(await getProject(issue.project_id.toString()));
                setIssues(await getIssues(issue.project_id.toString()));
            }
        }
        fetchIssue();
    }, [id]);

    async function handleIssueSelect(issue: Issue) {
        router.push(`/issue?id=${issue.id}`);
    }

    return (
        <div className="flex min-h-screen w-full bg-zinc-950 text-white">
            <div className="w-80 border-r border-zinc-800 bg-zinc-950 flex flex-col">
                <div className="p-6 text-sm font-medium text-zinc-400 border-b border-zinc-800">Issues</div>

                <div className="flex-1 overflow-y-auto">
                {issues.map((issue) => (
                    <button
                    key={issue.id}
                    onClick={() => handleIssueSelect(issue)}
                    className={`w-full text-left px-6 py-3 text-sm border-b border-zinc-800 hover:bg-zinc-900 transition ${
                        currentIssue?.id === issue.id ? 'bg-zinc-900' : ''
                    }`}
                    >
                    {issue.title}
                    </button>
                ))}
                </div>

                <button
                onClick={() => setCreateIssue(true)}
                className="m-4 p-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition"
                >
                + New Issue
                </button>
            </div>
            <div className="flex items-center justify-center w-full mt-16">
                {currentIssue !== null && currentProject !== null && (
                    <div className="m-16 bg-zinc-900 border border-zinc-800 rounded-lg p-6 w-full h-full mb-32">
                        {currentIssue.title !== null && (
                            <div>
                                <div className="flex justify-between rounded-lg p-3 bg-zinc-800">
                                    <div className="rounded-md p-1">
                                        <p className="text-s text-zinc-600">{currentProject.name} - {id}</p>
                                        <p className="text-3xl pt-3">{currentIssue.title}</p>
                                    </div>
                                    <div className="justify-items-end rounded-md p-6">
                                        <p>Created {new Date(currentIssue.created_at??"").toLocaleDateString()}</p>
                                        {currentIssue.resolved_at !== null && (<p>Resolved {new Date(currentIssue.resolved_at??"").toLocaleDateString()}</p>)}
                                        <p className="text-xs text-zinc-600">{currentIssue.commit}</p>
                                    </div>
                                </div>
                                <div className="p-16 w-full">
                                    <p>{currentIssue.description}</p>
                                    <p>todo: attachments</p>
                                </div>
                            </div>
                        )}
                        {
                            createIssue && (
                                <><button className="absolute top-10 right-10 text-2xl" onClick={() => setCreateIssue(false)}>X</button>
                                <IssueForms currentProject={currentProject} setIssues={setIssues} /></>
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    );
}
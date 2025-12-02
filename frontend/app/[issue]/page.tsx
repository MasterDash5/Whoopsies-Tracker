"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Project, getProject } from "@/app/lib/projects";
import { Issue, getIssue, getIssues } from "@/app/lib/issues";

export default function Home() {
    const params = useSearchParams();
    const router = useRouter();
    const id: string | null = params.get('id');
    const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

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
                //onClick={() => setCreateIssue(true)}
                className="m-4 p-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition"
                >
                + New Issue
                </button>
            </div>
            <div className="flex items-center justify-center w-full mt-16">
                <div className="m-16">
                    <div>
                        <div className="flex justify-between">
                            <div>
                                <p>{} - {id}</p>
                                <p className="text-3xl">Issue name</p>
                            </div>
                            <div>
                                <p>Created (date)</p>
                                <p>Resolved (date) OR Current status</p>
                                <p>Commit</p>
                            </div>
                        </div>
                        <div className="p-16 w-full">
                            <p>The Whimsical Dance of the Celestial Pups

In the heart of the Flibbertygibbet Galaxy, where time pirouettes on the tips of hummingbird wings, a peculiar phenomenon unfolds each twilight. This is the annual celebration known as the Whimsical Dance of the Celestial Pups, a gathering where stardust meets the enchanted symphonies of lavender trees swaying in invisible zephyrs.
Periwinkle Clouds and Jellybean Rain

As night descends, skyward periwinkle clouds drift lazily, reflecting the shimmering glow of the two moons, Toodle and Fizzle. Their luminescence creates a canvas for the jellybean rain, which sparkles like diamonds, falling softly onto the jovial crowd of celestial canines adorned in kaleidoscopic bow ties. Each bark echoes melodic verses, weaving through the atmosphere like tendrils of cotton candy mist.
The Grand Cerulean Toadstool

At the center of this effervescent festivity lies the Grand Cerulean Toadstool, a towering mushroom shaped like a teacup, from which a never-ending stream of grape soda cascades. This effervescent fountain serves as the stage for the dancing pups, who leap and twirl with unparalleled grace. They glide on their luminous tails, creating trails of shimmering fairy lights, illuminating the laughter that fills the air.</p>
                            <p>attachments here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
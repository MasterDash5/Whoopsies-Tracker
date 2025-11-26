"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Issue, getIssue } from "@/app/lib/issues";

export default function Home() {
    const params = useSearchParams();
    const id: string | null = params.get('id');
    const [issue, setIssue] = useState<Issue | null>(null);

    useEffect(() => {
        async function pullIssue() {
            if (id != null) {
                //const issue: Issue = await getIssue(id);
                //setIssue(issue);
            }
        }

        pullIssue();
    }, [id]);

    /*
    if (id === null || issue == null) {
        return (
            <div className="text-center mt-50 min-h-screen">
                <h1>404 - Page Not Found</h1>
                <p>The page you&apos;re looking for does not exist.</p>
            </div>
        )
    }
    */

    return (
        <div className="flex">
            <div className="flex flex-col items-center w-96 border-r-2">
                <div className="p-4 text-center border-b-2">
                    Projects tab
                </div>
            </div>
            <div className="flex items-center justify-center w-full mt-16">
                <div className="m-16">
                    <div>
                        <div className="flex justify-between">
                            <div>
                                <p>Project name - {params.get('id')}</p>
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
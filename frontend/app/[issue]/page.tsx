"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col items-center w-96 relative border-r-2">
                <div className="w-full p-4 text-center border-b-2">
                    Projects tab
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <div>
                    <div>
                        <p>Project name - {}</p>
                        <h1>Issue name</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
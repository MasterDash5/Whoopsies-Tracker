<<<<<<< Updated upstream
import Image from "next/image";
=======
"use client";
import { useEffect } from "react";
import NewProjectForm from "@/app/Components/newProjectForm";
import Button from "@/app/Components/button";

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
>>>>>>> Stashed changes


export default function Home() {
<<<<<<< Updated upstream
=======
  useEffect(() => {}, []);
  function submitProject() {
        /*submit data to backend*/

  }
  function submitIssue() {
        /*submit data to backend*/

  }

  const projects: Project[] = [];

>>>>>>> Stashed changes
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
<<<<<<< Updated upstream
      </main>
=======

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
                  Put selected project tab here to send to backend

                  <input name="issueName" type="text" placeholder="Issue Name" />
                  <input name="issueDescription" type="text" placeholder="New Issue Description" />


                  id, timestamp, timestamp for resolved, description, project
                  <button title={"Submit Issue"} className="p-4 rounded-full bottom-4 border-2 w-44" type={"submit"}>Submit Issue</button>
              </form>
          </div>
        )}
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

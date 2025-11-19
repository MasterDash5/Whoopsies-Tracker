"use client";
import Image from "next/image";
import { useEffect } from "react";

type Project = {
  id: number;
  name: string;
};

const mockdata = {
  1: "Project 1",
  2: "Project 2",
  3: "Project 3",
}



export default function Home() {
  useEffect(() => {
    
  })
  const projects: Project[] = [];

  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex flex-col items-center max-h-full w-1/3 bg-[#0a0a0a] relative">
        <div className="bg-black w-full p-4">Projects tab</div>

        <div className="flex flex-col items-center gap-5 mt-6">
          {Object.entries(mockdata).map(([id, name]) => (
            <button key={id} className="p-4 bg-black/30">
              {name}
            </button>
          ))}
        </div>
        
          <button className="p-4 rounded-full bg-white/10 absolute bottom-4">
            Create Project
          </button>
      </div>




      <div className="flex flex-col items-center justify-center max-h-full w-2/3 dark-purple-bg">
          {
            projects && (
              <div className="backdrop-blur-2xl bg-black p-4 border rounded-2xl border-black">
                No projects Created
              </div>
            )
          } 
      </div> 
    </div>
  );
}

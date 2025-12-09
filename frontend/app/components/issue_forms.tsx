"use client";
import { useEffect, useState } from "react";
import { addIssue, getIssues } from "@/app/lib/issues";

type IssueFormsProps = {
    currentProject: any;
    setIssues: any;
  };
  

  const IssueForms: React.FC<IssueFormsProps> = ({ currentProject, setIssues }) => {
    const [issueName, setIssueName] = useState("");
    const [issueDescription, setIssueDescription] = useState("");
    const [issueCommit, setIssueCommit] = useState("");
    const [empty, setEmpty] = useState(false);


    async function handleCreateIssue() {
    if(issueName === "" || issueDescription === "" || issueCommit === "") {
        setEmpty(true);
        return
    };
    setEmpty(false);
    await addIssue({
        project_id: currentProject!.id??0,
        title: issueName,
        description: issueDescription,
        commit: issueCommit,
    });
    const updated = await getIssues((currentProject!.id??"").toString());
    setIssues(updated);
    setIssueName("");
    setIssueDescription("");
    setIssueCommit("");
    }

    return (
        <div className="bg-zinc-800 rounded-lg p-6 mb-8">
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
            className="p-3 bg-lime-400 text-black font-medium rounded-lg hover:bg-lime-200 transition"
          >
            Submit
          </button>
          {empty && (
            <p className="text-sm text-rose-400 mt-3">Please fill in all the fields</p>
          )}
        </div>
      </div>
    );
}

export default IssueForms
export type Issue = {
    id?: number;
    project_id: number;
    created_at?: string;
    resolved_at?: string;
    status?: string;
    title: string;
    description: string;
    commit: string;
}

export async function addIssue(issues: Issue): Promise<void> {
    fetch('http://localhost:3000/issue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(issues)
    });
}


export async function updateIssue(issues: Issue): Promise<void> {
    fetch('http://localhost:3000/issues', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(issues)
    });
    
}

export async function getIssues(project_id: string): Promise<Issue[]> {
    const response = await fetch(`http://localhost:3000/issues/${project_id}`);
    return await response.json();
}

export async function getIssue(id: string): Promise<Issue> {
    const response = await fetch(`http://localhost:3000/issue/${id}`);
    return await response.json();
}

export type Project = {
    name: string;
    id?: number
}

export async function addProject(name: string): Promise<void> {
    await fetch('http://localhost:3000/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });
}

export async function getProjects(): Promise<Project[]> {
    const response = await fetch('http://localhost:3000/projects');
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data;
}

export async function getProject(id: string): Promise<Project> {
    const response = await fetch(`localhost:3000/project/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data;
}

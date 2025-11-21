
type Project = {
    name: string;
    id?: number
}

export async function addProject(project: Project): Promise<void> {
    await fetch('/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    });
}

export async function getProjects(): Promise<Project[]> {
    const response = await fetch('/projects');
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data;
}

export async function getProject(id: string): Promise<Project[]> {
    const response = await fetch(`/projects/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data;
}

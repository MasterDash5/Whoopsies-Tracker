import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs';

export interface Project {
    id: number;
    name: string;
}

export interface Issue {
    id: number;
    project_id: number;
    created_at: number;
    resolved_at: number;
    status: number;
    title: string;
    description: string;
    commit: string;
}

const supabase_url: string = "https://mcotpbfsourpwfcsnddo.supabase.co";
const supabase_key: string = readFileSync("supabase.key", "utf-8");
const supabase: SupabaseClient = createClient(supabase_url, supabase_key);

export async function getProjects(): Promise<Project[]> {
    const { data, error } = await supabase.from('project').select('id,name');

    if (error) throw error;

    return data;
}

export async function getProject(id: string): Promise<Project> {
    const { data, error } = await supabase.from('project').select('id,name').eq('id', id).single();

    if (error) throw error;
    
    return data;
}

export async function addProject(project: Project): Promise<void> {
    delete project.id;
    await supabase.from('project').insert(project);
}

export async function setProject(project: Project): Promise<void> {
    await supabase.from('project').update(project);
}

export async function getIssues(project_id: string): Promise<Issue[]> {
    const { data, error } = await supabase.from('issue')
        .select('id,project_id,created_at,resolved_at,status,title,description,commit')
        .eq('project_id', project_id);

    if (error) throw error;

    return data;
}

export async function getIssue(id: string): Promise<Issue> {
    const { data, error } = await supabase.from('issue')
        .select('id,project_id,created_at,resolved_at,status,title,description,commit')
        .eq('id', id).single();
    
    if (error) throw error;

    return data;
}

export async function addIssue(issue: Issue): Promise<void> {
    delete issue.id;
    delete issue.created_at;
    await supabase.from('issue').insert(issue);
}

export async function setIssue(issue: Issue): Promise<void> {
    delete issue.created_at;
    await supabase.from('issue').update(issue);
}
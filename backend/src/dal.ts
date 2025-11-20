import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs';

interface Project {
    id: number;
    name: string;
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

    console.log("no error")

    return data;
}

export async function addProject(name: string): Promise<void> {
    await supabase.from('project').insert({ name: name })
}
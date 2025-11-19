import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs';
import { Database } from './database'

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
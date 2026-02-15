import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fbaayqvyevfjanprbyld.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiYWF5cXZ5ZXZmamFucHJieWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNDM4NzAsImV4cCI6MjA4NjcxOTg3MH0.y-fvTrYWO3-9oH_tUhn2EtfkI1r9QnD2cs-zbwGrFw0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

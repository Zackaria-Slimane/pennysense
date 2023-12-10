import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

const options = {
	// db: {
	// 	schema: "public",
	// },
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
	},
};
const supabase = createClient(supabaseUrl, supabaseKey, options);

console.log("Supabase client created !.");
export default supabase;

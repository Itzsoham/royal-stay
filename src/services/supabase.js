import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vfkhynscppbjcoojbqmt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZma2h5bnNjcHBiamNvb2picW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3MTE0NDUsImV4cCI6MjA0NDI4NzQ0NX0.pDgR-Ukw9jV5t59XC3LGIZ3ekONT7yScZefZRFj3H9E";

// it's safe since I allow row-level security in supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

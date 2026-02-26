import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://etjrqiewowejvlxhresc.supabase.co";
const supabaseKey = "sb_publishable_52Yx1ve4I6FdrHryAWZRFw_6upxllna";

export const supabase = createClient(supabaseUrl, supabaseKey);
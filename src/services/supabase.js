import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zueddigzbsuhxudxhluy.supabase.co";

const SUPABASE_KEY = "sb_publishable_OdVH7OvixwXO4y8pfnS86w_diQG_abP";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
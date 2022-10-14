import { User } from '@supabase/supabase-js';
import type { CompatibilityEvent } from 'h3';
export declare const serverSupabaseUser: (event: CompatibilityEvent) => Promise<User>;

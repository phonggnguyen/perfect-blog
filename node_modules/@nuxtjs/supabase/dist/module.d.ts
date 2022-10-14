import * as _nuxt_schema from '@nuxt/schema';
import { SupabaseClientOptions, CookieOptions } from '@supabase/supabase-js';

interface ModuleOptions {
    /**
     * Supabase API URL
     * @default process.env.SUPABASE_URL
     * @example 'https://*.supabase.co'
     * @type string
     * @docs https://supabase.com/docs/reference/javascript/initializing#parameters
     */
    url: string;
    /**
     * Supabase Client API Key
     * @default process.env.SUPABASE_KEY
     * @example '123456789'
     * @type string
     * @docs https://supabase.com/docs/reference/javascript/initializing#parameters
     */
    key: string;
    /**
     * Supabase Service key
     * @default process.env.SUPABASE_SERVICE_KEY
     * @example '123456789'
     * @type string
     * @docs https://supabase.com/docs/reference/javascript/initializing#parameters
     */
    serviceKey: string;
    /**
     * Supabase Client options
     * @default {}
     * @type object
     * @docs https://supabase.com/docs/reference/javascript/initializing#parameters
     */
    client?: SupabaseClientOptions;
    /**
     * Supabase Client options
     * @default {
        name: 'sb',
        lifetime: 60 * 60 * 8,
        domain: '',
        path: '/',
        sameSite: 'lax'
      }
     * @type object
     * @docs https://supabase.com/docs/reference/javascript/initializing#parameters
     */
    cookies?: CookieOptions;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

export { ModuleOptions, _default as default };

import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

// ブラウザーで使うクライアント。アカウントの作成とログインに使う。
export function createClient() {
  return createBrowserClient(supabaseEnv.url, supabaseEnv.publishableKey);
}

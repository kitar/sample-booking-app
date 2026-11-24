import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { supabaseEnv } from "./env";

// ログイン中の利用者を確かめるためのクライアント
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseEnv.url, supabaseEnv.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Component から呼ばれた場合は書き込めない。
          // セッションの更新は proxy.ts で行う。
        }
      },
    },
  });
}

// 予約と社員のデータを読み書きするためのクライアント
export function createDataClient() {
  return createSupabaseClient(supabaseEnv.url, supabaseEnv.secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ログイン中の利用者のIDを返す。ログインしていなければ null
export async function getUserId(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return data?.claims?.sub ?? null;
}

// 社員として登録されている利用者か
export async function isStaff(userId: string): Promise<boolean> {
  const supabase = createDataClient();
  const { data } = await supabase
    .from("staff")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return data !== null;
}

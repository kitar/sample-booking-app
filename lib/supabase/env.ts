export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  secretKey: process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!,
};

// 設定漏れに早く気づけるように、読み込んだ時点で確かめる
for (const [name, value] of Object.entries(supabaseEnv)) {
  if (!value) {
    throw new Error(`Supabaseの環境変数（${name}）が設定されていません。`);
  }
}

import { getUserId } from "@/lib/supabase/server";
import { AuthForm } from "./auth-form";

export default async function Home() {
  const userId = await getUserId();

  return (
    <div>
      <h1>相談のご予約</h1>
      <p>家づくりやリフォームのご相談を、こちらから予約できます。</p>
      {userId ? (
        <p>ログインしています。</p>
      ) : (
        <>
          <p>予約するには、ログインしてください。</p>
          <AuthForm />
        </>
      )}
    </div>
  );
}

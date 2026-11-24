"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signIn() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage("ログインできませんでした。");
      return;
    }
    router.refresh();
  }

  async function signUp() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage("アカウントを作れませんでした。");
      return;
    }
    if (data.session) {
      router.refresh();
      return;
    }
    setMessage("確認のメールを送りました。メールのリンクを開いてから、ログインしてください。");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // 押されたボタンで、ログインかアカウントの作成かを分ける
        const submitter = (e.nativeEvent as SubmitEvent).submitter;
        if (submitter?.getAttribute("value") === "signup") {
          signUp();
        } else {
          signIn();
        }
      }}
    >
      <label>
        メールアドレス
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        パスワード
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div>
        <button type="submit">
          ログイン
        </button>{" "}
        <button type="submit" value="signup">
          アカウントを作る
        </button>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
}

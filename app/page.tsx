import Link from "next/link";
import { getUserId } from "@/lib/supabase/server";
import { AuthForm } from "./auth-form";
import { BookingForm } from "./booking-form";

export default async function Home() {
  const userId = await getUserId();

  return (
    <div>
      <h1>相談のご予約</h1>
      <p>家づくりやリフォームのご相談を、こちらから予約できます。</p>
      {userId ? (
        <>
          <BookingForm />
          <p>
            <Link href="/bookings">自分の予約を見る</Link>
          </p>
        </>
      ) : (
        <>
          <p>予約するには、ログインしてください。</p>
          <AuthForm />
        </>
      )}
    </div>
  );
}

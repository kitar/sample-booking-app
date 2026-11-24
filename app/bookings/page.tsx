import Link from "next/link";
import { redirect } from "next/navigation";
import { createDataClient, getUserId } from "@/lib/supabase/server";

export default async function MyBookings() {
  const userId = await getUserId();
  if (!userId) {
    redirect("/");
  }

  const supabase = createDataClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1>自分の予約</h1>
      {bookings && bookings.length > 0 ? (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              <Link href={`/bookings/${b.id}`}>
                {new Date(b.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })} の予約
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>予約はまだありません。</p>
      )}
      <p>
        <Link href="/">新しく予約する</Link>
      </p>
    </div>
  );
}

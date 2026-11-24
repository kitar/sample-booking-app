import { notFound } from "next/navigation";
import { createDataClient, getUserId, isStaff } from "@/lib/supabase/server";

export default async function Admin() {
  const userId = await getUserId();
  if (!userId || !(await isStaff(userId))) {
    notFound();
  }

  const supabase = createDataClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, name, phone, address, content, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1>予約の一覧（社員用）</h1>
      <p>
        <a href="/api/admin/export">CSVで書き出す</a>
      </p>
      <table>
        <thead>
          <tr>
            <th>番号</th>
            <th>受付日時</th>
            <th>氏名</th>
            <th>電話番号</th>
            <th>住所</th>
            <th>相談内容</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{new Date(b.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</td>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.address}</td>
              <td style={{ whiteSpace: "pre-wrap" }}>{b.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

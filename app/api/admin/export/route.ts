import Papa from "papaparse";
import { NextResponse } from "next/server";
import { createDataClient, getUserId } from "@/lib/supabase/server";

// 表計算ソフトで開いたときに、式として扱われないようにする
function escapeCell(value: string): string {
  return /^[=+\-@\t\r＝＋－＠]/.test(value) ? `'${value}` : value;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "ログインしてください。" }, { status: 401 });
  }

  const supabase = createDataClient();
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("id, name, phone, address, content, created_at")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: "書き出せませんでした。" }, { status: 500 });
  }

  const csv = Papa.unparse({
    fields: ["番号", "受付日時", "氏名", "電話番号", "住所", "相談内容"],
    data: bookings.map((b) => [
      String(b.id),
      new Date(b.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
      escapeCell(b.name),
      escapeCell(b.phone),
      escapeCell(b.address),
      escapeCell(b.content),
    ]),
  });

  return new NextResponse("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="bookings.csv"',
    },
  });
}

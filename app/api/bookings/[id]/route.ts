import { NextResponse } from "next/server";
import { createDataClient, getUserId } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "ログインしてください。" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createDataClient();
  const { data: booking } = await supabase
    .from("bookings")
    .select("id, name, phone, address, content, created_at")
    .eq("id", id)
    .maybeSingle();

  if (!booking) {
    return NextResponse.json({ error: "予約が見つかりません。" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

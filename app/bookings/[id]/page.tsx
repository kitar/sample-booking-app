"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Booking = {
  id: number;
  name: string;
  phone: string;
  address: string;
  content: string;
  created_at: string;
};

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [message, setMessage] = useState("読み込んでいます。");

  useEffect(() => {
    fetch(`/api/bookings/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          setMessage("予約を表示できませんでした。");
          return;
        }
        setBooking(await res.json());
      })
      .catch(() => setMessage("予約を表示できませんでした。"));
  }, [id]);

  return (
    <div>
      <h1>予約の詳細</h1>
      {booking ? (
        <dl>
          <dt>受付日時</dt>
          <dd>{new Date(booking.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</dd>
          <dt>氏名</dt>
          <dd>{booking.name}</dd>
          <dt>電話番号</dt>
          <dd>{booking.phone}</dd>
          <dt>住所</dt>
          <dd>{booking.address}</dd>
          <dt>相談内容</dt>
          <dd style={{ whiteSpace: "pre-wrap" }}>{booking.content}</dd>
        </dl>
      ) : (
        <p>{message}</p>
      )}
      <p>
        <Link href="/bookings">自分の予約に戻る</Link>
      </p>
    </div>
  );
}

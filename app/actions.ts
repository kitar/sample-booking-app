"use server";

import { redirect } from "next/navigation";
import validator from "validator";
import { createDataClient, getUserId } from "@/lib/supabase/server";

export type BookingFormState = {
  error: string;
  values?: { name: string; phone: string; address: string; content: string };
} | null;

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function createBooking(
  _prev: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const userId = await getUserId();
  if (!userId) {
    return { error: "ログインしてください。" };
  }

  const name = field(formData, "name");
  const phone = field(formData, "phone");
  const address = field(formData, "address");
  const content = field(formData, "content");
  const values = { name, phone, address, content };

  if (!validator.isLength(name, { min: 1, max: 50 })) {
    return { error: "氏名は50文字以内で入力してください。", values };
  }
  if (!/^[0-9-]{10,13}$/.test(phone)) {
    return { error: "電話番号は数字とハイフンで入力してください。", values };
  }
  if (!validator.isLength(address, { min: 1, max: 200 })) {
    return { error: "住所は200文字以内で入力してください。", values };
  }
  if (!validator.isLength(content, { min: 1, max: 1000 })) {
    return { error: "相談内容は1000文字以内で入力してください。", values };
  }

  const supabase = createDataClient();
  const { error } = await supabase
    .from("bookings")
    .insert({ user_id: userId, ...values });
  if (error) {
    return { error: "予約を保存できませんでした。", values };
  }

  redirect("/bookings");
}

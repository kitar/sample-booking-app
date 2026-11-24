"use client";

import { useActionState } from "react";
import { createBooking } from "./actions";

export function BookingForm() {
  const [state, formAction, pending] = useActionState(createBooking, null);

  return (
    <form action={formAction}>
      <label>
        氏名
        <input name="name" defaultValue={state?.values?.name} required />
      </label>
      <label>
        電話番号
        <input name="phone" defaultValue={state?.values?.phone} type="tel" placeholder="090-0000-0000" required />
      </label>
      <label>
        住所
        <input name="address" defaultValue={state?.values?.address} required />
      </label>
      <label>
        相談内容
        <textarea name="content" defaultValue={state?.values?.content} rows={5} required />
      </label>
      <button type="submit" disabled={pending}>
        予約する
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

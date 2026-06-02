import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

export default function HomePage() {
  redirect(`/c/${randomUUID()}`);
}

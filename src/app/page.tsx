import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function RootPage() {
  // Redirect to default locale
  redirect(`/${routing.defaultLocale}`);

  // This return is required but will never be reached
  return null;
}

import { redirect } from "next/navigation";
import DBPage from "@/components/DBPage";
import { getServerSession } from "next-auth";
import {authOptions} from "../../server/auth";

export default async function DatabasePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return <DBPage />;
}

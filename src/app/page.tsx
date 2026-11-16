import { Suspense } from "react";
import { getSession } from "@/lib/getSession";
import HomeClient from "./Components/HomeClient";

const HomeContent = async () => {
  const session = await getSession();
  return <HomeClient email={session?.user?.email ?? ""} />;
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HomeContent />
    </Suspense>
  );
}
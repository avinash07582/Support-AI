
import React, { Suspense } from "react";
import HomeClient from "./Components/HomeClient";
import { getSession } from "@/lib/getSession";

const HomeContent = async () => {
  const session = await getSession();

  return (
    <HomeClient email={session?.user?.email ?? ""} />
  );
};

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

export default Home;

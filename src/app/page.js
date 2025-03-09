"use client";
import useThemeColor from "../hooks/useThemeColor";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { primary, secondary } = useThemeColor();
  useEffect(() => {
    router.push("/auth");
  }, []);
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
    </main>
  );
}

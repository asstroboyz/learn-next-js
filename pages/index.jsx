// pages/index.jsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page 
    router.push("/auth/login");
  }, [router]);

  return null; // Render nothing while redirecting
}

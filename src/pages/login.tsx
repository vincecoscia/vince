import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => signIn("github")}
        className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        <FaGithub />
        Sign in with GitHub
      </button>
    </div>
  );
}
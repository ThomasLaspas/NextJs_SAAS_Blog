"use client";
import { FaGithub } from "react-icons/fa";
import { createBrowserClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
const GitHubLoginButton = () => {
  const loginWithGitHub = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    try {
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Sign-in error:", (error as Error).message);
      } else {
        console.log("Sign-in success:", data);
        // Handle redirection after successful sign-in if needed
        redirect("/api/callback2");
      }
    } catch (error) {
      console.error("Sign-in error:", (error as Error).message);
    }
  };

  return (
    <Button
      className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mt-2 mb-2 w-full flex items-center gap-4"
      onClick={loginWithGitHub}
    >
      Sign in with GitHub
      <FaGithub />
    </Button>
  );
};

export default GitHubLoginButton;

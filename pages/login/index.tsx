import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const Router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      Router.push("/");
    }
  }, [session]);

  const path = (Router.query.refId as string) || "";

  return !session ? (
    <>
      Not signed in <br />
      <button
        onClick={() =>
          signIn(
            "github",
            { callbackUrl: "http://localhost:3000" },
            {
              path: path,
            }
          )
        }
      >
        Sign in
      </button>
    </>
  ) : (
    ""
  );
}

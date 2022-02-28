import { useSession, signIn, signOut } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

export default function Component() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      Router.push("/login");
    }
  }, [session]);

  return session ? (
    <div>
      <div>Signed in</div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  ) : (
    ""
  );
}

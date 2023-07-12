import React, { ReactElement, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { User } from "@prisma/client";

import { CircularProgress } from "@mui/material";

type Props = {
  children: ({ user }: { user: User }) => ReactElement;
};

export default function AuthenticatedPage({ children }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session, status);
    if (status === "unauthenticated") {
      router.replace("/sign-in");
    }
    if (status === "authenticated" && !session?.user.input) {
      router.replace("/form");
    }
  }, [status]);

  if (!session?.user?.input) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <CircularProgress className="!w-1/12" />
      </div>
    );
  }

  return children({ user: session.user });
}

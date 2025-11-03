"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function TestUser() {

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.getUsers.queryOptions());
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
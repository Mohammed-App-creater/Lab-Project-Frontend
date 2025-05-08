"use client";

import { GroupComponent } from "@/components/divisions/divisionsProfile";
import { use } from "react";

function Page({ params }: { params: Promise<{ division: string }> }) {
  const { division} = use(params);
  return (
    <div>
      <GroupComponent divisionId={division} />
    </div>
  );
}

export default Page;

import { LoadingSpinner } from "@/components/global/login/loading";
import { UserInitializer } from "@/components/member/user-initializer";
import { Suspense } from "react";

export default async function ProfileLayout({
  header,
  sidebar,
  main,
  params,
}: {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  main: React.ReactNode;
  params: Promise<{ profile: string }>;
}) {
    const { profile } = await params;
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><LoadingSpinner fullPage={false} /></div>}>
      {/* Initialize Zustand store in client */}

      <UserInitializer userId={profile} />

      <div className="flex flex-col min-h-screen">
        <div>{header}</div>
        <div className="flex flex-1">
          <aside className="w-64">{sidebar}</aside>
          <main className="flex-1 p-4 overflow-y-auto">{main}</main>
        </div>
      </div>
    </Suspense>
  );
}

'use client'
import { LoadingSpinner } from "@/components/global/login/loading";
import { UserInitializer } from "@/components/profile/user-initializer";
import { Suspense } from "react";

export default function ProfileLayout({
  header,
  sidebar,
  main,
}: {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  main: React.ReactNode;
}) {
    const user = (localStorage.getItem("user")) 
    const id = JSON.parse(user || '{"id": ""}').id || " ";
    
  return (
    <Suspense fallback={<LoadingSpinner fullPage={false} />}>
      {/* Initialize Zustand store in client */}

      <UserInitializer userId={id} />

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

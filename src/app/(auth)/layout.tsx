import { LoadingSpinner } from "@/components/global/login/loading";
import { ReactNode, Suspense } from "react";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - CSEC ASTU Portal",
  description: "Login to the CSEC ASTU Portal",
}


interface props {
  children: ReactNode;
}

export default function LoginLayout({ children }: props) {
  return (
    <>
      <Suspense fallback={<LoadingSpinner fullPage={true} />}>
        {children}
      </Suspense>
      ;
    </>
  );
}

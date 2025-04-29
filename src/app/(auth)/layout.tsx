import { LoadingSpinner } from "@/components/global/login/loading";
import { ReactNode, Suspense } from "react";

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

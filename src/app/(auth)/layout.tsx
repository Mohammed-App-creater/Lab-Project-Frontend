// import { ReactNode } from "react";

// interface props {
//     children: ReactNode;
// }

// export default function LoginLayout({children}: props) {
//     return (
//         <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//     )
// }
import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - CSEC ASTU Portal",
  description: "Login to the CSEC ASTU Portal",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

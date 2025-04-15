import { ReactNode } from "react";

interface props {
    children: ReactNode;
}

export default function LoginLayout({children}: props) {
    return (
        <html lang="en">
      <body>
        {children}
      </body>
    </html>
    )
}
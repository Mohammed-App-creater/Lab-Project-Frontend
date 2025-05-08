// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { transformApiData } from "@/lib/session-utils";

// import { SessionCalendar, SessionData } from "@/components/session/session-calendar";
// import { LoadingSpinner } from "@/components/global/login/loading";


  

// export default function SessionsPage() {
//   const [sessionData, setSessionData] = useState<SessionData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);


//   useEffect(() => {
//     async function fetchSessionData() {
//       try {
//         const apiUrl = `${process.env.NEXT_PUBLIC_BACK_END_URL}api/session/sessions?limit=10&page=1`

//         const response = await fetch(apiUrl);

//         if (!response.ok) {
//           throw new Error(`Failed to fetch session data: ${response.status}`);
//         }

//         const data = await response.json();
//         const transformedData = transformApiData(data);
//         setSessionData(transformedData);
//       } catch (err) {
//         console.error("Error fetching sessions:", err);
//         setError(
//           err instanceof Error
//             ? err.message
//             : "An error occurred while fetching sessions"
//         );
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSessionData();
//   }, []);


//   return (
//     <div className="container h-screen py-2.5 ">
//       <Suspense fallback={<LoadingSpinner fullPage={false} />}>
//       <SessionCalendar data={sessionData} isLoading={loading} error={error} />
//       </Suspense>

//     </div>
//   );
// }

"use client";

import { Suspense, useEffect, useState } from "react";
import { transformApiData } from "@/lib/session-utils";

import { SessionCalendar, SessionData } from "@/components/session/session-calendar";
import { LoadingSpinner } from "@/components/global/login/loading";

export default function SessionsPage() {
  const [sessionData, setSessionData] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSessionData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACK_END_URL}api/session/sessions?limit=10&page=1`

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch session data: ${response.status}`);
        }

        const data = await response.json();
        const transformedData = transformApiData(data);
        setSessionData(transformedData);
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching sessions"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSessionData();
  }, []);

  return (
    <div className="container w-full">
      <Suspense fallback={<LoadingSpinner fullPage={false} />}>
        <SessionCalendar data={sessionData} isLoading={loading} error={error} />
      </Suspense>
    </div>
  );
}
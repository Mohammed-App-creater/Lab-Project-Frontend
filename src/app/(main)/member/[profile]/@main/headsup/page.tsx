"use client";

import { use } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/global/login/loading";
import { fetchHeadsUpMessages } from "@/api/user";
import { PiCheckCircleFill } from "react-icons/pi";

export default function HeadsUpPage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const paramcontets = use(params);
  const { profile } = paramcontets;
  const {
    data: headsUpMessages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["headsUpMessages", profile],
    queryFn: () => fetchHeadsUpMessages(profile),
  });
  if (isLoading) return <LoadingSpinner fullPage={true} />;

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-4 w-full">
          <div className="flex gap-6 mt-5">
            <div className="flex-1">
              <div className="space-y-4">
                {isLoading && (
                  <div className="p-4 text-gray-500 ">
                    Loading heads-up messages...
                  </div>
                )}
                {!isLoading && error && (
                  <div className="p-4 text-red-500">
                    Error fetching heads-up messages: {String(error)}
                  </div>
                )}
                {!isLoading &&
                  !error &&
                  !Array.isArray(headsUpMessages?.headsUps) && (
                    <div className="p-4 text-gray-500">
                      No heads-up messages available.
                    </div>
                  )}
                {!isLoading &&
                  !error &&
                  Array.isArray(headsUpMessages?.headsUps) &&
                  (headsUpMessages?.headsUps.length === 0 ? (
                    <div className="p-4 text-gray-500">
                      No heads-up messages available.
                    </div>
                  ) : (
                    headsUpMessages?.headsUps.map((message) => (
                      <Card
                        key={message.id}
                        className="p-4 border-l-4 rounded-sm border-l-blue-900"
                      >
                        <div className="flex flex-col items-start gap-2">
                          <div className="flex  items-center gap-4 ">
                            <div className=" p-1 border border-blue-200 rounded-sm bg-blue-100 ">
                              <PiCheckCircleFill
                                className="text-blue-900"
                                size={14}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">
                                  {message?.type || "A Quick Heads-Up"}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs"
                                >
                                  {message?.sentAt
                                    ? format(message.sentAt, "MMM dd, yyyy")
                                    : "Unknown Date"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                            <p className="text-gray-700  ml-10">
                              {message.body}
                            </p>
                        </div>
                      </Card>
                    ))
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

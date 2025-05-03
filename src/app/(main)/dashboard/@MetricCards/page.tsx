
import MetricCardsClient from "@/components/dashboard/dashboardCards";
import MetricCardsLoading from "@/components/dashboard/MetricCardsLoading";
import { Suspense } from 'react';

export default function MetricCards() {
  return (
    <>
      <Suspense fallback={<MetricCardsLoading />}>
        <MetricCardsClient/>
      </Suspense>
    </>
  );
}





import { Suspense } from 'react';
import { MetricCards as MetricCard } from '@/components/dashboard/dashboardCards'



export default function MetricCards() {
  return (
    <>
      <Suspense fallback={<MetricCardsLoading />}>
        <MetricCardsClient/>
      </Suspense>
    </>
  );
}



 
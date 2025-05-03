
import { Suspense } from 'react';
import {  MetricCards as MetricCard } from '@/components/dashboard/dashboardCards'
import { LoadingSpinner } from '@/components/global/login/loading';



export default function MetricCards() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner  />}>
          <MetricCard />
      </Suspense>
    </>
  );
}



 
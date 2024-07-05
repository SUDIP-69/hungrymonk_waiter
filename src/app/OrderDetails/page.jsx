import React, { Suspense } from 'react';
import OrderDetailsComponent from './OrderDetailsComponent';
import LoadingPage from '../Components/LoadingPage';

function Page() {
  return (
    <Suspense fallback={<div><LoadingPage/></div>}>
      <OrderDetailsComponent  />
    </Suspense>
  );
}

export default Page;
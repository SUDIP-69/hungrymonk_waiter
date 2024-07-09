import React, { Suspense } from 'react';
import LoadingPage from '../Components/LoadingPage';
import ViewOrder from './ViewOrder';



function Page() {
  return (
    <Suspense fallback={<div><LoadingPage/></div>}>
      <ViewOrder/>
      

    </Suspense>
  );
}

export default Page;
'use client';
import React from 'react'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressBarProvider({ children }:{children:React.ReactNode}) {
  return (
      <>
        {children}
        <ProgressBar
          height="4px"
          color="#ff0000"
          options={{ showSpinner: false }}
          shallowRouting
        />
     </>
  );
}

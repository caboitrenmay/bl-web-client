import React, { ReactNode } from 'react';
import { GrowingFullSpinner } from './Spinner';

interface Props {
  loaded: boolean;
  children: ReactNode;
}

export default function AppWrapper(props: Props) {
  const { loaded } = props;
  console.log('==> loaded DONE: ', loaded);
  return (
    <>
      {loaded ? null : (
        <div className="fixed-loading">
          <GrowingFullSpinner />
        </div>
      )}
      <div>{props.children}</div>
    </>
  );
}

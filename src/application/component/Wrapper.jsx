import React from 'react';
import {GrowingFullSpinner} from './Util';

export default function Wrapper(props) {
  const {done} = props;
  console.log('==> DONE: ', done);
  return (
    <>
      {done ? null : (
        <div className="fixed-loading">
          <GrowingFullSpinner />
        </div>
      )}
      <div>{props.children}</div>
    </>
  );
}

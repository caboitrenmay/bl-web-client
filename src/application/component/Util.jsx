import React from 'react';

export const loading = done => (
  <div className="lds-ellipsis" hidden={done}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

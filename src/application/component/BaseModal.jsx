import React, {useEffect, useRef, useState} from 'react';
import {GrowingFullSpinner} from './Util';

export function BaseModal(props) {
  return (
    <div className="modal-dialog modal-lg modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {props.title || 'Modal title'}
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button
            hidden={true}
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal">
            {props.cancel || 'Close'}
          </button>
          {props.loading && (
            <div className="mx-auto">
              <GrowingFullSpinner />
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal">
            {props.ok || 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function NewsModal({title, link}) {
  const iframe = useRef(null);
  const [loading, setLoading] = useState(true);
  const body = <iframe src={link} className="news-iframe" ref={iframe} />;

  useEffect(() => {
    console.log('useEffect');
    if (iframe.current) {
      iframe.current.addEventListener('load', () => {
        console.error('iframe loaded');
        setLoading(false);
      });
    }
  }, [link]);

  return (
    <div
      className="modal fade"
      id="newsModal"
      tabIndex="-1"
      aria-labelledby="newsModal"
      aria-hidden="true">
      <BaseModal title={title} loading={loading}>
        {body}
      </BaseModal>
    </div>
  );
}

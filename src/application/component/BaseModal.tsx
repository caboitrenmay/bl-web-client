import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { NewsItems } from '../../domain';
import { GrowingFullSpinner } from './Spinner';

interface Props {
  title?: string;
  loading: boolean;
  link?: string;
  ok?: string;
  children?: ReactNode;
}

export function BaseModal(props: Props) {
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
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          {props.loading && (
            <div className="mx-auto">
              <GrowingFullSpinner />
            </div>
          )}
          <a
            className="btn btn-secondary"
            href={props.link}
            target="_blank"
            rel="noreferrer"
          >
            {/* <span className="glyphicon glyphicon-new-window"></span> */}
            <img src="https://img.icons8.com/material-rounded/24/000000/open-in-browser.png" />
          </a>
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
          >
            {props.ok || 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function NewsModal({ title, link }: NewsItems) {
  const iframe = useRef(null);
  const [loading, setLoading] = useState(true);
  const body = <iframe src={link} className="news-iframe" ref={iframe} />;

  useEffect(() => {
    console.log('useEffect');
    if (iframe.current) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (iframe.current! as HTMLIFrameElement).addEventListener('load', () => {
        setLoading(false);
      });
    }
  }, [link]);

  return (
    <div
      className="modal fade"
      id="newsModal"
      aria-labelledby="newsModal"
      aria-hidden="true"
    >
      <BaseModal title={title} loading={loading} link={link}>
        {body}
      </BaseModal>
    </div>
  );
}

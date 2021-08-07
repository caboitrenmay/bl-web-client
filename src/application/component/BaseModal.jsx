import React from 'react';

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
  const body = <iframe src={link} className="news-iframe" />;

  return (
    <div
      className="modal fade"
      id="newsModal"
      tabIndex="-1"
      aria-labelledby="newsModal"
      aria-hidden="true">
      <BaseModal title={title}>{body}</BaseModal>
    </div>
  );
}

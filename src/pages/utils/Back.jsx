import React from 'react';
import PropTypes from 'prop-types';

const Back = ({ className, Links, WithTopIndent }) => {
  const breadcrumbsClass = classnames('breadcrumbs', className, { 'breadcrumbs--top-indent': WithTopIndent });
  const lastLink = Links[Links?.length - 1];

  return (
    <nav className={breadcrumbsClass}>
      <div className="breadcrumbs__container">
        <a href={lastLink.Url} className="breadcrumbs__back">
          <i className="breadcrumbs__carret-icon"><CarretIcon /></i>
          <span className="breadcrumbs__back-label">{lastLink.Label}</span>
        </a>
      </div>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  className: PropTypes.string,
  Links: PropTypes.array,
  WithTopIndent: PropTypes.bool
};

export default Breadcrumbs;
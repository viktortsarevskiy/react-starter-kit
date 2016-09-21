/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../actions/route';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {

  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,

    // actions
    navigate: PropTypes.func,
  };

  static contextTypes = {
    createHref: PropTypes.func.isRequired,
  };

  handleClick = (event) => {
    let allowTransition = true;

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      allowTransition = false;
    }

    event.preventDefault();

    if (allowTransition) {
      if (this.props.to) {
        this.props.navigate(`/${this.props.currentLocale}${this.props.to}`);
      } else {
        this.props.navigate({
          pathname: event.currentTarget.pathname,
          search: event.currentTarget.search,
        });
      }
    }
  };

  render() {
    const {
      to,
      navigate, // eslint-disable-line no-unused-vars, no-shadow
      currentLocale, // eslint-disable-line no-unused-vars, no-shadow
      children,
      ...props,
    } = this.props;
    const href = this.context.createHref(`/${currentLocale}${to}`);
    return (
      <a href={href} {...props} onClick={this.handleClick}>
        {children}
      </a>
    );
  }

}

const mapState = state => ({
  currentLocale: state.intl.locale,
});

const mapDispatch = {
  navigate,
};

export default connect(mapState, mapDispatch)(Link);

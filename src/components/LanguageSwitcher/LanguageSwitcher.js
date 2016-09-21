/* eslint-disable no-shadow */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setLocale } from '../../actions/intl';
import { navigate } from '../../actions/route';

function LanguageSwitcher({ currentLocale, availableLocales, setLocale, navigate }) {
  const isSelected = locale => locale === currentLocale;
  return (
    <div>
      {availableLocales.map(locale => (
        <span key={locale}>
          {isSelected(locale) ? (
            <span>{locale}</span>
          ) : (
            <a
              href={``}
              onClick={(e) => {
                setLocale({ locale });
                const withoutTrailingSlash = new RegExp(`^/${currentLocale}$`);
                const withTrailingSlash = new RegExp(`^/${currentLocale}/`);
                let regExp = withoutTrailingSlash;
                let result = `/${locale}`;
                if (!location.pathname.match(withoutTrailingSlash)) {
                  regExp = withTrailingSlash;
                  result = `/${locale}/`;
                }
                navigate(location.pathname.replace(regExp, result));
                e.preventDefault();
              }}
            >{locale}</a>
          )}
          {' '}
        </span>
      ))}
    </div>
  );
}

LanguageSwitcher.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  availableLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLocale: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

export default connect(state => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale
}), {
  setLocale,
  navigate
})(LanguageSwitcher);

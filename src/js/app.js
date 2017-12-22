((app) => {
  // eslint-disable-next-line no-param-reassign
  app.init = () => {
    app.removeAllCookies.init();
  };
})(window.app = window.app || {});

if (document.readyState !== 'loading') {
  window.app.init();
} else {
  document.addEventListener('DOMContentLoaded', window.app.init);
}

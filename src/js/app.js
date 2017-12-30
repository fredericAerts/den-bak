((app) => {
  // eslint-disable-next-line no-param-reassign
  app.init = () => {
    app.datetimepicker.init();
    app.clientForm.init();
    app.adminForm.init();
  };
})(window.app = window.app || {});

if (document.readyState !== 'loading') {
  window.app.init();
} else {
  document.addEventListener('DOMContentLoaded', window.app.init);
}

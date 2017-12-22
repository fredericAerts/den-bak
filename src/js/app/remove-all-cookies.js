((app) => {
  // eslint-disable-next-line no-param-reassign
  app.removeAllCookies = (() => {
    const bodyEl = document.querySelector('body');

    return {
      init,
    };

    function init() {
      if (!bodyEl) {
        return;
      }

      console.log('Hello World!');
    }
  })();
})(window.app = window.app || {});

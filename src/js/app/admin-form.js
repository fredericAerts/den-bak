((app) => {
  // eslint-disable-next-line no-param-reassign
  app.adminForm = (() => {
    const $inputs = $('input[type="radio"]');

    return {
      init,
    };

    function init() {
      if (!$inputs.length) {
        return;
      }

      initChangeHandlers();
    }

    /*  Helpers
        ====================================================================== */
    function initChangeHandlers() {
      $inputs.change((e) => {
        const clientId = $(e.target).closest('[data-client-id]').data('client-id');
        const statusIndex = e.target.dataset.statusIndex;

        $.post( '/', {
          isAdmin: true,
          _id: clientId,
          statusIndex: statusIndex,
        } )
        .done(function(data) {
          if (data === 'nok') {
            alert('Er is een fout opgetreden...');
          }
          else if (data === 'done') {
            const clientName = $(e.target).closest('[data-client-name]').data('client-name');
            alert('Klant ' + clientName + ' afgehandeld!');
          }
          location.reload();
        });
      });
    }
  })();
})(window.app = window.app || {});

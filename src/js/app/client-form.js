((app) => {
  // eslint-disable-next-line no-param-reassign
  app.clientForm = (() => {
    const $datePicker = $('.datepicker');
    const $timePicker = $('.timepicker');
    const $submitButton = $('.js-client-submit');

    return {
      init,
    };

    function init() {
      if (!$datePicker || !$timePicker.length || !$submitButton.length) {
        return;
      }

      initClickHandler();
    }

    /*  Helpers
        ====================================================================== */
    function initClickHandler() {
      $submitButton.click((e) => {
        const date = $datePicker.val();
        const time = $timePicker.val();

        const isValid = validate(date, time);

        if (isValid) {
          $.post( '/', {
            isAdmin: false,
            _id: $('#client-id').val(),
            date: date,
            time: time
          } )
          .done(function( data ) {
            if (data === 'nok') {
              alert('Er is een fout opgetreden...');
            } else {
              alert('Datum en tijdstip doorgegeven!');
            }
            location.reload();
          });
        }
      });
    }

    function validate(date, time) {
      let isValid = true;

      $datePicker.removeClass('invalid');
      $timePicker.removeClass('invalid');

      if (!date) {
        isValid = false;
        $datePicker.addClass('invalid');
      }
      if (!time) {
        isValid = false;
        $timePicker.addClass('invalid');
      }

      return isValid;
    }
  })();
})(window.app = window.app || {});

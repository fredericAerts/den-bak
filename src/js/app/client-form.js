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
        const clientId =$('#client-id').val();
        const date = $datePicker.val();
        const time = $timePicker.val();
        const submitType = e.target.dataset.submitType;

        const isValid = validate(date, time);

        if (submitType === 'submit' && isValid) {
          submitDatetime(clientId, date, time);
        }
        else if (submitType === 'refresh') {
          refreshData(clientId);
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

    function submitDatetime(clientId, date, time) {
      $.post( '/', {
        isAdmin: false,
        _id: clientId,
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

    function refreshData(clientId) {
      $.post( '/', {
        isAdmin: false,
        refresh: true,
        _id: clientId,
      } )
      .done(function( data ) {
        if (data === 'nok') {
          alert('Er is een fout opgetreden...');
        }
        location.reload();
      });
    }
  })();
})(window.app = window.app || {});

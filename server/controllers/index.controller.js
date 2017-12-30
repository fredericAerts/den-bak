const auth = require('basic-auth');
const _ = require('lodash');

const indexController = (ClientModel) => {
  const get = (req, res) => {
    fetchAllClients().then((clients) => {
      const credentials = auth(req);
      const client = _.find(clients, credentials);
      const admin = _.find([{ name: 'admin', pass: 'pass' }], credentials);

      if (!credentials || (!client && !admin)) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="XLjqwZuu"');
        res.end('Access denied');
      } else if (admin) {
        getAdminPage(req, res, clients);
      } else {
        getIndexPage(req, res, client);
      }
    });
  };

  const post = (req, res) => {
    if (req.body.isAdmin === 'true') {
      updateClientStatus(req, res);
    } else if (req.body.refresh === 'true') {
      resetClientData(req, res);
    } else {
      submitClientDatetime(req, res);
    }
  };

  /*  Helper functions
      ================================================================================= */
  function getAdminPage(req, res, clients) {
    res.render('admin', { clients: clients.filter(client => client.statusIndex > 0 && client.statusIndex < 4) });
  }

  function getIndexPage(req, res, client) {
    res.render('index', { client: client });

  }

  function fetchAllClients() {
    return ClientModel.find({}).sort({ name: 1 });
  }

  function resetClientData(req, res) {
    ClientModel.findById(req.body._id, function (err, client) {
      if (err) {
        return res.send('nok');
      }

      const setData = {
        date: undefined,
        time: undefined,
        statusIndex: 0,
      };

      client.set(setData);
      client.save(function (err) {
        if (err) {
          return res.send('nok');
        }

        res.send('ok');
      });
    });
  }

  function submitClientDatetime(req, res) {
    ClientModel.findById(req.body._id, function (err, client) {
      if (err) {
        return res.send('nok');
      }

      const setData = {
        date: req.body.date,
        time: req.body.time,
        statusIndex: 1,
      };

      client.set(setData);
      client.save(function (err) {
        if (err) {
          return res.send('nok');
        }

        res.send('ok');
      });
    });
  }

  function updateClientStatus(req, res) {
    ClientModel.findById(req.body._id, function (err, client) {
      if (err) {
        return res.send('nok');
      }

      const setData = {
        statusIndex: req.body.statusIndex,
      }

      client.set(setData);

      client.save(function (err, client) {
        if (err) {
          return res.send('nok');
        }

        if (client.statusIndex === 4) {
          res.send('done');
        } else {
          res.send('ok');
        }
      });
    });
  }

  return {
    get,
    post,
  };
};

module.exports = indexController;


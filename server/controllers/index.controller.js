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
    // const queries = [];

    // if (req.query.id) {
    //   queries.push(OrganizerModel.findOne({ _id: req.query.id }));
    // }

    // Promise.all(queries).then((results, err) => {
    //   if (err) {
    //     res.render('admin'); // TODO: error handling
    //   }
    //   const organizer = results[0];

    //   res.render('admin/create-organizer', { organizer });
    // });
  };

  const post = (req, res) => {
    if (req.body.isAdmin === 'true') {
      updateClientStatus(req, res);
    } else {
      submitClientDatetime(req, res);
    }
  };

  /*  Helper functions
      ================================================================================= */
  function getAdminPage(req, res, clients) {
    res.render('admin', { clients: clients.filter(client => client.statusIndex > 0) });
  }

  function getIndexPage(req, res, client) {
    res.render('index', { client: client });

  }

  function fetchAllClients() {
    return ClientModel.find({}).sort({ name: 1 });
  }

  function submitClientDatetime(req, res) {
    ClientModel.findById(req.body._id, function (err, client) {
      if (err) {
        return res.send('nok');
      }

      client.set({
        date: req.body.date,
        time: req.body.time,
        statusIndex: 1,
      });
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
        statusIndex: req.body.statusIndex > 2 ? 0 : req.body.statusIndex,
      }

      if (req.body.statusIndex > 2) {
        setData.date = undefined;
        setData.time = undefined;
      }

      client.set(setData);

      client.save(function (err, client) {
        if (err) {
          return res.send('nok');
        }

        if (client.statusIndex === 0) {
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


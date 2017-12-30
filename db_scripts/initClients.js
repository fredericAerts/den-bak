function initClients() {
  db = connect("localhost/de-ster");
  db.clients.remove({});

  clientList.forEach(function(client) {
    db.clients.save({
      name: client.name,
      pass: client.pass,
      statusIndex: client.statusIndex,
    });
  });

  count = db.clients.find().count();

  print('Number of clients: ' + count);
};

var clientList = [
  { name: 'klantA', pass: 'pass', statusIndex: 0, },
  { name: 'klantB', pass: 'pass', statusIndex: 0, },
  { name: 'klantC', pass: 'pass', statusIndex: 0, },
  { name: 'klantD', pass: 'pass', statusIndex: 0, },
]

initClients()

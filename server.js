var dbUser = 'testUsr';
var dbPassword = '12345jc';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo');
  runSchema();
});

function runSchema() {
	var Schema = mongoose.Schema;
	const bookSchema = new Schema({
	    author: { type: String }
	});
	var Book = mongoose.model('Book', bookSchema, 'eventDb');
	let sakiBook = new Book({author: 'Saki'});
	sakiBook.save(function (err, book) {
	  // console.log(book);
	});
};

require('cometd-nodejs-client').adapt();
const lib = require('cometd');
const cometd = new lib.CometD();

// System.debug(UserInfo.getOrganizationId()+''+UserInfo.getSessionId().SubString(15));

// vars
var sfOrgURL = 'https://cunning-goat-333993-dev-ed.my.salesforce.com';
var sfToken = '00D1r000002eT4rEAE!AREAQLhqkudYDkCPFzJlBkzN8XNkDkTBa6o.OT_SY8TDC0hJX_qKprXATYfhU639OFP4mg_i0CzHrYxF3mzDhs9x7HMtIZ7A';

// Configure the CometD object.
cometd.configure({
    url: sfOrgURL + '/cometd/43.0/',
    requestHeaders: { Authorization: 'OAuth ' + sfToken},
    appendMessageTypeToURL: false,
});

// Handshake with the server.
cometd.handshake(function(h) {
	console.log(h);
	if (h.successful) {
	    // Subscribe to receive messages from the server.
	    cometd.subscribe('/data/OpportunityChangeEvent', function(msg) {
		    console.log(msg);
	    }, function(subscribeReply) {
	    	console.log(subscribeReply);
	    });
	}
}); 
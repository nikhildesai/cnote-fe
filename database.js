var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'cnoteemails.cee6ht8movw2.us-west-2.rds.amazonaws.com',
  user     : '',
  password : '',
  database : 'cnote_emails'
});

connection.connect();

function userEmailSignUp(email, callback) {
    connection.query('insert into emails (email) values (?) ', [email], function(err, rows, fields) {
        if (err) {
            console.log('Connection down, could not save email' + email);
            callback(err, null);
            return;
        }
        callback(null, {'result': 'successfully added email'});
    });
}

function friendEmailSignUp(email, referrerEmail, callback) {
    connection.query('insert into emails (email, referrer_email) values (?, ?) ', [email, referrerEmail],
        function(err, rows, fields) {
            if (err) {
                console.log('Connection down, could not save email' + email);
                callback(err, null);
                return;
            }
            callback(null, {'result': 'successfully added friend\'s email'});
        }
    );
}

module.exports = {
    userEmailSignUp: userEmailSignUp,
    friendEmailSignUp: friendEmailSignUp
}

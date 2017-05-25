var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var users = [
	{
		id: 1,
		email: 'Zimbo222@mail.ru',
		firstName: 'Vitaly',
		secondName: 'Zbrizsky'
	},
	{
		id: 2,
		email: '6870user@gmail.com',
		firstName: 'Ralf',
		secondName: 'Loren'
	},
	{
		id: 3,
		email: 'Getsby@gmail.com',
		firstName: 'Ebigail',
		secondName: 'Getsby',
	}
];

app.get('/', function(req, res) {
	res.send('Hello API');
});


app.get('/users', function(req, res) {
	res.send(users);
});


app.get('/users/:email', function(req, res) {
	var result = users.find(function(user) {
		return user.email === req.params.email
	});
	console.log('request');
	if(result) {
		var response = {
			data:{
				user:{
					id: result.id,
					email: result.email,
					firstName: result.firstName,
					lastName: result.secondName,
				},
				code: 200,
				message: 'response 200'
			}
		}
		res.send(response);
	} else {
		res.send(false);
	}
});

app.post('/users', function(req, res) {
	var user = {
		id: Date.now(),
		firstName: req.body.firstName,
		secondName: req.body.secondName,
		email: req.body.email
	};
	users.push(user);
	res.send(user);
	console.log('request');
});


app.put('/users/:email', function(req, res) {
	var result  = users.find(function(user) {
		return user.email === req.params.email
	})

	if(result) {
		result.firstName = req.body.firstName;
		result.secondName = req.body.secondName;
		result.email = req.body.email;
	}

	res.send("access")
})



app.listen(3012, function() {
	console.log("API app started")
});
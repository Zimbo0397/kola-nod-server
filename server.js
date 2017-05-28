var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var users = [
	{
		id: 1,
		email: 'Zimbo222@mail.ru',
		password: '1',
		systemName: 'Zimbo',
		firstName: 'Vitaly',
		secondName: 'Zbrizsky'
	},
	{
		id: 2,
		email: '6870user@gmail.com',
		password: 'ktyecbxrf1315689',
		systemName: '6870user',
		firstName: 'Ralf',
		secondName: 'Loren'
	},
	{
		id: 3,
		email: 'Getsby@gmail.com',
		password: 'ktyecbxrf1315689',
		systemName: 'Getty',
		firstName: 'Ebigail',
		secondName: 'Getsby',
	}
];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.post('/user/login', function(req, res) {
	var result = new Error('Cant login');
	var user = users.find(function(user) {
		if (user.email === req.body.email && user.password === req.body.password) {

			var userInfo = {};
				userInfo.firstName = user.firstName;
				userInfo.secondName = user.secondName;
				userInfo.systemName = user.systemName;

			result = userInfo;
			res.json(result);
		} else {
			res.json(result);
		}
	});
	console.log(JSON.stringify(result));
});

app.post('/user/registration', function(req, res) {
	var result;


	var checkUsers = function(req) {
		for(var i = 0; i < users.length; i++) {
			var user = users[i];

			if (user.email === req.body.email) {
				return "emailError";

			} else if (user.systemName === req.body.systemName) {
					return "systemNameError";
			} else {
				return 'OK'
			}
		}
	}

	switch(checkUsers(req)) {
		case 'emailError':
			result = 'emailError';
		break

		case 'systemNameError':
			result = 'systemNameError';
		break
		case 'OK':
			var newUser = {
				id: Date.now(),
				email: req.body.email,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				systemName: req.body.systemName,
				password: req.body.password
			}
			users.push(newUser);
			result =  true;
		break

	}
	console.log(users);
	res.send(result);
	// console.log(result);
})


// app.post('/users', function(req, res) {
// 	var user = {
// 		id: Date.now(),
// 		firstName: req.body.firstName,
// 		secondName: req.body.secondName,
// 		email: req.body.email
// 	};
// 	users.push(user);
// 	res.send(user);
// 	console.log('request');
// });


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
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

/* whenever a json request comes in, express
*  parses it and we can access it via req.body.
*/
app.use(bodyParser.json()); 

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function(req, res) {
	res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(matchedTodo){
		res.json(matchedTodo);
	} else {
		res.status(404).send(); //not found
	}
		
});

// POST /todos
app.post('/todos', function(req, res) {

	// Allow todos to have only description and completed fields
	var body = _.pick(req.body, 'description', 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send(); //request can't be completed because bad data was provided (Bad Request)
	}

	body.description = body.description.trim();

	//add id field
	body.id = todoNextId++;

	//push new todo item to array
	todos.push(body);

	res.json(body);
});

//DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {

	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(matchedTodo){
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	} else {	
		res.status(404).json({"Error": "no todo found with that id"}); //not found
	}
});

app.listen(PORT, function() {
	console.log('Express listening on port: ' + PORT + '!');
});
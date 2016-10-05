var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Have lunch at 1',
	completed: false
}, {
	id: 2,
	description: 'Do groceries',
	completed: false
}, {
	id: 3,
	description: 'Download music',
	completed: true
}];

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

app.get('/todos', function(req, res) {
	res.json(todos);
});

app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;

	for(var i = 0; i < todos.length; i++){
		if(todoId === todos[i].id){
			matchedTodo = todos[i];
		}
	}

	if(matchedTodo){
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
	
});

app.listen(PORT, function() {
	console.log('Express listening on port: ' + PORT + '!');
});
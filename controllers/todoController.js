var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhi575:aa@cluster0.zg65r.mongodb.net/todo-list?retryWrites=true&w=majority', { useNewUrlParser: true });

var dataSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', dataSchema);

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

    app.get('/', (req, res) =>{
        Todo.find({}, (err, data) =>{
            res.render('todo', {todos: data});
        });
    });

    app.post('/', urlencodedParser, (req, res) =>{
        console.log(req.body);
        var newTodo = Todo(req.body).save((err, data) =>{
            if (err) throw err;
            console.log(data);
            res.json(data);
        });
    });

    app.delete('/:item', (req, res) =>{
        console.log(req.params.item);
        Todo.deleteMany({item: req.params.item}, (err, _) =>{
            if (err) throw err;
        });
        Todo.find({}, (err, data) =>{
            res.render('todo', {todos: data});
        });
    });

}
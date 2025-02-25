const {Router} = require('express');
const Todo = require('../models/todo');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.status(200).json(todos);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            done: false
        }); //create new object and save in DB, Todo.build().save(); same as .create()
        res.status(201).json({todo});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(+req.params.id); // find by primary key
        todo.done = req.body.done;
        await todo.save();
        res.status(200).json({todo});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todos = await Todo.findAll({ // to show 'where', but better use findByPk
            where: {
                id: +req.params.id
            }
        });
        const todo = todos[0];
        await todo.destroy();
        res.status(204).json({});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

module.exports = router;
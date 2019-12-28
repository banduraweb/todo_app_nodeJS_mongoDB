const {Router} = require('express');
const Todo = require('../models/Todo');

const router = Router();

router.get('/', async  (req, res)=>{
    const todos = await Todo.find({})
    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/done', async  (req, res)=>{
    const todos = await Todo.find({})
    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos: todos.filter(todo=>todo.completed)
    })
})

router.get('/undone', async  (req, res)=>{
    const todos = await Todo.find({})
    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos: todos.filter(todo=>!todo.completed)
    })
})

router.get('/all', async  (req, res)=>{
    res.redirect('/')
})

router.get('/create', (req, res)=>{
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})


router.post('/create', async (req, res)=>{

    const todo = new Todo({
    title: req.body.title
})
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res)=>{
    const todo = await Todo.findById(req.body.id)
    todo.completed = Boolean(req.body.check)
    await todo.save()
    res.redirect('/')
})

module.exports = router;


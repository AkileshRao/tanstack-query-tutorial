const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [{
    id: 1,
    title: "Dummy task",
    description: "Task description",
    isComplete: true
},
{
    id: 2,
    title: "Dummy task 2",
    description: "Task description 2",
    isComplete: false
}];

app.get('/', (req, res) => {
    res.send("hello world");
})

app.get('/tasks', (req, res) => {
    res.send({
        status: "Success",
        tasks
    })
})

app.post('/addtask', (req, res) => {
    tasks.push({ ...req.body, id: new Date().getTime(), isComplete: false });
    res.send({
        status: "Success",
        message: "Task added successfully!",
    })
})

app.get('/deletetask/:id', (req, res) => {
    console.log(req.params.id);
    tasks = tasks.filter(task => task.id != req.params.id)
    res.send({
        status: "Success",
        message: "Task deleted successfully!",
        remainingTasks: tasks
    })
})

app.listen(3000, () => {
    console.log("Listening to port 3k");
})
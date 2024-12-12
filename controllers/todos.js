import { Todo } from '../models/todo.js'
import { fileManager } from '../utils/files.js'

class todoController {
    constructor(){
        //hold todo objects in array
        this.initTODOS() 
    } 

    async createTodo(req, res){
        //get data from POST request
        const task = req.body.task
        // create new object via Todo model
        // model constructor uses uniq id and task name as parameter
        const newTodo = new Todo(Math.random().toString(), task)
        // add new todo to todos array
        this.TODOS.push(newTodo)
        // save data to file
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        // create a correct response
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    async initTodos(){
        const todosData = await fileManager.readFile('./data/todos.json')
        // if data is ok - add file content to array
        if(todosData !== null){
            this.TODOS = todosData
        } else  {
            this.TODOS = [] // if we do not get data from file create an empty array
        }
    }

    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }

    updateTodo(req, res){
        const todoId = req.params.id
        const updatedTask = req.body.task

        console.log(req.body)
        console.log(req.params)

        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)

        if(todoIndex < 0){
            res.json({
                message: 'Could not find todo with such index'
            })
            throw new Error('Could not find todo')
        }

        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
        res.json({
            message: 'todo is updated',
            updatedTask: this.TODOS[todoIndex]
        })
        }

        deleteTodo(req, res) {
            const todoId = req.params.id;
            const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);
    
            if (todoIndex < 0) {
                return res.status(404).json({
                    message: 'Could not find todo with the given ID'
                });
            }
    
            const deletedTodo = this.TODOS.splice(todoIndex, 1); // Eemalda element massiivist
            res.json({
                message: 'Todo deleted successfully',
                deletedTask: deletedTodo
            });
        } 
    } 
    
    


export const TodoController = new todoController()
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

const LOCAL_STORAGE_KEY = 'remiderApp.todos'

function App() {

  //todos and a function that sets reminders
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();

  //empty array doesnt change so it runs only once
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])


  //run useeffect function every time todos change(save to LS)
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="h-screen bg-indigo-200 flex justify-center items-center">
      <div className="block w-480 bg-white shadow-lg p-8 rounded-xl">
        <h1 class="text-5xl font-medium leading-tight text-gray-800 mb-2.5 mt-0 mb-12">
          Reminders
          <span class="ml-4 inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-indigo-500 text-white rounded">APP</span>
        </h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} />


        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your reminder</label>
        <textarea ref={todoNameRef} id="message" rows="4" class="mb-4 block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500" placeholder="Reminder..."></textarea>


        <button className="appearance-none bg-indigo-500 text-white rounded py-3 px-4 mb-3 text-sm px-3 rounded focus:outline-none mr-2" onClick={handleAddTodo}>Add reminder</button>
        <button onClick={handleClearTodos} className="rounded-md py-2 px-4 border-2 mb-8  border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-gray-100 focus:outline-none">Clear completed</button>
        <div>
          <span class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{todos.filter(todo => !todo.complete).length}</span>
          left to do
        </div>
      </div>

    </div>

  )
}

export default App;

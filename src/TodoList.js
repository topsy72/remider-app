import React from 'react'
import Todo from './components/Todo';
export default function TodoList({ todos, toggleTodo }) {
  return (
    <div className="mb-8">
      {
        todos.map(todo => {
          return (
            <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo} />
          )
        })
      }
    </div>
  )
}

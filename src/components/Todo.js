import React from 'react'
export default function Todo({ todo, toggleTodo }) {

  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  return (

    <div class="block">
      <div class="mt-2">
        <label class="inline-flex items-center">
          <input type="checkbox" class="w-6 h-6 rounded" checked={todo.complete} onChange={handleTodoClick} />
          <span class="ml-2">{todo.name} </span>
        </label>
      </div>
    </div>
  )
}

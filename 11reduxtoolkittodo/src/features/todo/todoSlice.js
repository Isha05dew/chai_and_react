import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
    todos: [{id: 1, text: "Hello world"}]
}

// function sayHello() {
//     console.log("Hello world");
// }

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // addTodo: sayHello,
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload 
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        // updateTodo: (state, action) => {
        //     state.todos.map((todo) => (
        //         todo.id === action.payload ? todo.text = action.payload : todo.text
        //     ))
        // }
    }
})



export const {addTodo, removeTodo, updateTodo} = todoSlice.actions

export default todoSlice.reducer 
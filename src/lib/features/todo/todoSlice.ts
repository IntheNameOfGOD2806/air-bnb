// import { createAppSlice } from "@/lib/createAppSlice";
// import { getTodos } from "@/services/apiservice";
// import type { PayloadAction } from "@reduxjs/toolkit";
// export interface TodoSliceState {
//     id: string;
//     title: string;
//     completed: boolean
// }
// const initialState: ITodo[] = [
 
// ]
// // If you are not using async thunks you can use the standalone `createSlice`.
// export const todoSlice = createAppSlice({
//     name: "todo",
//     // `createSlice` will infer the state type from the `initialState` argument
//     initialState,
//     // The `reducers` field lets us define reducers and generate associated actions
//     reducers: (create) => ({
//         addTodo: create.reducer((state, action: PayloadAction<ITodo>) => {
//         //    console.log("action", action.payload);
//             state.unshift(action.payload); // mutate state directly
//         }),
//         deleteTodo: create.reducer((state, action: PayloadAction<string>) => {
//             const id = action.payload
//             const index = state.findIndex((todo: ITodo) => todo.id === id)
//             state.splice(index, 1)
//         }),
//         // Use the `PayloadAction` type to declare the contents of `action.payload`
//         updateTodo: create.reducer(
//             (state, action: PayloadAction<string>) => {
//                 console.log("action", action.payload);
//                 const id = action.payload
//                 const index = state.findIndex((todo: ITodo) => todo.id === id)
//                 state[index].completed = !state[index].completed
//             },
//         ),
//         updateTitle: create.reducer(
//             (state, action: PayloadAction<{ id: string, title: string }>) => {
//                 // console.log("action", action.payload);
//                 const newTitle = action.payload.title
//                 const id = action.payload.id
//                 const index = state.findIndex((todo: ITodo) => todo.id === id)
//                 state[index].title = action.payload.title
//             },
//         ),
//         sortTodos: create.reducer(
//             (state, action: PayloadAction<string>) => {
//               if(action.payload==='titleLength'){
//                    state.sort((a,b)=>a.title.length-b.title.length)
//               }
//             },
//         ),
//         // The function below is called a thunk and allows us to perform async logic. It
//         // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
//         // will call the thunk with the `dispatch` function as the first argument. Async
//         // code can then be executed and other actions can be dispatched. Thunks are
//         // typically used to make async requests.
//         getAllTodos: create.asyncThunk(
//             async () => {
//                 const response = await getTodos();
//                 // The value we return becomes the `fulfilled` action payload
//                 // console.log(response);
//                 return  await response;
//             },
//             {
//                 pending: (state) => {
//                 },
//                 // @ts-ignore
//                 fulfilled: (state, action: PayloadAction<ITodo[]>) => {
//                      // Return new state from payload 
//                    return action.payload
//                 },
//                 rejected: (state) => {
//                 },
//             },
//         ),
//     }),
//     // You can define your selectors here. These selectors receive the slice
//     // state as their first argument.
//     selectors: {
//         selectAllTodos: (state) => {
//             // console.log("state:::", state);
//             return state
//         },
//         // selectCount: (counter) => counter.value,
//         // selectStatus: (counter) => counter.status,
//     },
// });
// // Action creators are generated for each case reducer function.
// export const { addTodo,deleteTodo,updateTodo,getAllTodos ,updateTitle,sortTodos} =
//     todoSlice.actions;
// // Selectors returned by `slice.selectors` take the root state as their first argument.
// export const { selectAllTodos } = todoSlice.selectors;
// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.

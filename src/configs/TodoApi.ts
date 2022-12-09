import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { LIMIT } from "../constant";
import { Todo } from "../types/todo.type";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodoTotalLength: builder.query<Todo, void>({
      query: () => "todos/",
      providesTags: ["Todos"],
      transformResponse: (response: any) => response.length,
    }),
    getPaginatedTodoLists: builder.query<Todo[], number | void>({
      query: (start) => `todos?_start=${start}&_limit=${LIMIT}`,
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "Todos" as const, id })),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }];
      },
    }),
    getTodoById: builder.query<Todo, number | void>({
      query: (id) => `todos/${id}`,
      providesTags: (result, error, id): any => [{ type: "Todos", id }],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: ({ userId = 1, completed = false, ...body }) => ({
        url: `todos/`,
        method: "POST",
        body: { userId, completed, ...body },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTodoTotalLengthQuery,
  useGetPaginatedTodoListsQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  util: { getRunningQueriesThunk },
} = todoApi;

export const {
  getTodoTotalLength,
  getPaginatedTodoLists,
  getTodoById,
  addTodo,
} = todoApi.endpoints;

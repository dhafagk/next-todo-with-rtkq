import { Todo } from "../../types/todo.type";
import { LIMIT } from "../../constant";
import { useRouter } from "next/router";
import {
  TodoList,
  Skeleton,
  PaginationButton,
  TodoStat,
  TodoCreate,
} from "../index";
import { useGetTodoTotalLengthQuery } from "../../configs";

type TodoProps = {
  isLoading?: boolean;
  isFetching?: boolean;
  error?: any;
  data?: Todo[];
};

function TodoPage({ isLoading: load, isFetching, error, data }: TodoProps) {
  const router = useRouter();

  const { data: totalTodo }: any = useGetTodoTotalLengthQuery();

  const totalPage = Math.ceil(totalTodo / LIMIT);

  return (
    <>
      <TodoCreate />

      {error ? (
        <>Oh no, there was an error</>
      ) : router.isFallback || load || isFetching ? (
        <Skeleton />
      ) : data ? (
        <TodoList data={data} />
      ) : null}

      <PaginationButton loadingState={isFetching} totalPage={totalPage} />
      <TodoStat totalTodo={totalTodo} />
    </>
  );
}

export default TodoPage;

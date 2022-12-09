import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import * as Configs from "../../configs";
import { Layout, TodoDetail } from "../../components";

export async function getStaticPaths() {
  const store = Configs.makeStore();
  const result = await store.dispatch(Configs.getPaginatedTodoLists.initiate());

  const paths = result?.data?.map((todo) => ({
    params: { id: todo.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps = Configs.wrapper.getStaticProps(
  (store) => async (context) => {
    const id: number = Number(context.params?.id);

    store.dispatch(Configs.getTodoById.initiate(id));

    await Promise.all(store.dispatch(Configs.getRunningQueriesThunk()));

    return {
      props: {},
      revalidate: 60,
    };
  }
);

function Todo() {
  const router = useRouter();

  const id: number = Number(router.query.id);

  const result = Configs.useGetTodoByIdQuery(
    typeof id === "number" ? id : skipToken,
    { refetchOnMountOrArgChange: 60, skip: router.isFallback }
  );

  return (
    <Layout title={`Todo ${result.data?.title}`}>
      <TodoDetail {...result} />
    </Layout>
  );
}

export default Todo;

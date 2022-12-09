import * as Configs from "../configs";
import { Layout, TodoPage } from "../components";
import { useAppSelector } from "../hooks";

export const getServerSideProps = Configs.wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(Configs.getPaginatedTodoLists.initiate());

    await Promise.all(store.dispatch(Configs.getRunningQueriesThunk()));

    // to ensure that no rogue timers are left running
    store.dispatch(Configs.todoApi.util.resetApiState());

    return {
      props: {},
    };
  }
);

export default function Home() {
  const start = useAppSelector((state) => state.numbering.start);

  const results = Configs.useGetPaginatedTodoListsQuery(start);

  return (
    <Layout title="Todo Page">
      <TodoPage {...results} />
    </Layout>
  );
}

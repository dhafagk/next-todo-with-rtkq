import { Badge, Button, Link, List, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Todo } from "../../types/todo.type";
import { Skeleton } from "../index";
import NextLink from "next/link";

type TodoDetailProps = {
  isLoading?: boolean;
  error?: any;
  data?: Todo;
};

function TodoDetail({ isLoading, error, data }: TodoDetailProps) {
  const router = useRouter();
  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : router.isFallback || isLoading ? (
        <Skeleton />
      ) : data ? (
        <>
          <List spacing="3">
            <ListItem>
              {data?.id}. {data?.title}
            </ListItem>
            <ListItem>By user : {data?.userId}</ListItem>
            <ListItem>
              {data?.completed && (
                <Badge fontSize="0.8em" colorScheme="green">
                  completed
                </Badge>
              )}
            </ListItem>
          </List>
          <Link as={NextLink} href="/" replace>
            <Button colorScheme="teal" mt="5">
              Go Back
            </Button>
          </Link>
        </>
      ) : null}
    </>
  );
}

export default TodoDetail;

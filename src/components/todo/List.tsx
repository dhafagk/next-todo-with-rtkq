import { Box, List, ListItem, Badge, Link } from "@chakra-ui/react";
import { Todo } from "../../types/todo.type";
import NextLink from "next/link";

type TodoListProps = {
  data: Todo[];
};

function TodoList({ data = [] }: TodoListProps) {
  return (
    <Box>
      <List spacing={3} py={6}>
        {data?.map(({ id, title, completed }) => (
          <ListItem key={id}>
            <Link as={NextLink} href={`/todo/${encodeURIComponent(id)}`}>
              {title}
            </Link>
            {completed && (
              <Badge ml="2" fontSize="0.8em" colorScheme="green">
                completed
              </Badge>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TodoList;

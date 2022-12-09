import {
  Button,
  FormControl,
  Input,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAddTodoMutation } from "../../configs";
import { Todo } from "../../types/todo.type";

function TodoCreate() {
  const initialValue = { title: "" };
  const [todo, setTodo] = useState<Pick<Todo, "title">>(initialValue);
  const [addTodo, { isLoading }] = useAddTodoMutation();
  const toast = useToast();

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.title) return;

    try {
      const result = await addTodo(todo).unwrap();
      const { id, title, completed, userId } = result;
      const description = (
        <List>
          <ListItem>id: {id}</ListItem>
          <ListItem>title: {title}</ListItem>
          <ListItem>userID: {userId}</ListItem>
          <ListItem>completed: {completed ? "true" : "false"}</ListItem>
        </List>
      );
      toast({
        title: "Todo succesfully created!",
        description,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "An error occurred",
        description: "We couldn't save your todo, try again!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl display="flex" gap="3">
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="type anything..."
          onChange={handleInputChange}
          value={todo.title}
          variant="filled"
          maxWidth="500px"
        />

        <Button colorScheme="teal" type="submit" isLoading={isLoading}>
          Add Todo
        </Button>
      </FormControl>
    </form>
  );
}

export default TodoCreate;

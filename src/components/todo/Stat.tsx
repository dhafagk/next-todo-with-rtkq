import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

function TodoStat({ totalTodo }: { totalTodo: number }) {
  return (
    <Stat pt="5">
      <StatLabel>Total Todos</StatLabel>
      <StatNumber>{`${totalTodo || "NA"}`}</StatNumber>
    </Stat>
  );
}

export default TodoStat;

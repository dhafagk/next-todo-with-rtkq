import { Stack, Skeleton as Loading } from "@chakra-ui/react";

function Skeleton() {
  return (
    <Stack spacing={3} py={6} maxW="500px">
      <Loading height="20px" />
      <Loading height="20px" />
      <Loading height="20px" />
      <Loading height="20px" />
      <Loading height="20px" />
      <Loading height="20px" />
      <Loading height="20px" />
      <Loading height="20px" />
      <Loading height="20px" />
      <Loading height="20px" />
    </Stack>
  );
}

export default Skeleton;

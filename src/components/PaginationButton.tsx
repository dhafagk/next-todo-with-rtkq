import { Box, Button, HStack } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import * as Configs from "../configs";

type ButtonProps = {
  loadingState?: boolean;
  totalPage?: number;
};

function PaginationButton({ loadingState, totalPage }: ButtonProps) {
  // const [page, setPage] = useState<number>(1);
  const page = useAppSelector((state) => state.numbering.page);

  const dispatch = useAppDispatch();

  const handlePrev = () => {
    dispatch(Configs.prevPage());
    dispatch(Configs.prevStart());
  };

  const handleNext = () => {
    dispatch(Configs.nextPage());
    dispatch(Configs.nextStart());
  };

  return (
    <HStack spacing="14px">
      <Button
        onClick={handlePrev}
        isLoading={loadingState}
        disabled={page === 1}
      >
        <ArrowBackIcon />
      </Button>
      <Button
        onClick={handleNext}
        isLoading={loadingState}
        disabled={page === totalPage}
      >
        <ArrowForwardIcon />
      </Button>
      <Box>{`${page} / ${totalPage}`}</Box>
    </HStack>
  );
}

export default PaginationButton;

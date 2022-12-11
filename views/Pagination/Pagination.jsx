import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Hide, HStack, IconButton, Show, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const maxNumOfPage = 10;
const pages = [...Array(maxNumOfPage).keys()];

const Pagination = () => {
  const router = useRouter();
  const query = router.query;
  let queryPage = query.page;

  if (!queryPage) {
    queryPage = 1;
  }

  const handleBackButton = () => {
    if (queryPage > 1) {
      const finalQuery = {
        ...query,
        ["page"]: query.page - 1,
      };
      router.push({ pathname: "/search/", query: finalQuery });
    }
  };

  const handleForwardButton = () => {
    if (queryPage < maxNumOfPage) {
      const finalQuery = {
        ...query,
        ["page"]: Number(query.page) + 1,
      };
      router.push({ pathname: "/search/", query: finalQuery });
    }
  };

  const handlePageNumberClick = (pageNum) => {
    const finalQuery = {
      ...query,
      ["page"]: Number(pageNum),
    };
    router.push({ pathname: "/search/", query: finalQuery });
  };

  return (
    <HStack w="100%" spacing={3} justifyContent="center">
      {queryPage > 1 && (
        <IconButton
          icon={<ChevronLeftIcon />}
          rounded="full"
          onClick={handleBackButton}
        />
      )}
      <Button
        rounded={"full"}
        isActive={queryPage == 1}
        onClick={() => {
          handlePageNumberClick(1);
        }}>
        {1}
      </Button>
      
      {(queryPage == 2 || queryPage == 1) && (
        <HStack px={[0, 5]}>
          <Button
            rounded={"full"}
            isActive={queryPage == 2}
            onClick={() => {
              handlePageNumberClick(2);
            }}>
            {2}
          </Button>
          <Button
            rounded={"full"}
            isActive={queryPage == 3}
            onClick={() => {
              handlePageNumberClick(3);
            }}>
            {3}
          </Button>
          <Button
            rounded={"full"}
            isActive={queryPage == 4}
            onClick={() => {
              handlePageNumberClick(4);
            }}>
            {4}
          </Button>
        </HStack>
      )}
      {(queryPage == maxNumOfPage - 1 || queryPage == maxNumOfPage) && (
        <HStack px={[0, 5]}>
          <Button
            rounded={"full"}
            isActive={queryPage == maxNumOfPage - 3}
            onClick={() => {
              handlePageNumberClick(maxNumOfPage - 3);
            }}>
            {maxNumOfPage - 3}
          </Button>
          <Button
            rounded={"full"}
            isActive={queryPage == maxNumOfPage - 2}
            onClick={() => {
              handlePageNumberClick(maxNumOfPage - 2);
            }}>
            {maxNumOfPage - 2}
          </Button>
          <Button
            rounded={"full"}
            isActive={queryPage == maxNumOfPage - 1}
            onClick={() => {
              handlePageNumberClick(maxNumOfPage - 1);
            }}>
            {maxNumOfPage - 1}
          </Button>
        </HStack>
      )}

      {queryPage > 2 && queryPage < maxNumOfPage - 1 && (
        <HStack px={[0, 5]}>
          <Button
            rounded={"full"}
            isActive={queryPage == queryPage - 1}
            onClick={() => {
              handlePageNumberClick(queryPage - 1);
            }}>
            {queryPage - 1}
          </Button>
          <Button
            rounded={"full"}
            isActive={queryPage == queryPage}
            onClick={() => {
              handlePageNumberClick(queryPage);
            }}>
            {queryPage}
          </Button>
          <Button
            rounded={"full"}
            isActive={queryPage == Number(queryPage) + 1}
            onClick={() => {
              handlePageNumberClick(Number(queryPage) + 1);
            }}>
            {Number(queryPage) + 1}
          </Button>
        </HStack>
      )}

      <Button
        rounded={"full"}
        isActive={queryPage == maxNumOfPage}
        onClick={() => {
          handlePageNumberClick(maxNumOfPage);
        }}>
        {maxNumOfPage}
      </Button>
      {queryPage < maxNumOfPage && (
        <IconButton
          icon={<ChevronRightIcon />}
          rounded="full"
          onClick={handleForwardButton}
        />
      )}
    </HStack>
  );
};

export default Pagination;

import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useRouter } from "next/router";

const BreadCrumb = () => {
  const router = useRouter();
  const slang = router.query.slang;
  return (
    <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink _hover={{ cursor: "auto" }}>Search</BreadcrumbLink>
      </BreadcrumbItem>
      {slang && (
        <BreadcrumbItem>
          <BreadcrumbLink _hover={{ cursor: "auto" }}>{slang}</BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default BreadCrumb;

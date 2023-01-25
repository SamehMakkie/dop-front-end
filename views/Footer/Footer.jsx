import { Button, Divider, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  return (
    <VStack w="100%" py={10} spacing={5} alignItems="center">
      <Divider w="80%" />
      <Link href="/">
        <Image
          width="120px"
          src="/DoPa128.png"
          alt="DoP logo"
        />
      </Link>
      <Link href={"/contact"}>
        <Button>
        Contact Us
        </Button>
      </Link>
      <HStack spacing={5}>
        <Link href={""}>
          <Icon as={BsTwitter} />
        </Link>
        <Link href={""}>
          <Icon as={BsInstagram} />
        </Link>
        <Link href={""}>
          <Icon as={BsYoutube} />
        </Link>
      </HStack>
      <Text>© 2022 DOP. All rights reserved</Text>
    </VStack>
  );
};

export default Footer;

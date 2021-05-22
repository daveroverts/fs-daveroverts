import { Flex } from "@chakra-ui/layout";

export default function Layout({ children }) {
  return (
    <>
      <Flex direction="column" alignItems="center" justify="flex-start">
        {children}
      </Flex>
    </>
  );
}

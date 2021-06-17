import { Flex, Text } from "@chakra-ui/layout";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Flex direction="column" alignItems="center" justify="flex-start">
        <Navbar />
        {children}
        <Footer>
          <Text>
            © 2021 {new Date().getFullYear() > 2021 ? "- 2021" : ""} by FS Dave
            Roverts ✈️. All rights reserved.
          </Text>
        </Footer>
      </Flex>
    </>
  );
}
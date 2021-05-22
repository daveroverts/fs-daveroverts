import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark",
    // TODO: After I add a color switcher, set this to true again.
    useSystemColorMode: false,
}

const theme = extendTheme({ config })

export default theme
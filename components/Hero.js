import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title }) => (
  <Flex justifyContent="center" alignItems="center" height="">
    <Heading>
      {title}
    </Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'FS Dave Roverts ✈',
}

import { VStack } from "@chakra-ui/react"

const FilterStack = ({children}) => {
  return (
    <VStack w="100%" spacing={9} alignItems="start">
        {children}
    </VStack>
  )
}

export default FilterStack
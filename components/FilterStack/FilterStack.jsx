import { VStack } from "@chakra-ui/react"

const FilterStack = ({children}) => {
  return (
    <VStack w="100%" spacing={3} alignItems="start">
        {children}
    </VStack>
  )
}

export default FilterStack
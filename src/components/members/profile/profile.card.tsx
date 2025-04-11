import { Box, Flex, Image, Text, Heading } from '@chakra-ui/react';

function ProfileCard() {
  return (
    <Box
      h={['200px', "200px", '266px']}
      bgBlendMode="multiply"
      bg="#001C5DCC"
      bgImage="url('Ellipse.svg')"
      backgroundPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      borderTopRadius="20px"
      m={['2', null, '10']}
      position="relative"
    >
      <Flex
        direction="row"
        align="center"
        gap="7"
        p="6"
        position={['static', 'absolute', 'absolute']}
        bottom={['auto', "-40px", '-52px']}
      >
        <Box w={['80px', null, '130px']} h={['auto', null, '130px']}>
          <Image
            src="Ellipse.svg"
            alt="Nue Camp"
            borderRadius="full"
            objectFit="cover"
            w="full"
            h="full"
          />
        </Box>
        <Flex direction="column">
          <Heading
            as="h2"
            color="white"
            fontSize={['14px', null, '24px']}
            fontWeight="semibold"
            fontFamily="Body"
          >
            Henok Assefa
          </Heading>
          <Flex direction={['column', "row", 'row']} align="center" gap="2">
            <Text color="white" fontWeight="semibold" fontSize="10px">
              Full-Stack Developer
            </Text>
            <Text color="gray.300" fontSize={['8px', null, '10px']}>
              Last seen 2h 30m ago
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ProfileCard;


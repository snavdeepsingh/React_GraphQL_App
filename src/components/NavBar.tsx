import { Box, Button, Flex, Link } from '@chakra-ui/core';
import React from 'react'
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { Heading } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const appolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  console.log("DATA ME: ", data);
  let body = null;

  // data is loading
  if (loading) {
    body = null;
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    )
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={4} >
            create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={async () => {
            await logout();
            await appolloClient.resetStore();
          }}
          isLoading={logoutFetching}
        >logout</Button>
      </Flex>
    )
  }

  return (
    <Flex  position="sticky" top={0} zIndex={1} bg="tomato" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>Home</Heading>
          </Link>
        </NextLink>
        <Box ml={'auto'}>
          {body}
        </Box>
      </Flex>
    </Flex>
  );
}
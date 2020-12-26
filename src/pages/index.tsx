import { Box, Flex, Heading, Link, Stack, Text, Button } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { UpdootSection } from '../components/UpdootSection';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlclient } from '../utils/createUrqlClient';

const Index = () => {
  const [variables, setVariables] = useState({limit: 15, cursor: null});
  const [{ data,fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>No posts to display.</div>
  }

  return (
    <Layout>
      <Flex>
        <Heading>React-GraphQL</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">create post</Link>
      </NextLink>
      </Flex>
      <br/>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
          <Stack spacing={8}>
            {data!.posts.posts.map((p) => (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box>
                  <Heading fontSize="xl">{p.title}</Heading>
                  <Text>Posted by: {p.creator.username}</Text>
                  <Text mt={4}>{p.textSnippet}</Text>
                </Box>
              </Flex>
            ))}
          </Stack>
        )}
      {data && data.posts.hasMore ? (
              <Flex>
              <Button
                onClick={() => {
                  setVariables({
                    limit: variables.limit,
                    cursor: data?.posts.posts[data?.posts.posts.length-1].createdAt,
                  })
                }}
                isLoading={fetching} colorScheme="teal" m="auto" my={8}>
                load more
              </Button>
            </Flex>
        ): null}
    </Layout>
  )
}

export default withUrqlClient(createUrqlclient, {ssr: true})(Index);

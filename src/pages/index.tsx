import { Box, Flex, Heading, Link, Stack, Text, Button } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { EditDeletePostButtons } from '../components/EditDeletePostButtons';
import { Layout } from '../components/Layout';
import { UpdootSection } from '../components/UpdootSection';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlclient } from '../utils/createUrqlClient';

const Index = () => {
  const [variables, setVariables] = useState({ limit: 15, cursor: null });
  const [{data, error, fetching }] = usePostsQuery({
    variables,
  });

  // if (!fetching && !data) {
  //   return <div>No posts to display.</div>
  // }

  if (!fetching && !data) {
    return (
      <Layout>
        <Box>No posts to display.</Box>
        {error ? <Box>{error.message}</Box> : null}
      </Layout>
    )
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
          <Stack spacing={8}>
            {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>Posted by: {p.creator.username}</Text>
                  <Flex>
                    <Text flex={1} mt={4}>{p.textSnippet}</Text>
                      <Box ml="auto">
                        <EditDeletePostButtons
                          id={p.id}
                          creatorId={p.creator.id}
                        />
                      </Box>
                  </Flex>
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

import { Box, Flex, Heading, Link, Stack, Text, Button } from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';
import { EditDeletePostButtons } from '../components/EditDeletePostButtons';
import { Layout } from '../components/Layout';
import { UpdootSection } from '../components/UpdootSection';
import { usePostsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Index = () => {
  const {data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15, cursor: null 
    },
    notifyOnNetworkStatusChange: true
  });
  console.log("DATA: ", data);
  // if (!fetching && !data) {
  //   return <div>No posts to display.</div>
  // }

  if (!loading && !data) {
    return (
      <Layout>
        <Box>No posts to display.</Box>
        {error ? <Box>{error.message}</Box> : null}
      </Layout>
    )
  }

  return (
    <Layout>
      {!data && loading ? (
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
              fetchMore({
                variables: {
                  limit: variables!.limit,
                  cursor: data?.posts.posts[data?.posts.posts.length - 1].createdAt,
                },
                // updateQuery: (previousValue, {fetchMoreResult}): PostsQuery => {
                //   if (!fetchMoreResult) {
                //     return previousValue as PostsQuery;
                //   }
                  
                //   return {
                //     __typename: 'Query',
                //     posts: {
                //       __typename: 'PaginatedPosts',
                //       hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
                //       posts: [
                //         ...(previousValue as PostsQuery).posts.posts,
                //         ...(fetchMoreResult as PostsQuery).posts.posts
                //       ]
                //     }
                //   }
                // }
              });
              }}
                isLoading={loading} colorScheme="teal" m="auto" my={8}>
                load more
              </Button>
            </Flex>
        ): null}
    </Layout>
  )
}

export default withApollo({ ssr: true }) (Index);

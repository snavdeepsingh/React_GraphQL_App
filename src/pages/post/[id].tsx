import React from 'react'
import { withUrqlClient } from 'next-urql';
import { createUrqlclient } from '../../utils/createUrqlClient';
import { Layout } from '../../components/Layout';
import { Heading } from '@chakra-ui/core';
import { Box } from '@chakra-ui/core';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';

export const Post = ({ }) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Box>{error.message}</Box>
      </Layout>
    )
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post.</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading fontSize="xl">{data.post.title}</Heading>
      <Box mb={4}>
        {data.post.text}
      </Box>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
        />
    </Layout>
  );
}

export default withUrqlClient(createUrqlclient, {ssr: true})(Post);
import React from 'react'
import { Layout } from '../../components/Layout';
import { Heading } from '@chakra-ui/core';
import { Box } from '@chakra-ui/core';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { withApollo } from '../../utils/withApollo';

export const Post = ({ }) => {
  const { data, error, loading } = useGetPostFromUrl();

  if (loading) {
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

export default withApollo({ ssr: true }) (Post);
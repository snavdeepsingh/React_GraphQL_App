import React from 'react'
import { withUrqlClient } from 'next-urql';
import { createUrqlclient } from '../../../utils/createUrqlClient';
import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { useUpdatePostMutation, usePostQuery } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { useRouter } from 'next/router';

export const EditPost = ({ }) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    }
  });
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
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
    <Layout variant='small'>
    <Formik
      initialValues={{ title: data?.post?.title, text: data?.post?.text }}
      onSubmit={async (values) => {
        await updatePost({ id: intId, ...values })
        router.back();
      }}
    >
      {({isSubmitting}) => (
        <Form>
          <InputField
            name="title"
            placeholder="title"
            label="Title"
          />
          <Box mt={4}>
            <InputField
              textarea
              name="text"
              placeholder="text..."
              label="Body"
            />
          </Box>
          <Button
            type="submit"
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
          >update post</Button>
        </Form>
      )}
      </Formik>
    </Layout>
  );
}

export default withUrqlClient(createUrqlclient)(EditPost);
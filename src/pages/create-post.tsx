import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlclient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';



const CreatePost: React.FC<{}> = ({ }) => {
  const router = useRouter();
  useIsAuth();
  const [,createPost] = useCreatePostMutation();
  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          console.log("VALUES: ",values);
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push('/');
          }
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
            >create post</Button>
          </Form>
        )}
        </Formik>
      </Layout>
    );
}

export default withUrqlClient(createUrqlclient) (CreatePost);
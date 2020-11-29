import { Box, Button, Flex, Link } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { createUrqlclient } from '../../utils/createUrqlClient';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';


const ChangePassword: NextPage = () => {
  const router = useRouter();
  console.log(router.query.token)
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values)
          const response = await changePassword({
            newPassword: values.newPassword,
            token: typeof router.query.token === 'string' ? router.query.token : '',
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(toErrorMap(response.data.changePassword.errors))
          } else if (response.data?.changePassword.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            { tokenError ?
              (<Flex>
                <Box mr={2} style={{ color: 'red' }}>{tokenError}</Box>
                <NextLink href="/forgot-password">
                  <Link>Click here to get a new one</Link>
                </NextLink>
              </Flex>)
              : null}
            <Button
              type="submit"
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
            >change password</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>);
};

export default withUrqlClient(createUrqlclient)(ChangePassword);
import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React, { useState} from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';


const ForgotPassword: React.FC<{}> = ({ }) => {
  const [complete, setComplete] = useState(false);
  const [forgotPasword] = useForgotPasswordMutation();
  return (
    <Wrapper variant='small'>
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async (values) => {
        console.log(values)
        await forgotPasword({ variables: values })
        setComplete(true);
      }}
    >
        {({ isSubmitting }) =>
          complete ? (
            <Box>We sent an password recovery email to the email address you provided us.</Box>
          ) :
          (
        <Form>
          <InputField
            name="email"
            placeholder="email"
              label="Email"
              type="email"
          />
          {/* <Box mt={4}>
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
          </Box>
          <Flex mt={2}>
            <NextLink href="/forgot-password">
                <Link ml="auto">forgot password?</Link>
            </NextLink>
          </Flex> */}
          <Button
            type="submit"
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
          >forgot password</Button>
        </Form>
      )}
      </Formik>
    </Wrapper>
    );
}

export default ForgotPassword;
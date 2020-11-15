import React from 'react'
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Box, Button } from '@chakra-ui/core';
import { useMutation } from 'urql';

interface registerProps {

}

const REGISTER_MUT =  `mutation Register ($username: String!, $password: String!){
  register(options: {username: $username,password: $password }) {
    errors {
      field
    message
  }
		user{
      id
      username
      createdAt
    }
  }
}`


const Register: React.FC<registerProps> = ({ }): JSX.Element => {
  const [,register] = useMutation(REGISTER_MUT);     
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values)
          return register(values)
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
            >register</Button>
          </Form>
        )}
        </Formik>
      </Wrapper>
    );
}

export default Register;
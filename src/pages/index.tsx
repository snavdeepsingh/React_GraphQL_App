import { Link } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { Layout } from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlclient } from '../utils/createUrqlClient';

const Index = () => {
  const [{data}] = usePostsQuery();
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>create post</Link>
      </NextLink>
      <div>Hello World</div>
      <br/>
      {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </Layout>
  )
}

export default withUrqlClient(createUrqlclient, {ssr: true})(Index);

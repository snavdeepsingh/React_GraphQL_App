import { Flex } from '@chakra-ui/core';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { useState } from 'react';
import { PostSnippetFragment, useVoteMutation, VoteMutation } from '../generated/graphql';
import { IconButton } from "@chakra-ui/core";
import gql from 'graphql-tag';
import { ApolloCache } from '@apollo/client';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (value: number, postId: number, cache: ApolloCache<VoteMutation>) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: 'Post:' + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });
  
  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints = (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: 'Post:' + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatuss
        }
      `,
      data: { points: newPoints, voteStatus: value }
    });
  }
};

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading');
  const [vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        colorScheme={post.voteStatus === 1 ? 'green': undefined}
        fontSize="40px"
        aria-label="up vote"
        icon={<ChevronUpIcon />}
        onClick={async () => {
        setLoadingState('updoot-loading');
          await vote({
          variables: {
            postId: post.id,
            value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
        })
        setLoadingState('not-loading');
      }} size="24px"
      isLoading={loadingState==='updoot-loading'}
      />
      {post.points}
      <IconButton
        colorScheme={post.voteStatus === -1 ? 'red': undefined}
        fontSize="40px"
        aria-label="down vote"
        icon={<ChevronDownIcon />}
        onClick={async () => {
        setLoadingState('downdoot-loading');
          await vote({
          variables: {
            postId: post.id,
            value: -1,
            },
          update: (cache) => updateAfterVote(-1, post.id, cache),
        })
        setLoadingState('not-loading');
      }} size="24px"
      isLoading={loadingState==='downdoot-loading'}
      />
    </Flex>
    );
}
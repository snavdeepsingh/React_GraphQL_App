import { Flex } from '@chakra-ui/core';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';
import { IconButton } from "@chakra-ui/react";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading');
  const [,vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        color={post.voteStatus === 1 ? 'green': undefined}
        fontSize="20px"
        colorScheme="teal"
        aria-label="up vote"
        icon={<ChevronUpIcon />}
        onClick={async () => {
        setLoadingState('updoot-loading');
        await vote({
          postId: post.id,
          value: 1,
        })
        setLoadingState('not-loading');
      }} size="24px"
      isLoading={loadingState==='updoot-loading'}
      />
      {post.points}
      <IconButton
        color={post.voteStatus === -1 ? 'red': undefined}
        fontSize="20px"
        colorScheme="teal"
        aria-label="down vote"
        icon={<ChevronDownIcon />}
        onClick={async () => {
        setLoadingState('downdoot-loading');
        await vote({
          postId: post.id,
          value: -1,
        })
        setLoadingState('not-loading');
      }} size="24px"
      isLoading={loadingState==='downdoot-loading'}
      />
    </Flex>
    );
}
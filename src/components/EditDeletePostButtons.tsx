import { Box, IconButton } from '@chakra-ui/core';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import React from 'react';
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtonsProps {
  id: number,
  creatorId: number,
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id, creatorId }) => {
  const { data: meData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  
  return (
    <Box>
      <NextLink
        href="/post/edit/[id]"
        as={`/post/edit/${id}`}
      >
        <IconButton
          mr={4}
          fontSize="20px"
          aria-label="edit post"
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        fontSize="20px"
        aria-label="delete post"
        icon={<DeleteIcon />}
        onClick={() => {
          deletePost({ variables: { id }});
        }}
      />
    </Box>
    );
}
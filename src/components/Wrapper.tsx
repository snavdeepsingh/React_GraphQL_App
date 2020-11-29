import { Box } from '@chakra-ui/core';
import React from 'react'

export type WRapperVaraint = 'small' | 'regular';

interface WrapperProps {
  variant?: WRapperVaraint;
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant = 'regular'}) => {
  return (
    <Box
      maxWidth={ variant === 'regular' ? '800px' : '400px'}
      mt={8}
      mx="auto"
      w="100%"
    >
      {children}
    </Box>
  );
}
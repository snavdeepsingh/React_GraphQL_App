import React from 'react'
import { NavBar } from './NavBar';
import { Wrapper, WRapperVaraint } from './Wrapper';

interface LayoutProps {
  variant?: WRapperVaraint;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar ></NavBar>
      <Wrapper variant={variant}>
        {children}
      </Wrapper>
    </>
  );
}
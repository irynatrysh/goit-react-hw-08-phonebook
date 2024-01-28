import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  width: 800px;
`;

export const Header = styled.header`
  display: flex;
  gap: 16px;
  padding: 16px 10px;
  width: 800px;
  border-bottom: 2px solid #1976d2;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderMenu = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const StyledLink = styled(NavLink)`
  color: #1976d2;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0.5rem;

  &.active {
    color: white;
    border: 1px solid #1976d2;
    background-color: #1976d2;
    border-radius: 4px;
  }
`;

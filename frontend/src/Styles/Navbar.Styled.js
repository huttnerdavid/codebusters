import styled from "styled-components";
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
`

export const StyledNavContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`

export const StyledNavContainerChild1 = styled(Link)`
  grid-area: 1 / 1 / 2 / 2;
  text-decoration: none;
`

export const StyledNavContainerChild2 = styled(Link)`
  grid-area: 1 / 2 / 2 / 3;
  text-decoration: none;
`

export const StyledNavContainerChild3 = styled(Link)`
  grid-area: 1 / 3 / 2 / 4;
  text-decoration: none;
`

export const StyledNavContainerChild4 = styled(Link)`
  grid-area: 1 / 4 / 2 / 5;
  text-decoration: none;
`

export const LoginLogoutLi = styled.li`
  margin-left: auto;
`

export const StyledUl = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`
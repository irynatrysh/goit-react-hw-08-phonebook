import { Outlet } from 'react-router-dom';
import { Container, Header, HeaderMenu, StyledLink } from './Layout.styled';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
  const isLogged = useSelector(selectIsLoggedIn);

  return (
    <Container>
      <Header>
        <HeaderMenu>
          <StyledLink to="/" end>
            Home
          </StyledLink>
          {isLogged && <StyledLink to="/contacts">contacts</StyledLink>}
          {}
        </HeaderMenu>
        {isLogged && <UserMenu />}
      </Header>
      <Outlet />
      <ToastContainer />
    </Container>
  );
};
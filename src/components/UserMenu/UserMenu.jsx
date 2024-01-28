import { Avatar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { Name, Wrapper } from './UserMenu.styled';
import { logOut } from '../../redux/auth/operations';

export const UserMenu = () => {
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function nameAvatar(name) {
    let stringAvatar = ' ';
    let colorString = 'default';
    if (name) {
      colorString = name;
      const sp = name.split(' ');
      if (sp.length > 1) {
        stringAvatar = `${sp[0][0]}${sp[1][0]}`;
      } else if (name.length >= 2) {
        stringAvatar = `${name.slice(0, 2)}`;
      } else if (name.length > 0) {
        stringAvatar = `${name.slice(0, 1)}`;
      }
    }

    return {
      sx: {
        bgcolor: stringToColor(colorString),
      },
      children: `${stringAvatar.toUpperCase()}`,
    };
  }

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Avatar {...nameAvatar(user.name)} sx={{ bgcolor: '#1976d2' }} />

      <Name>{user.email}</Name>
      <Button variant="contained" onClick={() => dispatch(logOut())}>
        Log Out
      </Button>
    </Wrapper>
  );
};

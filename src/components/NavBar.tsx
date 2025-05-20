import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Button,
  Space,
  Drawer,
  Grid,
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  MenuOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import type { MenuProps } from 'antd';
import Loading from '@components/Loading';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const NavBar = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logoutWithRedirect = () => {
    setIsLoggingOut(true); 
    setTimeout(() => {
      logout({
        logoutParams: { returnTo: window.location.origin },
      });
    }, 300);
  };

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'user',
      label: (
        <div style={{ fontWeight: 'bold', padding: '4px 12px' }}>
          {user?.name}
        </div>
      ),
      type: 'group',
      children: [],
    },
    { type: 'divider' },
    {
      key: 'profile',
      label: (
        <Link to="/profile">
          <ProfileOutlined style={{ marginRight: 8 }} />
          Profile
        </Link>
      ),
    },
    {
      key: 'logout',
      label: (
        <button
          onClick={logoutWithRedirect}
          disabled={isLoggingOut}
          style={{
            all: 'unset', // resets button appearance
            color: isLoggingOut ? '#aaa' : undefined,
            cursor: isLoggingOut ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            width: '100%',
          }}
        >
          <LogoutOutlined style={{ marginRight: 8 }} />
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </button>
      ),
    },
  ];

  if (isLoggingOut) {
    return <Loading />;
  }
  const navItems = [
    { key: 'home', label: <Link to="/">Home</Link> },
  ];

  return (
    <>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#001529',
          padding: '0 24px',
          width: '100%',
        }}
      >
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <img
            src="https://cdn.auth0.com/styleguide/components/1.0.8/media/logos/img/badge.png"
            alt="logo"
            style={{ height: 32, marginRight: 24 }}
          />

          {screens.md ? (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['home']}
              items={navItems}
              style={{ flex: 1 }}
            />
          ) : (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              style={{ color: '#fff' }}
            />
          )}
        </div>

        {/* Right: Login or Avatar */}
        <div>
          {!isAuthenticated ? (
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => loginWithRedirect()}
            >
              Log in
            </Button>
          ) : (
            <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  size="large"
                  src={user?.picture}
                  icon={<UserOutlined />}
                  alt={user?.name}
                />
              </Space>
            </Dropdown>
          )}
        </div>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          defaultSelectedKeys={['home']}
          items={navItems}
          onClick={() => setDrawerVisible(false)}
        />
      </Drawer>
    </>
  );
};

export default NavBar;

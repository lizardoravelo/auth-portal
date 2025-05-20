import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Avatar, Typography, Descriptions, Tag } from 'antd';
import config from '@config/constants';

const { Title, Text } = Typography;

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const roles = user?.[`${config.auth.namespace}roles`] ?? [];

  return (
    <Card 
      title="Profile"
      style={{    
        maxWidth: 600,
        margin: '2rem auto',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 12, 
      }}
    >
      <Card.Meta
        avatar={<Avatar size={64} src={user?.picture} />}
        title={<Title level={4}>{user?.nickname}</Title>}
        description={<Text type="secondary">{user?.email}</Text>}
      />
      <Descriptions title="Details" bordered column={1} style={{ marginTop: 24 }}>
        <Descriptions.Item label="Email Verified">
          {user?.email_verified ? 'Yes' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="Roles">
          {roles.length > 0 ? (
            roles.map((role: string) => (
              <Tag color="green" key={role}>{role}</Tag>
            ))
          ) : (
            <Text type="secondary">No roles assigned</Text>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="User ID">
          <Text code>{user?.sub}</Text>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Profile;

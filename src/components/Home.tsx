import { useEffect, useState } from 'react';
import { Typography, Card, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import { motion, AnimatePresence } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [jwt, setJwt] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<'copy' | 'copied' | 'failed'>('copy');
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setJwt(token);
      } catch (err) {
        console.error('❌ Failed to retrieve access token', err);
      }
    };

    if (isAuthenticated) {
      fetchAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const handleCopy = async () => {
    if (jwt) {
      try {
        await navigator.clipboard.writeText(jwt);
        setCopyState('copied');
        setTimeout(() => setCopyState('copy'), 2500);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
        setCopyState('failed');
        setTimeout(() => setCopyState('copy'), 2500);
      }
    }
  };

  const getCopyText = () => {
    switch (copyState) {
      case 'copied':
        return 'Copied! Ready to use ✅';
      case 'failed':
        return 'Copy failed ❌';
      default:
        return 'Copy';
    }
  };

  return (
    <div className='content-wrapper'>
      <Card variant="outlined" style={{ marginBottom: 24 }}>
        <Title level={2}>React Auth Demo</Title>
        <Paragraph>
          {isAuthenticated ? (
            <>You're logged in! Here is your JWT:</>
          ) : (
            <>
              You are not logged in.{' '}
              <Text strong>
                Please log in to receive your JSON Web Token (JWT).
              </Text>
            </>
          )}
        </Paragraph>
        {!isAuthenticated && (
          <Button type="primary" onClick={() => loginWithRedirect()}>
            Log in
          </Button>
        )}
      </Card>

      {isAuthenticated && jwt && (
        <Card
          title="Your JWT"
          extra={
            <Button icon={<CopyOutlined />} onClick={handleCopy}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copyState}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.25 }}
                >
                  {getCopyText()}
                </motion.span>
              </AnimatePresence>
            </Button>
          }
        >
          <Paragraph type="secondary" style={{ marginBottom: 8 }}>
            This is your current session’s ID token. Keep it private.
          </Paragraph>
          <pre
            style={{
              maxHeight: 300,
              overflowY: 'auto',
              background: '#f6f8fa',
              padding: 12,
              borderRadius: 6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontSize: '0.9em',
              userSelect: 'text',
            }}
          >
            {showToken ? jwt : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
          </pre>
          <Button
            size="small"
            type="link"
            onClick={() => setShowToken(!showToken)}
            style={{ paddingLeft: 0 }}
          >
            {showToken ? 'Hide JWT 🔒' : 'Show JWT 🔓'}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Home;

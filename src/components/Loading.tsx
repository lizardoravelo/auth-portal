import { Spin } from 'antd';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loading;

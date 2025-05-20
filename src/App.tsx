import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import config from "@config/constants";

import NavBar from "@components/NavBar";
import Home from "@components/Home";
import Loading from "@components/Loading";
import Profile from "@components/Profile";

import "./App.css";

const { Content } = Layout;

const App = () => {
  const { isLoading, error } = useAuth0();

  if (isLoading) return <Loading />;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <Router basename={`${config.app}`}>
      <Layout className="layout">
        <NavBar />
        <Content style={{ padding: '50px', minHeight: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;

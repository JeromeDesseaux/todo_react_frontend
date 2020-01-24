import React from 'react';

import './App.css';

import { Layout } from 'antd';


import TodoPage from "./components/TodoPage";

function App() {

  const { Content } = Layout;


  return (
    <Layout style={{ background: '#fff' }}>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>

        <TodoPage />

      </div>

      </Content>
    </Layout>
  );
}

export default App;

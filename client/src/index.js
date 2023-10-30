import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#ff6d38",
            colorPrimaryHover: "#ff8b0f",
          },
          Tabs:{
            colorPrimary: "#ff6d38",
            colorPrimaryHover: "#ff8b0f",
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);


reportWebVitals();

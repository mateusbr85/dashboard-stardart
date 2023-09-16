import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/index.scss'
import 'rsuite/dist/rsuite.min.css';
import 'react-toastify/dist/ReactToastify.css';
// import '@fortawesome/fontawesome-svg-core/styles.css'
// import 'rsuite/dist/rsuite.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)

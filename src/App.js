import './App.css';
import { Routes, Route } from 'react-router-dom';
import CustomerRoutes from './Routers/CustomerRoutes'
import { Provider } from 'react-redux';
import store from './customer/components/Store/Store';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Routes>
          <Route path='/*' element={<CustomerRoutes />}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;

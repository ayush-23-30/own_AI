import './App.css'
import { UserProvider } from './context/user.context';
import AppNavigation from './routes/AppNavigation';
import { ToastContainer } from 'react-toastify';

function App() {
  
 
  return (
    <>
      <UserProvider>
      <AppNavigation/>
      <ToastContainer/>
      </UserProvider>
    </>
  )
}

export default App;

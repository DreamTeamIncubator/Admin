import './App.css';
import { Header } from './components/Header/Header.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import AppRouter from './routes/Router.tsx';
// import {UserList} from '@/components/UserList/UserList.tsx';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <AppRouter />
      </div>
      {/* <UserList /> */}
    </>
  );
}

export default App;

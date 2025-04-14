
import './App.css'
import {Header} from './components/Header/Header.tsx';
import AppRouter from './routes/Router.tsx';
// import {UserList} from '@/components/UserList/UserList.tsx';

function App() {


  return (
    <>
        <Header/>
        <AppRouter/>
       {/* <UserList />*/}
    </>
  )
}

export default App

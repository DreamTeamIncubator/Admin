import { Login } from '@/components/Login/Login';
import { UserList } from '@/components/UserList/UserList';
import { Routes, Route } from 'react-router-dom';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<UserList />} />
    </Routes>
  );
};

export default AppRouter;

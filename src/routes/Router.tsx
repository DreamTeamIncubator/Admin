import { Login } from '@/components/Login/Login';
import { MoreInformation } from '@/components/UserList/MoreInformation/MoreInformation';
import { UserList } from '@/components/UserList/UserList';
import { Routes, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<UserList />} />
      <Route path="/moreInformation/:id" element={<MoreInformation />} />
    </Routes>
  );
};

export default AppRouter;

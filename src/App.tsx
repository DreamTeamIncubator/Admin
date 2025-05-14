import './App.css';
import { Header } from './components/Header/Header.tsx';

import AppRouter from './routes/Router.tsx';

function App() {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;

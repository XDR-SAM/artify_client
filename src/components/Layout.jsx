import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


//by default set korar jonno rakhlam

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-surface-muted transition-colors duration-300 dark:bg-surface-dark">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;


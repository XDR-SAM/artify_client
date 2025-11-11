import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './routes/AppRouter';
import { Toaster } from 'react-hot-toast';
import 'react-image-gallery/styles/css/image-gallery.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

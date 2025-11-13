import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgetPassword from '../pages/Forgetpasword';
import AddArtwork from '../pages/AddArtwork';
import ExploreArtworks from '../pages/ExploreArtworks';
import ArtworkDetails from '../pages/ArtworkDetails';
import MyGallery from '../pages/MyGallery';
import MyFavorites from '../pages/MyFavorites';
import NotFound from '../pages/NotFound';
import ArtistDetailsGallery from '../pages/ArtistDetailsGallery';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forget-password',
        element: <ForgetPassword />,
      },
      {
        path: 'explore',
        element: <ExploreArtworks />,
      },
      {
        path: 'artist/:email',
        element: <ArtistDetailsGallery />,
      },
      {
        path: 'add-artwork',
        element: (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: 'artwork/:id',
        element: (
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-gallery',
        element: (
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-favorites',
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;


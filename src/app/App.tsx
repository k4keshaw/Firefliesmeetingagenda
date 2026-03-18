import { RouterProvider } from 'react-router';
import { router } from './routes';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
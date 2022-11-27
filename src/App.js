import { RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes/Routes';


function App() {
  return (
    <div className='scroll-smooth'>
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;

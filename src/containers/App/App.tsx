import { GroupRandomizer, Home } from 'containers';
import { useTranslation } from 'react-i18next';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

const App = () => {

    const { t } = useTranslation();

    const router = createBrowserRouter([
        {
          path: t('Home.path') || '/',
          element: <Home/>,
        },
        {
          path: t('GroupRandomizer.path') || '/groups',
          element: <GroupRandomizer/>,
        }
      ])

    return <>
        <RouterProvider router={router}/>
    </>
}

export default App;
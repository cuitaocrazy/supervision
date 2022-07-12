import dynamic from 'next/dynamic';
import Login from './Login'
import { useRouter } from 'next/router'
import { AppContextProvider } from '../appState';

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

export default function Index() {
  const router = useRouter()
  if(router.asPath.toLocaleUpperCase()==='/LOGIN')
  return <AppContextProvider><Login/></AppContextProvider>
  return <App />;
}

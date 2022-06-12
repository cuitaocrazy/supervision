import dynamic from 'next/dynamic';

import AppShell from '../components/AppShell'




const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

export default function Index() {
  return <App />;
  // return <AppShell/>
}

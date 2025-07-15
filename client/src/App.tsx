import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/libs/query-client';
import Home from './pages/Home';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;

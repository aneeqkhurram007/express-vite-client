import ping from '@/queries/ping';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const { data: pingData } = useQuery({
    queryKey: ['ping'],
    queryFn: ping,
  });

  return <div>Home of {pingData?.message}</div>;
};

export default Home;

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../components/ui/loading';

interface RedirectProps {
  to: string;
}

const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const Router = useRouter();

  useEffect(() => {
    Router.push(to);
  }, [to, Router]);

  return <Loading />;
};

export { Redirect };

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { TestUser } from './test-user';
import { requireAuth } from '@/lib/auth-utils';


export default async function Home() {
  await requireAuth();
  
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.getUsers.queryOptions(),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      
      <div>...</div>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <TestUser />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
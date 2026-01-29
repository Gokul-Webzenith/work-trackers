import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,         
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

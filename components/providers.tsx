"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  // Created inside state, not at module scope: a module-level client is
  // shared across every request on the server, which would leak one user's
  // cached data into another's response.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Server Components already deliver fresh data on navigation.
            // A short stale window stops the client from immediately
            // refetching what the server just sent.
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        // Theme transitions fight the reduced-motion rules in globals.css and
        // add nothing; the switch should be instant.
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors closeButton position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

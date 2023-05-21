import '../styles/globals.css'
import LayoutStacked from "/layouts/layoutStacked/LayoutStacked.jsx";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";

import { useRouter } from "next/router";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const pathname = router.pathname;
  
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {/* {["/formPageSignin"].includes(pathname) && (
          <Component {...pageProps} />
        )}
        {!["/formPageSignin"].includes(pathname) && (
          <LayoutStacked>
          </LayoutStacked>
        )} */}
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp

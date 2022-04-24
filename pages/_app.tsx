import '../styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { lightTheme} from '../themes';
import {SWRConfig} from 'swr';
import { UiProvider } from '../context';

/*Video numero 12 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
       value={{
         fetcher: (resource, init) => fetch(resource,init).then(res=>res.json())
       }}
    
    >
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </SWRConfig>
  )
}

export default MyApp

import { Typography,Box } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../components/layouts';

const Custom404 = () => {
  return (
    <ShopLayout title='Page not Found' pageDescription='No hay nada que mostrar aqui'>
        <Box 
          display='flex' 
          justifyContent='center' 
          alignItems='center' 
          height='calc(100vh -200px)'
          sx={{flexDirection:{xs:'column', sm:'row'}}}
        >
            <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404</Typography>
            <Typography marginLeft={2}>No encontramos ninguna pagina aqui</Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404;
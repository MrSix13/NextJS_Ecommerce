import NextLink from 'next/link';
import { Box } from '@mui/system';
import {ShopLayout } from '../../components/layouts/index';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Link from 'next/link';

 const EmptyPage = () => {
  return (
    <ShopLayout title="Carrito Vacio" pageDescription="No hay articulos en el carrito de compras">

        <Box
          display="flex"
          justifyContent='center'
          alignItems='center'
          height='calc(100vh-200px)'
          sx={{flexDirection:{xs:'column', sm:'row'}}}
        >
            <RemoveShoppingCartOutlined/>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>Su carrito esta vacio</Typography>
                <NextLink href="/" passHref>
                    <Link color="secondary" typography="h4">Regresar</Link>
                </NextLink>
            </Box>
        </Box>

    </ShopLayout>
  )
}

export default EmptyPage;
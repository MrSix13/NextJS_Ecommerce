import { Button, Card, CardContent, Divider, Grid, Typography,Link, Chip } from "@mui/material";
import NextLink from 'next/link';
import { Box } from "@mui/system"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";


const OrderPage = () => {
  return (
    <ShopLayout title='Resumen de orden 123123' pageDescription={"Resumen de la orden"}>
        <Typography variant='h1' component='h1'>Orden: 121123</Typography>

        <Chip
          sx={{my:2}}
          label="Pendiente de pago"
          variant='outlined'
          color='error'
          icon={<CreditCardOffOutlined/>}
        
        />

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{my:1}}/>
                        <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        
                        <Typography>Bastian Garces</Typography>
                        <Typography>323 alun lugar</Typography>
                        <Typography>Alicante,212</Typography>
                        <Typography>Concepcion, Chile</Typography>

                        <Divider sx={{my:1}}/>
                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        {/*Order Summary */}
                        <OrderSummary/>
                        <Box sx={{mt:3}}>
                            <h1>pagar</h1>
                            <Chip
                              sx={{my:2}}
                              label="Orden ya fue pagada"
                              variant='outlined'
                              color='success'
                              icon={<CreditScoreOutlined/>}
                            
                            />

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage
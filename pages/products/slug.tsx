import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayout } from "../../components/layouts"
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { initialData } from "../../database/products"

const product = initialData.products[0];

const slug = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>

      <Grid container spacing={3}>
          
          <Grid item xs={12} sm={7}>
              <ProductSlideshow images={product.images}/>
          </Grid>

          <Grid item xs={12} sm={5}>

              <Box display='flex' flexDirection='column'> 
                  {/*titulos */}
                  <Typography variant='h1' component='h1' >{product.title}</Typography>
                  <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

                  {/*Cantidad */}

                  <Box sx={{my:2}}>
                      <Typography variant='subtitle2'>Cantidad</Typography>
                      {/*ItemCounter */}
                      <ItemCounter/>
                      <SizeSelector
                        selectedSize={product.sizes[3]}
                        sizes={product.sizes}
                      />
                  </Box>

                  {/*Agregar al Carrito */}

                  <Button color="secondary" className='circular-btn'>
                    Agregar al carrito
                  </Button>

                  {/*Descripcion*/}
                  <Box sx={{mt:3}}>
                      <Typography variant='subtitle2'>Description</Typography>
                      <Typography variant='body2'>{product.description}</Typography>
                  </Box>

              </Box>
      
          </Grid>

      </Grid>

    </ShopLayout>
  )
}

export default slug
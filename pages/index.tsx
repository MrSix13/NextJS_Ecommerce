import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { initialData } from '../database/products'
import { IProduct } from '../interfaces'


const Home: NextPage = () => {
  return (
    <ShopLayout title={'Ecommerce-Shop- Home'} pageDescription={'Encuentra los mejores productos aca'}>
      <Typography variant='h1' component='h1'>Home</Typography>
      <Typography variant='h2' sx={{mb:1}}>Todos los productos</Typography>

      <ProductList products={initialData.products as any}/>

    </ShopLayout>
  )
}

export default Home

import type { NextPage,GetServerSideProps } from 'next'
import { Typography,Box } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query:string
}

const SearchPage: NextPage<Props> = ({products,foundProducts,query}) => {

  return (
    <ShopLayout title={'Ecommerce-Shop - Search'} pageDescription={'Encuentra los mejores productos aca'}>
      <Typography variant='h1' component='h1'>Buscar Producto</Typography>
      {
          foundProducts
             ? <Typography textTransform='capitalize' variant='h2' sx={{mb:1}}>Termino: {query}</Typography>
             : (
                 <Box display='flex'>
                    <Typography variant='h2' sx={{mb:1}}>No encontramos ningun producto</Typography>
                    <Typography textTransform='capitalize' variant='h2' sx={{ml:1}} color='secondary'>{query}</Typography>
                 </Box>
             )
      
      }

    <ProductList products={products}/>

    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { query= '' } = params as {query:string};  // your fetch function here 

    if(query.length === 0){
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query);
    const foundProducts = products.length > 0;


    if(!foundProducts){
        products = await dbProducts.getProductsByTerm('shirt')
    }


    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage
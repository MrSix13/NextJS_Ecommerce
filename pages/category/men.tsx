import type {NextPage} from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { Typography } from '@mui/material';

const WomenPage: NextPage = ()=>{

    const {products,isLoading} = useProducts('/products?gender=men');
    
    return(
        <ShopLayout title={'Teslo-Shop-Hombre'} pageDescription={"Encuentra los mejores productos para Hombres"}>
            <Typography>Hombres</Typography>
            <Typography>Producto para ellos</Typography>

            {
                isLoading
                  ? <FullScreenLoading/>
                  : <ProductList products={products}/>
            }
        </ShopLayout>
    )
}

export default WomenPage;
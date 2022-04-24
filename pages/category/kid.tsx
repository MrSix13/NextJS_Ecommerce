import type {NextPage} from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { Typography } from '@mui/material';

const KidPage: NextPage = ()=>{

    const {products,isLoading} = useProducts('/products?gender=kid');
    
    return(
        <ShopLayout title={'Teslo-Shop-Kid'} pageDescription={"Encuentra los mejores productos para niños"}>
            <Typography>Niños</Typography>
            <Typography>Producto para niños</Typography>

            {
                isLoading
                  ? <FullScreenLoading/>
                  : <ProductList products={products}/>
            }
        </ShopLayout>
    )
}

export default KidPage;
import type {NextPage} from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { Typography } from '@mui/material';

const WomenPage: NextPage = ()=>{

    const {products,isLoading} = useProducts('/products?gender=women');
    
    return(
        <ShopLayout title={'Teslo-Shop-Mujer'} pageDescription={"Encuentra los mejores productos para mujeres"}>
            <Typography>Mujeres</Typography>
            <Typography>Producto para ellas</Typography>

            {
                isLoading
                  ? <FullScreenLoading/>
                  : <ProductList products={products}/>
            }
        </ShopLayout>
    )
}

export default WomenPage;
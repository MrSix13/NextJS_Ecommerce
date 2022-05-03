import NextLink from 'next/link';
import { AppBar, Toolbar, Link, Typography, Button, IconButton, Badge, Input, InputAdornment } from "@mui/material";
import { Box } from '@mui/system';
import {ClearOutlined, SearchOutlined, ShoppingCartOutlined} from '@mui/icons-material';
import {useRouter} from 'next/router';
import { useContext, useState } from 'react';
import {UiContext, CartContext} from '../../context';

export const Navbar = () => {
    const {asPath,push} = useRouter();


    const {toggleSideMenu} = useContext(UiContext);
    const {numberOfItems} = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);


    const onSearchTerm = ()=>{
        if(searchTerm.trim().length === 0)return;
        push(`/search/${searchTerm}`);
    }


  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link>
                    <Typography variant='h6'>Shopping</Typography>
                    <Typography sx={{ml:0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>
            <Box className='fadeIn'  sx={{display:isSearchVisible ? 'none' : {xs: 'none', sm: 'block'}}}>

            {/*Todo flex */}
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref>
                    <Link>
                        <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                    </Link>
                </NextLink>
            </Box>
            <Box flex={1}/>
            
            {/* Pantallas grandes 
            <IconButton>
                <SearchOutlined/>
            </IconButton>*/}
            {
                isSearchVisible
                   ? (
                    <Input
                    sx={{display:{xs:'none',sm:'flex'}}}
                    className='fadeIn'
                    autoFocus
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    onKeyPress={(e)=>e.key === 'Enter' ? onSearchTerm(): null}
                    type='text'
                    placeholder='Buscar...'
                    endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                             onClick={()=>setIsSearchVisible(false)}
                           >
                              <ClearOutlined/>
                           </IconButton>
                        </InputAdornment>
                    }/>)

                    : 
                    (
                        <IconButton
                          onClick={()=>setIsSearchVisible(true)}
                          sx={{display:{xs:'none',sm:'flex'}}}
                        >
                            <SearchOutlined/>
                        </IconButton>
                    )
            }
            

            {/* Pantallas pequeñas */}
            <IconButton
              sx={{display:{xs:'flex',sm:'none'}}}
              onClick={toggleSideMenu}
            >
                <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems > 9 ? '+9':numberOfItems} color="secondary">
                                <ShoppingCartOutlined/>
                            </Badge>
                        </IconButton>
                    </Link>
            </NextLink>

            <Button onClick={toggleSideMenu}>
                Menu
            </Button>


        </Toolbar>
    </AppBar>
  )
}

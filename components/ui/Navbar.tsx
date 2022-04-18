import NextLink from 'next/link';
import { AppBar, Toolbar, Link, Typography, Button, IconButton, Badge } from "@mui/material";
import { Box } from '@mui/system';
import {SearchOutlined, ShoppingCartOutlined} from '@mui/icons-material';

export const Navbar = () => {
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
            <Box  sx={{display: {xs: 'none', sm: 'block'}}}>

            {/*Todo flex */}
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref>
                    <Link>
                        <Button>Mujeres</Button>
                    </Link>
                </NextLink>
            </Box>
            <Box flex={1}/>

            <IconButton>
                <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCartOutlined/>
                            </Badge>
                        </IconButton>
                    </Link>
            </NextLink>

            <Button>Menu</Button>


        </Toolbar>
    </AppBar>
  )
}

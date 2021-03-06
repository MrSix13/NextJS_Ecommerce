import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UiContext, AuthContext } from '../../context';
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from '@mui/icons-material';
import {Box, Drawer, Input, ListItem,List, InputAdornment, IconButton, ListItemIcon, ListItemText, Divider, ListSubheader} from '@mui/material';


export const SideMenu = ()=>{
    const router = useRouter();

    const {isMenuOpen,toggleSideMenu} = useContext(UiContext);
    const {user, isLoggedIn, logout} = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = ()=>{
        if(searchTerm.trim().length === 0)return;
        navigateTo(`/search/${searchTerm}`);
    }


    const navigateTo = (url:string)=>{
        toggleSideMenu();
        router.push(url)
    }

    return(
        <Drawer
          open={isMenuOpen}
          anchor='right'
          sx={{backdropFilter:'blur(4px)', transition:'all 0.5s ease-out'}}
          onClose={toggleSideMenu}
        >
            <Box>
                <List>
                    <ListItem>
                        <Input
                          autoFocus
                          value={searchTerm}
                          onChange={(e)=>setSearchTerm(e.target.value)}
                          onKeyPress={(e)=>e.key === 'Enter' ? onSearchTerm(): null}
                          type='text'
                          placeholder='Buscar...'
                          endAdornment={
                              <InputAdornment position="end">
                                 <IconButton
                                   onClick={onSearchTerm}
                                 >
                                    <SearchOutlined/>
                                 </IconButton>
                              </InputAdornment>
                          }
                        />
                    </ListItem>

                    {
                        isLoggedIn && (
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'}/>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'}/>
                                </ListItem>
                            </>
                        )
                    }

                    <ListItem 
                        button 
                        sx={{display:{xs:'', sm:'none'}}}
                        onClick={()=>navigateTo('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'}/>
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{display:{xs:'', sm:'none'}}}
                        onClick={()=>navigateTo('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'}/>
                    </ListItem>

                    <ListItem 
                        button 
                        sx={{display:{xs:'', sm:'none'}}}
                        onClick={()=>navigateTo('/category/kid')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ni??os'}/>
                    </ListItem>

                    {
                        isLoggedIn 
                         ? (
                            <ListItem button onClick={logout}>
                                <ListItemIcon>
                                    <LoginOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Salir'}/>
                            </ListItem>
                         )
                         : (
                            <ListItem button onClick={()=>navigateTo(`/auth/login?p=${router.asPath}`)}>
                                <ListItemIcon>
                                    <VpnKeyOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'}/>
                            </ListItem>
                            
                         )
                    }
                    

                    {/*Admin */}

                    {
                        user?.role === 'admin' && (
                            <>
                                <Divider>
                                    <ListSubheader>Admin Panel</ListSubheader>

                                    <ListItem button>
                                        <ListItemIcon>
                                            <CategoryOutlined/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Productos'}/>
                                    </ListItem>

                                    <ListItem button>
                                        <ListItemIcon>
                                            <ConfirmationNumberOutlined/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Ordenes'}/>
                                    </ListItem>

                                    <ListItem button>
                                        <ListItemIcon>
                                            <AdminPanelSettings/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Usuarios'}/>
                                    </ListItem>
                                </Divider>
                            </>
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
}
import { Button,Box ,FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layouts"
import { countries } from "../../utils";


type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const AddressPage = () => {

    const {register,handleSubmit, formState:{errors}} = useForm<FormData>({
        defaultValues:{
            firstName: '',
            lastName: '',
            address: '',
            zip: '',
            city: '',
            country: countries[0].code,
            phone: '',
        }
    });

    const onSubmitAddress = (data:FormData) =>{
        console.log(data)
    }

  return (
    <ShopLayout title="Direccion" pageDescription="Confirmar direccion del destino">
        <form onSubmit={handleSubmit(onSubmitAddress)}>

            
            <Typography variant='h1' component='h1'>Direccion</Typography>

            <Grid container spacing={2} sx={{mt:2}}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label="Nombre" 
                        variant="filled" 
                        fullWidth
                        {...register('firstName',{
                            required:'Este campo es requerido'
                        })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Apellido" 
                    variant="filled" 
                    fullWidth
                    {...register('lastName',{
                        required:'Este campo es requerido'
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Direccion" 
                    variant="filled" 
                    fullWidth
                    {...register('address',{
                        required: 'Este campo es requerido'
                    })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Codigo Postal" 
                    variant="filled" 
                    fullWidth
                    {...register('zip',{
                        required: 'Este campo es requerido'
                    })}
                    error={!!errors.zip}
                    helperText={errors.zip?.message}
                    
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextField
                        select
                        variant="filled"
                        label="Pais"
                        defaultValue={countries[0].code}
                        {...register('country',{
                            required:'Este campo es requerido'
                        })}
                        error={!!errors.country}
                        value={1}
                        >
                            {
                                countries.map(country=>(
                                    <MenuItem
                                    key={country.code}
                                    value={country.code}
                                    
                                    >{country.name}</MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Telefono" 
                    variant="filled" 
                    fullWidth
                    {...register('phone',{
                        required: 'Este campo es requerido'
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    />
                </Grid>
            </Grid>

            <Box sx={{mt:5}} display='flex' justifyContent='center'>
                <Button  color="secondary" className="circular-btn" size="large">
                    Revisar Pedido
                </Button>
            </Box>
        </form> 
    </ShopLayout>
  )
}



/*export const getServerSideProps: GetServerSideProps = async({req}) =>{
    
    
    const { token= ''} = req.cookies;
    let IsValidToken = false;

    try {
        await jwt.isValidToken(token);
        IsValidToken = true;
    } catch (error) {
        IsValidToken = false;
    }

    if(!IsValidToken){
        return{
            redirect:{
                destination:'/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }
    
    return {
        props:{

        }
    }
}*/

export default AddressPage
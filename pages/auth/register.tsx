import {useState} from 'react';
import NextLink from 'next/link';
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AuthLayout } from "../../components/layouts";
import {useForm} from 'react-hook-form';

type FormData = {
    name: string;
    email: string;
    password: string;
};


const RegisterPage = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<FormData>();

    const [showError, setShowError] = useState(false);
    
    const onRegisterForm = (data:FormData) =>{

    }
  return (
    <AuthLayout title={'Ingresar'}>
        <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Nombre Completo' variant='filled' fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <TextField label='Correo' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Contraseña' type='password' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12}>
                   <Button color='secondary' className='circular-btn' size='large' fullWidth>
                       Ingresar
                   </Button>
                </Grid>


                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href="/auth/login" passHref>
                        <Link underline='always'>
                            Ya tienes una cuenta?
                        </Link>
                    </NextLink>
                </Grid> 


            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage
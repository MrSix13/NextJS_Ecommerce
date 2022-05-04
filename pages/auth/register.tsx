import {useState, useContext} from 'react';
import NextLink from 'next/link';
import { AuthContext } from '../../context';
import {useRouter} from 'next/router';
import { Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AuthLayout } from "../../components/layouts";
import {useForm} from 'react-hook-form';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';

type FormData = {
    name: string;
    email: string;
    password: string;
};

//Video numero 16

const RegisterPage = () => {

    const router = useRouter();
    const {registerUser} = useContext(AuthContext)

    const {register, handleSubmit, formState:{errors}} = useForm<FormData>();

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const onRegisterForm = async({name,email,password}:FormData) =>{

        setShowError(false);
        const { hasError, message} = await registerUser(name,email, password);

        if(hasError){
            setShowError(true);
            setErrorMessage(message!)
            setTimeout(()=>setShowError(false),3000)
            return;
        }
        router.replace('/')

        /*try {
            const {data} = await tesloApi.post('/user/register',{name,email,password});
            const {token, user} = data;
            console.log({token, user});
        } catch (error) {
            console.log('Error en las credenciales');
            setShowError(true);
            setTimeout(()=>setShowError(false), 3000)
        }*/
    }
  return (
    <AuthLayout title={'Ingresar'}>
       <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
       <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                    <Chip
                     label="No reconocemos a ese usuario / contraseña"
                     color="error"
                     icon={<ErrorOutline/>}
                     className="fadeIn"
                     sx={{display:showError ? 'flex': 'none'}}
                    
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label='Nombre Completo' 
                        variant='filled' 
                        fullWidth
                        {...register('name',{
                            required:'Este campo es requerido',
                            minLength:{value:2, message:'Minimo 2 caracteres'}
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                       type='email'
                       label='Correo' 
                       variant='filled' 
                       fullWidth
                       {...register('email',{
                           required: 'Este campo es requerido',
                           validate: validations.isEmail
                       })}
                       error={!!errors.email}
                       helperText={errors.email?.message}

                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                       label='Contraseña' 
                       type='password' 
                       variant='filled' 
                       fullWidth
                       {...register('password',{
                           required: 'Este campo es requerido',
                           minLength: {value:6, message: 'Minimo 6 caracteres'}
                       })}
                       error={!!errors.password}
                       helperText={errors.password?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                   <Button 
                     color='secondary' 
                     className='circular-btn'
                     size='large' 
                     fullWidth
                     type='submit'
                    >
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
       </form>
    </AuthLayout>
  )
}

export default RegisterPage
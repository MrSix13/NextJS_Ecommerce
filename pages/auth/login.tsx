import {useState,useContext} from 'react';
import NextLink from 'next/link';
import { Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AuthLayout } from "../../components/layouts";
import {AuthContext} from '../../context';
import {useForm} from 'react-hook-form';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';


type FormData = {
    email: string,
    password: string
}

//Video numero 19



const LoginPage = () => {

    const router = useRouter();

    const {loginUser} = useContext(AuthContext);
    const {register,handleSubmit, formState: {errors}} = useForm<FormData>()
    const [showError, setShowError] = useState(false);

    const onLoginUser = async({email, password}:FormData) =>{

        
        setShowError(false);
        
        const isValidLogin = await loginUser(email,password);
        if(!isValidLogin){
            setShowError(true);
            setTimeout(()=>setShowError(false),3000);
            return;
        }

        const destination = router.query.p?.toString() || '/';
        router.replace(destination)
        
        /*try {
            const {data} = await tesloApi.post('/user/login', {email,password});
            const {token, user} = data;
            console.log({token, user})
        } catch (error) {
            console.log("Error en las credenciales");
            setShowError(true);
            setTimeout(()=>setShowError(false), 3000)
        }*/
    }

  return (
    <AuthLayout title={'Ingresar'}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{width:350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Iniciar Sesion</Typography>
                    
                        <Chip
                         label="No reconocemos ese usuario / contrase??a"
                         color="error"
                         icon={<ErrorOutline/>}
                         className="fadeIn"
                         sx={{display: showError ? 'flex': 'none'}}
                        />
                    
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                          type="email" 
                          label='Correo' 
                          variant='filled' 
                          fullWidth
                          {...register('email',{
                              required:'Este campo es requerido',
                              validate: validations.isEmail
                          })}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                          label='Contrase??a' 
                          type='password' 
                          variant='filled' 
                          fullWidth
                          {...register('password',{
                              required:'Este campo es requerido',
                              minLength: {value: 6, message: 'Minimo 6 caracters'}
                          })}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Button 
                      type='submit'
                      color='secondary' 
                      className='circular-btn' 
                      size='large' 
                      fullWidth>
                        Ingresar
                    </Button>
                    </Grid>


                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink 
                           href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                           passHref
                        >
                            <Link underline='always'>
                                No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid> 
                    

                </Grid>
            </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
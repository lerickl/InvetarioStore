import {Input} from '@/app/ui/inputs/input'
import styles from './login.module.css'
import { EmailIcon, PasswordIcon } from '../assets/icons'
import { ButtonLogin } from '../buttons/ButtonLogin'
export const Login = () => {
  return (
    <section className={styles.section}>
 
      <form className={styles.contentLogin}>
      <h1 className='mt-8 mb-2 justify-self-center'>Login</h1>
      <div className={styles.contentInputLogin}>
        <EmailIcon/>
        <Input required typeof="email" name='email' >Email</Input>
      </div>

      <div className={styles.contentInputLogin}> 
        <PasswordIcon/>
        <Input required type="password" name='password'>Password</Input>
      </div>
      
        <ButtonLogin >Login</ButtonLogin>
      </form>
    </section>
  )
}
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { Helmet } from 'react-helmet-async';
import { useRouter } from 'next/router';

import Input from '../components/Input';
import { AUTHENTICATION } from '../constants/enum';
import Link from 'next/link';

const Auth = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [variant, setVariant] = useState(AUTHENTICATION.LOGIN);

  const onChangeField = (e: any) => {
    setInputValue({ ...inputValue, [e.target.id]: e.target.value });
  };

  const toggleVariant = useCallback(() => {
    setVariant((current) =>
      current === AUTHENTICATION.LOGIN ? AUTHENTICATION.REGISTER : AUTHENTICATION.LOGIN,
    );
    //eslint-disable-next-line
  }, [variant]);

  const login = useCallback(async () => {
    try {
      const { email, password } = inputValue;
      await signIn('credentials', {
        email,
        password,
        callbackUrl: `${router.query.redirect ? router.query.redirect : '/'}`,
      });
    } catch (error) {
      console.log(error);
    }
  }, [inputValue]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', inputValue);
      login();
    } catch (error) {
      console.log(error);
    }
  }, [inputValue, login]);

  const loginOAuth = useCallback((url: string) => {
    signIn(url, { callbackUrl: '/' });
  }, []);

  return (
    <div className="relative h-screen w-full">
      <Helmet prioritizeSeoTags>
        <title>Login</title>
        <meta name="description" content="Phimhay - phimhd" />
      </Helmet>
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <Link href={'/auth'} className='block px-12 py-5'>
          <img className="bg-cover" src="/images/logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className="flex justify-center mt-20">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === AUTHENTICATION.LOGIN ? 'Sign in' : 'Resgister'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === AUTHENTICATION.REGISTER && (
                <Input
                  label="Name"
                  id="name"
                  onChange={onChangeField}
                  value={inputValue.name}
                  type="text"
                />
              )}
              <Input
                label="Email"
                id="email"
                onChange={onChangeField}
                type="email"
                value={inputValue.email}
              />
              <Input
                label="Password"
                id="password"
                onChange={onChangeField}
                type="password"
                value={inputValue.password}
              />
            </div>
            <button
              onClick={variant === AUTHENTICATION.LOGIN ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === AUTHENTICATION.LOGIN ? 'Login' : 'Sign up'}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => loginOAuth('google')}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => loginOAuth('github')}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === AUTHENTICATION.LOGIN
                ? 'First time using Cineshin?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === AUTHENTICATION.LOGIN ? 'Create and account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

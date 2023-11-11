import Image from 'next/image';
import Input from '../components/Input';
import { useCallback, useState } from 'react';
import { AUTHENTICATION } from '../constants/enum';
import axios from 'axios';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Icons from '@/components/Icons';
import { signIn } from 'next-auth/react';

const Auth = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [variant, setVariant] = useState(AUTHENTICATION.LOGIN);

  const onChangeField = (e: any) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const toggleVariant = useCallback(() => {
    setVariant((current) =>
      current === AUTHENTICATION.LOGIN ? AUTHENTICATION.REGISTER : AUTHENTICATION.LOGIN,
    );
    //eslint-disable-next-line
  }, [variant]);

  const login = useCallback(
    async (e: any) => {
      try {
        const { email, password } = input;
        e.preventDefault();
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/profiles',
        });
      } catch (error) {
        console.log(error);
      }
    },
    [input],
  );

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', input);

      // login();
    } catch (error) {
      console.log(error);
    }
  }, [input]);

  const loginOAuth = useCallback((url: string) => {
    signIn(url, { callbackUrl: '/profiles' });
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" width={100} height={100} />
        </nav>
        <div className="flex justify-center">
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
                  value={input.name}
                  type="text"
                />
              )}
              <Input
                label="Email"
                id="email"
                onChange={onChangeField}
                type="email"
                value={input.email}
              />
              <Input
                label="Password"
                id="password"
                onChange={onChangeField}
                type="password"
                value={input.password}
              />
            </div>
            <button
              onClick={variant === AUTHENTICATION.LOGIN ? (e) => login(e) : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === AUTHENTICATION.LOGIN ? 'Login' : 'Sign up'}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <Icons onClick={() => loginOAuth('google')}>
                <FcGoogle size={30} />
              </Icons>
              <Icons onClick={() => loginOAuth('github')}>
                <FaGithub size={30} />
              </Icons>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === AUTHENTICATION.LOGIN
                ? 'First time using Netflix?'
                : 'Already have an account'}
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

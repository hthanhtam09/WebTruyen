import axios from 'axios';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { Helmet } from 'react-helmet-async';
import { useRouter } from 'next/router';

import Input from '../components/Input';
import { AUTHENTICATION } from '../enum/';
import Link from 'next/link';
import TextLight from '@/components/TextLight';

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

  return (
    <div className="relative h-screen w-full">
      <Helmet>
        <title>Login</title>
        <meta name="description" content='Đăng nhập WebTruyen' />
        {/* Các thẻ khác liên quan đến SEO */}
        <meta name="keywords" content="WebTruyen, Login" />
        <meta name="author" content="WebTruyen" />
        {/* Các thẻ Open Graph */}
        <meta property="og:title" content='WebTruyen' />
        <meta property="og:description" content='Khám phá thế giới truyện tuyệt vời tại WebTruyen - Nơi quy tụ hàng nghìn bộ truyện đa dạng và độc đáo. Tận hưởng trải nghiệm xem truyện tuyệt vời nhờ vào thư viện đa dạng của chúng tôi, nơi mỗi bộ truyện là một hành trình đặc sắc đầy ấn tượng. Hãy thưởng thức niềm đam mê điện ảnh tại WebTruyen, nơi mang đến cho bạn trải nghiệm xem truyện đỉnh cao và đa chiều.' />
        <meta property="og:image" content='WebTruyen' />
        <meta property="og:url" content='WebTruyen' />
        {/* Các thẻ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content='WebTruyen' />
        <meta name="twitter:description" content='Khám phá thế giới truyện tuyệt vời tại WebTruyen - Nơi quy tụ hàng nghìn bộ truyện đa dạng và độc đáo. Tận hưởng trải nghiệm xem truyện tuyệt vời nhờ vào thư viện đa dạng của chúng tôi, nơi mỗi bộ truyện là một hành trình đặc sắc đầy ấn tượng. Hãy thưởng thức niềm đam mê điện ảnh tại WebTruyen, nơi mang đến cho bạn trải nghiệm xem truyện đỉnh cao và đa chiều.' />
        <meta name="twitter:image" content='WebTruyen' />
      </Helmet>
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <Link href={'/auth'} className='block px-12 py-5'>
          <TextLight />
        </Link>
        <div className="flex justify-center mt-20">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === AUTHENTICATION.LOGIN ? 'Đăng nhập' : 'Đăng ký'}
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
            <p className="text-neutral-500 mt-12">
              {variant === AUTHENTICATION.LOGIN
                ? 'Lần đầu bạn tới WebTruyen?'
                : 'Đã có tài khoản rồi?'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === AUTHENTICATION.LOGIN ? 'Tạo một tài khoản' : 'Đăng nhập'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

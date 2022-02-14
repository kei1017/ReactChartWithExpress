import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import tw from 'twin.macro';

import apiClient from '../api-connect/api-connect';

const StyledPage = tw.div`relative mx-auto w-full min-h-[100vh] pt-[100px] px-4 flex justify-center items-center`;

const AuthPage = (props: any) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [locked, setLocked] = useState(false);

  async function login() {
    // GET
    // const res = await apiClient.get('/users');
    // const result = {
    //   data: res.data,
    //   headers: res.headers,
    //   status: res.status + '-' + res.statusText,
    // };
    try {
      const res = await apiClient.post(
        '/auth',
        { email, password },
        {
          headers: {
            'x-access-token': 'token-value',
          },
        }
      );
      if (res.data && res.data.length > 0) {
        localStorage.setItem('email', email);
        localStorage.setItem('username', res.data);
        toast.success(`Hi, ${res.data}! Redirecting...`);
        setUserName(res.data);
        setLocked(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        toast.error('auth failed!');
        console.error('auth failed!', res);
      }
    } catch (err: any) {
      toast.error(err.toString());
      console.error(err);
    }
  }

  async function register() {
    try {
      const res = await apiClient.post(
        '/user',
        { email, password, username },
        {
          headers: {
            'x-access-token': 'token-value',
          },
        }
      );
      if (res.data && res.data.length > 0) {
        navigate('/');
      } else {
        toast.error('register failed!');
        console.error('register failed!', res);
      }
    } catch (err: any) {
      toast.error(err.toString());
      console.error(err);
    }
  }

  return (
    <StyledPage>
      <div tw="p-4 w-full max-w-md flex flex-col justify-center items-center gap-4">
        {locked ? (
          <div>
            <p tw="py-2 text-6xl font-medium">
              Welcome,{' '}
              <span tw="text-6xl font-semibold capitalize">{username}</span>
            </p>
          </div>
        ) : (
          <>
            <h1 tw="py-2 text-4xl font-semibold">
              {props.register ? 'Register' : 'Login'}
            </h1>
            {props.register ? (
              <label tw="w-full flex flex-col">
                <span>Name:</span>
                <input
                  placeholder="Name"
                  tw="px-4 py-2 w-full outline-none border"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
            ) : null}
            <label tw="w-full flex flex-col">
              <span>Email:</span>
              <input
                placeholder="Email address"
                tw="px-4 py-2 w-full outline-none border"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label tw="w-full flex flex-col">
              <span>Password:</span>
              <input
                placeholder="Password"
                tw="px-4 py-2 w-full outline-none border"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              tw="px-4 py-2 w-full outline-none border"
              onClick={props.register ? register : login}
            >
              {props.register ? 'Register' : 'Login'}
            </button>
            {props.register ? (
              <a href="/" tw="ml-auto italic">
                Go to Login
              </a>
            ) : (
              <a href="/register" tw="ml-auto italic">
                Create an account?
              </a>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </StyledPage>
  );
};

export default AuthPage;

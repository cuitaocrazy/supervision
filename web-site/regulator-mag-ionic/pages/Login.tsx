import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext, useCallback } from 'react';
import { AppContext, setloginUser } from '../appState';
import { useRouter } from 'next/router';
import { edbLoginURL } from 'const/const';
import localforage from 'localforage';

type FormData = {
  username: string;
  password: string;
  role: string;
};
const loginStr = edbLoginURL;

const Login = () => {
  console.log('login');
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const refreshUserInfo = useCallback((userInfo: any) => {
    dispatch(setloginUser(userInfo));
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    fetch(loginStr, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(async json => {
        const { result, msg, loginUser } = json;
        if (result) {
          localforage.setItem('loginName', result.loginName);
          // window.loginUser = result.loginName;
          await router.push('./tabs/statistics/supervisorAccount');
          // router.reload();
        } else {
          alert(msg);
        }
      });
  };
  console.log(state);
  if (state.loginUser.loginName && state.loginUser.loginName !== '') {
    router.push('./tabs/orgMag/query');
    // return <Redirect to="/tabs/home" />;
  }

  return (
    <div className="flex h-screen bg-primary-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-12 px-6 py-10 pt-4 mx-auto my-auto rounded-lg shadow-md bg-primary-400 border-primaryColor-300 w-80"
      >
        <fieldset>
          <legend className="text-xl font-semibold text-center text-white ">教育局监管系统</legend>
          <p className="mb-4 text-sm text-white">Education Bureau Supervision System</p>
          <div>
            <input
              type="text"
              value="suptest"
              className="relative block w-full px-1 py-2 pl-2 text-sm bg-white border rounded-lg border-primary-200 focus:outline-none focus:glow-primary-500"
              {...register('username', { required: true })}
              placeholder="请输入登录名"
            />
            {errors.username && (
              <p className="pt-2 pl-3 text-base text-remind-500">用户名不能为空</p>
            )}
          </div>
          <div className="mt-6">
            <input
              type="password"
              value="suptest"
              className="relative block w-full px-1 py-2 pl-2 text-sm bg-white border rounded-lg border-primary-200 focus:outline-none focus:glow-primary-500"
              {...register('password', { required: true })}
              placeholder="请输入密码"
            />
            {errors.password && <p className="pt-2 pl-3 text-base text-remind-500">密码不能为空</p>}
          </div>
        </fieldset>
        <input
          type="submit"
          className="w-full py-3 my-10 mb-1 text-base font-medium text-white rounded-lg shadow-md bg-primary-600 focus:outline-none hover:bg-primary-700 hover:shadow-none"
          value="登录"
        />
      </form>
    </div>
  );
};

export default Login;

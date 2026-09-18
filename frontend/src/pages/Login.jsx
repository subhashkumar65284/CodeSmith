import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod';

function Login() {
  const loginSchema = z.object({    
    email: z.string().email('Invalid email address').toLowerCase().trim(),
    
    password: z
    .string()
    .trim()
    .min(8)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
  });
  const { register, handleSubmit,formState:{errors} } = useForm({resolver:zodResolver(loginSchema)});
  return (
    <>
    <div className="form-container flex flex-col justify-center items-center">
        <form
          className="glass gap-2 flex flex-col justify-center items-center min-[960px]:min-w-[50%] bg-cyan-950 px-7 py-12 rounded-2xl"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="flex flex-col gap-1 mb-3.5">
            <img src="/favicon.svg" className="h-[5em] opacity-100" />
            <h1 className="font-black text-2xl">CodeSmith</h1>
          </div>

          {/*Email input*/}
          <label className="input min-w-[70%] focus-within:outline-none focus-within:ring-0 focus-within:border-transparent rounded-2xl">
            <img src="src/assets/email-icon.svg" className="h-[1em] opacity-100" />
            <input
              type="email"
              {...register("email")}
              autoComplete="email"
              placeholder="johnDoe@gmail.com"
            />
          </label>
          {errors.email && <span className="text-error">{errors.email.message}</span>}

          {/* Password Input */}
          <label className="input min-w-[70%] focus-within:outline-none focus-within:ring-0 focus-within:border-transparent rounded-2xl">
            <img
              src="src/assets/password-icon.svg"
              alt=""
              className="h-[1em] opacity-100"
            />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
          </label>
          {errors.password && <span className="text-error">{errors.password.message}</span>}
          {/* form submit */}
          <input className="btn btn-md btn-accent rounded-2xl" type="submit" value="Login"/>
          <h4>or login with,</h4>
          <div className="flex gap-2.5">
            {/* Google */}
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <img src="src/assets/google-icon.svg" alt="" className="h-[1em]"/>
            Google
          </button>
          {/* GitHub */}
          <button className="btn bg-black text-white border-black">
            <img src="src/assets/github-icon.svg" alt="" className="h-[1em]" />
            GitHub
          </button>
          </div>
          <h4 className="mt-2.5 ">New user? <a className="cursor-pointer text-blue-500">Register</a></h4>
        </form>
      </div>
    </>
  )
}

export default Login;
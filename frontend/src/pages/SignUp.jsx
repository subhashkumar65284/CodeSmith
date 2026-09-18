import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod';

function SignUp() {
  const signupSchema = z.object({
    firstName: z.string().min(3, 'First name is required').trim(),
    lastName: z.string().trim(),
    email: z.string().email('Invalid email address').toLowerCase().trim(),
    
    password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
  });

  const { register, handleSubmit,formState :{errors} } = useForm({resolver:zodResolver(signupSchema)});

  return (
    <>
      <div className="form-container flex flex-col justify-center items-center">
        <form
          className="glass gap-2 flex flex-col justify-center items-center min-[960px]:min-w-[50%] bg-cyan-950 px-7 py-7 rounded-2xl"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="flex flex-col gap-1 mb-3.5">
            <img src="/favicon.svg" className="h-[5em] opacity-100" />
            <h1 className="font-black text-2xl">CodeSmith</h1>
          </div>
          {/*First Name input*/}
          <label className="input min-w-[70%] focus-within:outline-none focus-within:ring-0 focus-within:border-transparent rounded-2xl">
            <img src="src/assets/user-icon.svg" className="h-[1em] opacity-100" />
            <input
              type="text"
              {...register("firstName")}
              autoComplete="name"
              placeholder="john"
            />
          </label>
          {errors.firstName && (<span className="text-error text-xs">{errors.firstName.message}</span>)}

          {/*Last Name input*/}
          <label className="input min-w-[70%] focus-within:outline-none focus-within:ring-0 focus-within:border-transparent rounded-2xl">
            <img src="src/assets/user-icon.svg" className="h-[1em] opacity-100" />
            <input
              type="text"
              {...register("lastName")}
              autoComplete="name"
              placeholder="Doe"
            />
          </label>

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
          {errors.email && (<span className="text-error text-xs">{errors.email.message}</span>)}

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
          {errors.password && (<span className="text-error text-xs">{errors.password.message}</span>)}

          {/* form submit */}
          <input className="btn btn-accent btn-md rounded-2xl" type="submit" value="Register"/>

          <h4>or continue with,</h4>
          <div className="flex gap-3.5">
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
          <h4 className="mt-2.5 ">Already have an account? <a className="cursor-pointer text-blue-500">SignIn</a></h4>
        </form>
      </div>
    </>
  );
}

export default SignUp;

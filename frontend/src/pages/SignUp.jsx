import { useForm } from 'react-hook-form';

function SignUp() {
  const { register, handleSubmit } = useForm()
  return (
    <>
    <div className='form-container flex flex-col justify-center items-center'>
    <form className='gap-2 flex flex-col justify-center items-center bg-cyan-950 px-18 py-12 rounded-2xl' 
    onSubmit={handleSubmit((data) => console.log(data))}>
      <div className='flex flex-col gap-1 mb-3.5'>
        <img
          src="/favicon.svg"
          className="h-[5em] opacity-100"
        />
        <h1 className='font-black text-2xl'>CodeSmith</h1>
      </div>
      {/*First Name input*/}
      <label className="input focus-within:outline-none focus-within:ring-0 focus-within:border-transparent">
        <img
          src="/user-icon.svg"
          className="h-[1em] opacity-100"
        />
      <input
        type="text" 
        {...register('firstName')}
        autoComplete='name'
        placeholder="john"
      />
      </label>

      {/*Last Name input*/}
      <label className="input focus-within:outline-none focus-within:ring-0 focus-within:border-transparent">
        <img
          src="/user-icon.svg"
          className="h-[1em] opacity-100"
        />
      <input
        type="text" 
        {...register('lastName')}
        autoComplete='name'
        placeholder="Doe"
      />
      </label>
      
      {/*Email input*/}
      <label className="input focus-within:outline-none focus-within:ring-0 focus-within:border-transparent">
        <img
          src="/email-icon.svg"
          className="h-[1em] opacity-100"
        />
      <input
        type="email" 
        {...register('email')}
        autoComplete='email'
        placeholder="johnDoe@gmail.com"
      />
      </label>

      {/* Password Input */}
      <label className="input focus-within:outline-none focus-within:ring-0 focus-within:border-transparent">
        <img
          src="/password-icon.svg"
          alt=""
          className="h-[1em] opacity-100"
        />
      <input
        type="password" 
        {...register('password')}
        placeholder="Password"
      />
    </label>
    {/* form submit */}
          <input className='btn btn-md rounded-xl' type="submit"/>
    </form>
    </div>
    </>
  )
}

export default SignUp;
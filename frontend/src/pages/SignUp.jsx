import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../slices/authSlice";

function SignUp() {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const signupSchema = z.object({
    firstName: z.string().min(3, "First name is required").trim(),
    lastName: z.string().trim(),
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/[0-9]/, "Must contain number")
      .regex(/[^A-Za-z0-9]/, "Must contain special character"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };
  const onLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-full bg-[#030014] text-white flex items-center justify-center p-4 sm:p-6 selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[70%] h-[70%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-6xl bg-white/2 border border-white/5 rounded-3xl flex overflow-hidden shadow-2xl relative z-10 backdrop-blur-xl transition-all">
        {/* Left Side - Branding & Aesthetics */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-linear-to-br from-indigo-950/40 to-purple-950/40 border-r border-white/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay"></div>

          {/* Logo Area */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-linear-to-br rounded-xl flex items-center justify-center ">
              <img src="/favicon.svg" className="h-16 w-16" />
            </div>
            <h1 className="font-bold text-3xl tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
              CodeSmith
            </h1>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 space-y-6 my-auto pt-12 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 font-medium shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              <span>The future of coding</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.15]">
              Master the art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                software craft.
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-md leading-relaxed">
              Join a community of elite developers. Build, learn, and elevate
              your coding skills to the next level.
            </p>
          </div>

          {/* Floating UI Element */}
          <div className="absolute right-[-10%] top-[40%] w-72 h-auto bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md -rotate-6 flex flex-col p-6 gap-4 shadow-2xl pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <TerminalSquare className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <div className="h-2 w-24 bg-white/20 rounded-full"></div>
                <div className="h-2 w-16 bg-white/10 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2.5 mt-2">
              <div className="h-2 w-full bg-white/10 rounded-full"></div>
              <div className="h-2 w-4/5 bg-white/10 rounded-full"></div>
              <div className="h-2 w-full bg-white/10 rounded-full"></div>
            </div>
            <div className="mt-4 h-10 w-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-lg"></div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative">
          <div className="max-w-md w-full mx-auto space-y-4">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-1">Create an account</h3>
              <p className="text-white/50 text-sm">
                Enter your details to get started with CodeSmith.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/80">
                    First Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40 group-focus-within:text-indigo-400 transition-colors">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <input
                      type="text"
                      {...register("firstName")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-400 text-[10px] leading-tight mt-0.5 pl-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/80">
                    Last Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40 group-focus-within:text-indigo-400 transition-colors">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <input
                      type="text"
                      {...register("lastName")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/80">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40 group-focus-within:text-indigo-400 transition-colors">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-[10px] leading-tight mt-0.5 pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/80">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40 group-focus-within:text-indigo-400 transition-colors">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-[10px] leading-tight mt-0.5 pl-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 group mt-3"
              >
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="flex items-center gap-3 pt-2">
              <div className="h-px w-full bg-white/10"></div>
              <span className="shrink-0 text-white/40 text-sm">
                Or continue with
              </span>
              <div className="h-px w-full bg-white/10"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </button>
            </div>

            <p className="text-center text-sm text-white/50 pt-2">
              Already have an account?{" "}
              <a
                onClick={onLoginClick}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

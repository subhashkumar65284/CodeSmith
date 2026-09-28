import { useSelector } from 'react-redux';
import { User, Mail, Award, Activity, ShieldCheck, Calendar } from 'lucide-react';


export default function Profile() {
  const { user } = useSelector(state => state.auth);
  if (!user) return null;

  const solvedCount = user.problemSolved?.length || 0;
  const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null;

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full text-white p-6 md:p-12 relative overflow-hidden flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-700/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-700/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10 mt-4 md:mt-10">

        {/* Header Section */}
        <div className="profile-header flex flex-col md:flex-row items-center md:items-start gap-8 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl mb-8">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-[#030014] flex items-center justify-center text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
                {initials}
              </div>
            </div>
            {user.role === 'admin' && (
              <div className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full shadow-lg border-2 border-[#030014]" title="Admin">
                <ShieldCheck className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-indigo-400 font-medium text-lg mt-1 flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-5 h-5" /> {user.email}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
              <div className="badge badge-lg bg-indigo-600/20 text-indigo-300 border-indigo-500/30 p-4 gap-2 rounded-xl">
                <User className="w-4 h-4" />
                {user.role === 'admin' ? 'Administrator' : 'Developer'}
              </div>
              <div className="badge badge-lg bg-purple-600/20 text-purple-300 border-purple-500/30 p-4 gap-2 rounded-xl">
                <Calendar className="w-4 h-4" />
                Joined {joinDate || 'Recently'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="profile-card bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-white/60 font-medium mb-1">Problems Solved</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{solvedCount}</span>
              <span className="text-white/40 text-sm font-medium">total</span>
            </div>
          </div>

          <div className="profile-card bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-white/60 font-medium mb-1">Activity Level</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{solvedCount > 50 ? 'Expert' : solvedCount > 10 ? 'Intermediate' : 'Beginner'}</span>
            </div>
            <progress className="progress progress-primary w-full mt-4 bg-white/10" value={Math.min(solvedCount * 2, 100)} max="100"></progress>
          </div>
        </div>

      </div>
    </div>
  );
}

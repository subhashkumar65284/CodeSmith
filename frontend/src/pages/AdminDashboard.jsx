import { useNavigate } from "react-router";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-[#030014] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
          Admin Dashboard
        </h1>
        <p className="text-white/60 text-center mb-12">
          Manage platform problems. Select an action below to proceed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Card */}
          <div
            onClick={() => navigate("/admin/create")}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/10 hover:border-indigo-500/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold">Create Problem</h2>
            <p className="text-white/50 text-sm text-center">
              Add a new coding problem to the platform.
            </p>
          </div>

          {/* Update Card */}
          <div
            onClick={() => navigate("/admin/update")}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/10 hover:border-purple-500/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Edit className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold">Update Problem</h2>
            <p className="text-white/50 text-sm text-center">
              Modify an existing problem's details or test cases.
            </p>
          </div>

          {/* Delete Card */}
          <div
            onClick={() => navigate("/admin/delete")}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/10 hover:border-pink-500/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trash2 className="w-8 h-8 text-pink-400" />
            </div>
            <h2 className="text-xl font-semibold">Delete Problem</h2>
            <p className="text-white/50 text-sm text-center">
              Remove a problem entirely from the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

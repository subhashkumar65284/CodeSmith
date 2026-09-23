import { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Search, Check } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import axiosClient from "../utils/axiosClient";

export default function AdminDeleteProblem() {
  const navigate = useNavigate();
  const [problemId, setProblemId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchProblems(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchProblems = async (query) => {
    setIsSearching(true);
    try {
      const response = await axiosClient.get("problem/", {
        params: { search: query, limit: 5 }
      });
      setSearchResults(response.data.problems || []);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectProblem = (id) => {
    setProblemId(id);
    setSearchTerm("");
    setSearchResults([]);
    setSubmitError("");
    setSuccess(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!problemId) {
      setSubmitError("Please select a problem to delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this problem? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    setSubmitError("");
    setSuccess(false);

    try {
      const response = await axiosClient.delete(`problem/admin/${problemId}`);
      
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate("/admin"), 2000);
      }
    } catch (error) {
      setSubmitError(error.response?.data || "An error occurred while deleting the problem.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#030014] text-white p-6 sm:p-10 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl relative backdrop-blur-xl">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
            <Trash2 className="w-8 h-8 text-pink-400" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center">Delete Problem</h1>
          <p className="text-white/50 text-sm text-center mt-2">
            Search for a problem to permanently delete.
          </p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {typeof submitError === 'string' ? submitError : 'Error deleting problem'}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
            Problem deleted successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleDelete} className="space-y-6">
          <div className="space-y-1 relative">
            <label className="text-xs font-medium text-white/80">Search Problem</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <Search className="w-4.5 h-4.5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all placeholder:text-white/20"
                placeholder="Type problem title..."
              />
            </div>
            
            {/* Dropdown Results */}
            {searchTerm.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0B0A1A] border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl max-h-60 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-sm text-white/50">Searching...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map(prob => (
                    <div 
                      key={prob._id} 
                      onClick={() => selectProblem(prob._id)}
                      className="p-3 hover:bg-white/5 border-b border-white/5 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <h4 className="text-sm font-medium text-white">{prob.title}</h4>
                        <p className="text-xs text-white/50 capitalize">{prob.difficulty}</p>
                      </div>
                      {problemId === prob._id && <Check className="w-4 h-4 text-pink-400" />}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-white/50">No problems found</div>
                )}
              </div>
            )}
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-sm">
            <span className="text-white/60">Selected ID: </span>
            <span className="font-mono text-white/90">{problemId || "None"}</span>
          </div>

          <button
            type="submit"
            disabled={isDeleting || !problemId}
            className="w-full bg-pink-600 hover:bg-pink-500 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isDeleting ? "Deleting..." : "Delete Problem"}
          </button>
        </form>
      </div>
    </div>
  );
}

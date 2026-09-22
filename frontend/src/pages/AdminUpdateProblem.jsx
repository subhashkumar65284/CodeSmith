import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Plus, Trash2, Search, Check } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";

const problemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  topics: z.array(z.string()).min(1, "At least one topic is required"),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().min(1, "Explanation is required"),
    })
  ).min(1, "At least one visible test case is required"),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
    })
  ).min(1, "At least one hidden test case is required"),
  boilerPlateCode: z.array(
    z.object({
      language: z.enum(["java", "cpp", "python"]),
      boilerPlate: z.string().min(1, "Boilerplate code is required"),
    })
  ).length(3, "All three languages are required"),
  referenceSolution: z.array(
    z.object({
      language: z.enum(["java", "cpp", "python"]),
      code: z.string().min(1, "Reference code is required"),
    })
  ).length(3, "All three reference solutions are required"),
});

export default function AdminUpdateProblem() {
  const navigate = useNavigate();
  const [problemId, setProblemId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [fetchError, setFetchError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      topics: [],
      visibleTestCases: [],
      hiddenTestCases: [],
      boilerPlateCode: [
        { language: "java", boilerPlate: "" },
        { language: "cpp", boilerPlate: "" },
        { language: "python", boilerPlate: "" },
      ],
      referenceSolution: [
        { language: "java", code: "" },
        { language: "cpp", code: "" },
        { language: "python", code: "" },
      ],
    },
  });

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({
    control,
    name: "visibleTestCases",
  });

  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } = useFieldArray({
    control,
    name: "hiddenTestCases",
  });

  const { fields: boilerFields } = useFieldArray({
    control,
    name: "boilerPlateCode",
  });

  const { fields: referenceFields } = useFieldArray({
    control,
    name: "referenceSolution",
  });

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

  const selectProblem = async (id) => {
    setProblemId(id);
    setSearchTerm("");
    setSearchResults([]);
    setIsFetching(true);
    setFetchError("");
    setSuccess(false);
    
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/problems/${id}`);
      if (response.data) {
        const p = response.data;
        
        // Ensure boilerplate and reference have all 3 languages correctly ordered
        const langs = ["java", "cpp", "python"];
        const formatArray = (arr, field) => {
          return langs.map(lang => {
            const found = (arr || []).find(item => item.language === lang);
            return found ? { language: lang, [field]: found[field] } : { language: lang, [field]: "" };
          });
        };

        reset({
          title: p.title || "",
          description: p.description || "",
          difficulty: p.difficulty || "easy",
          topics: p.topics || [],
          visibleTestCases: p.visibleTestCases || [],
          hiddenTestCases: p.hiddenTestCases || [{ input: "", output: "" }],
          boilerPlateCode: formatArray(p.boilerPlateCode, "boilerPlate"),
          referenceSolution: formatArray(p.referenceSolution, "code"),
        });
      }
    } catch (error) {
      setFetchError(error.response?.data?.message || "Failed to fetch problem. Ensure ID is correct.");
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    if (!problemId) {
      setSubmitError("Please select a problem first");
      return;
    }
    setSubmitError("");
    setSuccess(false);
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/problems/${problemId}`, data, {
        withCredentials: true
      });
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/admin"), 2000);
      }
    } catch (error) {
      setSubmitError(error.response?.data?.message || error.response?.data?.error || "An error occurred during update");
    }
  };

  const handleTopicsChange = (e) => {
    const val = e.target.value;
    const topicsArray = val.split(",").map(t => t.trim()).filter(t => t);
    setValue("topics", topicsArray);
  };

  return (
    <div className="w-full min-h-screen bg-[#030014] text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl relative backdrop-blur-xl">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mb-6 text-white">Update Problem</h1>

        {/* Search Section */}
        <div className="relative mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-white/20"
              placeholder="Search problem by title..."
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
                    {problemId === prob._id && <Check className="w-4 h-4 text-purple-400" />}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-white/50">No problems found</div>
              )}
            </div>
          )}
        </div>

        {isFetching && (
          <div className="mb-6 p-4 text-center text-purple-400 text-sm">
            Fetching problem details...
          </div>
        )}

        {fetchError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {fetchError}
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {submitError}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
            Problem updated successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-400 border-b border-white/10 pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/80">Title</label>
                <input
                  {...register("title")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/80">Difficulty</label>
                <select
                  {...register("difficulty")}
                  className="w-full bg-[#0B0A1A] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                {errors.difficulty && <p className="text-red-400 text-xs">{errors.difficulty.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white/80">Description</label>
              <textarea
                {...register("description")}
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              ></textarea>
              {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white/80">Topics (comma separated)</label>
              <input
                onChange={handleTopicsChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="math, arrays, hash table"
              />
              <p className="text-white/40 text-xs mt-1">Note: Please manually re-enter topics if modifying them, as this UI resets them upon select.</p>
              {errors.topics && <p className="text-red-400 text-xs">{errors.topics.message}</p>}
            </div>
          </div>

          {/* Visible Test Cases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold text-purple-400">Visible Test Cases</h2>
              <button
                type="button"
                onClick={() => appendVisible({ input: "", output: "", explanation: "" })}
                className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded hover:bg-purple-500/30"
              >
                <Plus className="w-3 h-3" /> Add Case
              </button>
            </div>
            
            {visibleFields.map((field, index) => (
              <div key={field.id} className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-3 relative">
                <button
                  type="button"
                  onClick={() => removeVisible(index)}
                  className="absolute top-3 right-3 text-white/40 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/60">Input</label>
                    <textarea {...register(`visibleTestCases.${index}.input`)} className="w-full bg-[#0B0A1A] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono"></textarea>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/60">Output</label>
                    <textarea {...register(`visibleTestCases.${index}.output`)} className="w-full bg-[#0B0A1A] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono"></textarea>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/60">Explanation</label>
                  <input {...register(`visibleTestCases.${index}.explanation`)} className="w-full bg-[#0B0A1A] border border-white/10 rounded-lg px-3 py-1.5 text-xs" />
                </div>
              </div>
            ))}
          </div>

          {/* Hidden Test Cases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold text-purple-400">Hidden Test Cases (Will overwrite all existing)</h2>
              <button
                type="button"
                onClick={() => appendHidden({ input: "", output: "" })}
                className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded hover:bg-purple-500/30"
              >
                <Plus className="w-3 h-3" /> Add Case
              </button>
            </div>
            
            {hiddenFields.map((field, index) => (
              <div key={field.id} className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-3 relative">
                <button
                  type="button"
                  onClick={() => removeHidden(index)}
                  className="absolute top-3 right-3 text-white/40 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/60">Input</label>
                    <textarea {...register(`hiddenTestCases.${index}.input`)} className="w-full bg-[#0B0A1A] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono"></textarea>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/60">Output</label>
                    <textarea {...register(`hiddenTestCases.${index}.output`)} className="w-full bg-[#0B0A1A] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono"></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Boilerplate Code */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold text-purple-400">Boilerplate Code (All Languages Required)</h2>
            </div>
            
            {boilerFields.map((field, index) => (
              <div key={field.id} className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-3 relative">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/60">Language</label>
                  <input {...register(`boilerPlateCode.${index}.language`)} readOnly className="w-full md:w-1/3 bg-[#0B0A1A] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/50 focus:outline-none cursor-not-allowed" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/60">Code</label>
                  <textarea rows="4" {...register(`boilerPlateCode.${index}.boilerPlate`)} className="w-full bg-[#0B0A1A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none"></textarea>
                </div>
              </div>
            ))}
          </div>

          {/* Reference Solution */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold text-purple-400">Reference Solution (All Languages Required)</h2>
            </div>
            
            {referenceFields.map((field, index) => (
              <div key={field.id} className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-3 relative">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/60">Language</label>
                  <input {...register(`referenceSolution.${index}.language`)} readOnly className="w-full md:w-1/3 bg-[#0B0A1A] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/50 focus:outline-none cursor-not-allowed" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/60">Code</label>
                  <textarea rows="6" {...register(`referenceSolution.${index}.code`)} className="w-full bg-[#0B0A1A] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none"></textarea>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !problemId}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Problem"}
          </button>
        </form>
      </div>
    </div>
  );
}

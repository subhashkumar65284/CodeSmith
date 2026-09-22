import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";

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

export default function AdminCreateProblem() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      topics: [],
      visibleTestCases: [{ input: "", output: "", explanation: "" }],
      hiddenTestCases: [{ input: "", output: "" }],
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

  const onSubmit = async (data) => {
    setSubmitError("");
    setSuccess(false);
    try {
      // Assuming API expects auth token which should be handled by axios interceptors or withCredentials
      const response = await axios.post("http://localhost:3000/api/v1/problems", data, {
        withCredentials: true
      });
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/admin"), 2000);
      }
    } catch (error) {
      setSubmitError(error.response?.data?.message || error.response?.data?.error || "An error occurred");
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

        <h1 className="text-2xl font-bold mb-6 text-white">Create New Problem</h1>

        {submitError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {submitError}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
            Problem created successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-indigo-400 border-b border-white/10 pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/80">Title</label>
                <input
                  {...register("title")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Problem Title"
                />
                {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/80">Difficulty</label>
                <select
                  {...register("difficulty")}
                  className="w-full bg-[#0B0A1A] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white"
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
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Problem description and constraints..."
              ></textarea>
              {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white/80">Topics (comma separated)</label>
              <input
                onChange={handleTopicsChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="math, arrays, hash table"
              />
              {errors.topics && <p className="text-red-400 text-xs">{errors.topics.message}</p>}
            </div>
          </div>

          {/* Visible Test Cases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold text-indigo-400">Visible Test Cases</h2>
              <button
                type="button"
                onClick={() => appendVisible({ input: "", output: "", explanation: "" })}
                className="flex items-center gap-1 text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded hover:bg-indigo-500/30"
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
            {errors.visibleTestCases && <p className="text-red-400 text-xs">{errors.visibleTestCases.message}</p>}
          </div>

          {/* Hidden Test Cases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold text-indigo-400">Hidden Test Cases</h2>
              <button
                type="button"
                onClick={() => appendHidden({ input: "", output: "" })}
                className="flex items-center gap-1 text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded hover:bg-indigo-500/30"
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
            {errors.hiddenTestCases && <p className="text-red-400 text-xs">{errors.hiddenTestCases.message}</p>}
          </div>

          {/* Boilerplate Code */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold text-indigo-400">Boilerplate Code (All Languages Required)</h2>
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
            {errors.boilerPlateCode && <p className="text-red-400 text-xs">{errors.boilerPlateCode.message}</p>}
          </div>

          {/* Reference Solution */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold text-indigo-400">Reference Solution (All Languages Required)</h2>
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
            {errors.referenceSolution && <p className="text-red-400 text-xs">{errors.referenceSolution.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Create Problem"}
          </button>
        </form>
      </div>
    </div>
  );
}

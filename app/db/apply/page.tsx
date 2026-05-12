"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"

const DEPARTMENTS = [
  "Admin Team",
  "Medical Student Advisory Council",
  "Marketing",
  "Publications",
  "HR",
  "Events",
  "Technology",
  "Finance",
  "Podcast",
  "Ambassadors"
]

const ROLES_BY_DEPARTMENT: Record<string, string[]> = {
  "Admin Team": [
    "Executive Director",
    "Deputy Executive Director",
    "Executive Assistant"
  ],
  "Medical Student Advisory Council": [
    "Chair of the Medical Student Advisory Council",
    "Member of the Medical Student Advisory Council"
  ],
  "Marketing": ["Director", "Deputy Director", "Coordinator"],
  "Publications": ["Director", "Deputy Director", "Coordinator"],
  "HR": ["Director", "Deputy Director", "Coordinator"],
  "Events": ["Director", "Deputy Director", "Coordinator"],
  "Technology": ["Director", "Deputy Director", "Coordinator"],
  "Finance": ["Director", "Deputy Director", "Coordinator"],
  "Podcast": ["Deputy Director", "Member of Podcast"],
  "Ambassadors": ["Deputy Director", "Organizational Ambassador"],
}

export default function DbApplyPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    
    // Handle image upload first
    const imageFile = formData.get("image") as File
    if (!imageFile || imageFile.size === 0) {
      setMessage({ type: "error", text: "Profile image is required" })
      setLoading(false)
      return
    }

    if (imageFile.size > 2.5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image size exceeds 2.5 MB limit" })
      setLoading(false)
      return
    }

    let imageUrl = ""
    try {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatar")
        .upload(fileName, imageFile)

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      const { data: { publicUrl } } = supabase.storage
        .from("avatar")
        .getPublicUrl(fileName)
        
      imageUrl = publicUrl
    } catch (err: any) {
      console.error("Image upload error:", err)
      setMessage({ type: "error", text: err.message || "Failed to upload image" })
      setLoading(false)
      return
    }

    let finalRole = formData.get("role") as string
    const teamName = formData.get("teamName") as string
    if (teamName && teamName.trim() !== "") {
      finalRole = `${finalRole} - ${teamName.trim()}`
    }

    const newMember = {
      name: formData.get("name") as string,
      role: finalRole,
      department: formData.get("department") as string,
      bio: formData.get("bio") as string,
      image: imageUrl,
      socials: {
        github: (formData.get("github") as string).trim() || null,
        linkedin: (formData.get("linkedin") as string).trim() || null,
        instagram: (formData.get("instagram") as string).trim() || null,
      },
      approved: false,
    }

    try {
      // Basic validation

      if (newMember.socials.github) new URL(newMember.socials.github)
      if (newMember.socials.linkedin) new URL(newMember.socials.linkedin)
      if (newMember.socials.instagram) new URL(newMember.socials.instagram)
      
      const { error } = await supabase.from("members").insert([newMember])

      if (error) throw error

      setMessage({ type: "success", text: "✓ Application submitted successfully! We'll review it soon." })
      ;(e.target as HTMLFormElement).reset()
      setSelectedDepartment("")
      setSelectedRole("")
    } catch (err: any) {
      console.error(err)
      setMessage({ type: "error", text: `Error: ${err.message || "Invalid input"}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-2xl py-12 mx-auto px-4">
      <h1 className="text-3xl font-bold font-bricolage mb-2 text-[#1a1a1a]">Apply to Join</h1>
      <p className="text-gray-600 mb-8">Help us build an interesting community. Tell us about yourself.</p>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            message.type === "success" ? "bg-[#e8f5e9] text-[#2e7d32] border border-[#81c784]" : "bg-[#ffebee] text-[#c62828] border border-[#ef5350]"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium mb-1 text-[#1a1a1a]">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="department" className="block font-medium mb-1 text-[#1a1a1a]">Department *</label>
          <select
            id="department"
            name="department"
            required
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value)
              setSelectedRole("")
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all bg-white"
          >
            <option value="">Select a department</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="role" className="block font-medium mb-1 text-[#1a1a1a]">Role *</label>
          {selectedDepartment && ROLES_BY_DEPARTMENT[selectedDepartment] ? (
            <select
              id="role"
              name="role"
              required
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all bg-white"
            >
              <option value="">Select a role</option>
              {ROLES_BY_DEPARTMENT[selectedDepartment].map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id="role"
              name="role"
              placeholder="Select a department first"
              disabled
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all bg-gray-50 text-gray-500"
            />
          )}
        </div>

        {["Marketing", "Publications", "HR", "Events", "Technology", "Finance"].includes(selectedDepartment) && (
          <div>
            <label htmlFor="teamName" className="block font-medium mb-1 text-[#1a1a1a]">Team Name (Optional)</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              placeholder="e.g., Systems and Automation"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all"
            />
          </div>
        )}

        <div>
          <label htmlFor="bio" className="block font-medium mb-1 text-[#1a1a1a]">Bio *</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself, your interests, and what you'd like to contribute..."
            required
            className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1 text-[#1a1a1a]">Profile Image (Max 2.5 MB) *</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e8f5e9] file:text-[#2e7d32] hover:file:bg-[#c8e6c9] bg-white cursor-pointer"
          />
        </div>

        <div className="space-y-4">
          <label className="block font-medium text-[#1a1a1a]">Social Links (optional)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="github" className="block text-sm mb-1 text-gray-600">GitHub</label>
              <input
                type="url"
                id="github"
                name="github"
                placeholder="https://github.com/username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm mb-1 text-gray-600">LinkedIn</label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="instagram" className="block text-sm mb-1 text-gray-600">Instagram</label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                placeholder="https://instagram.com/username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF7D] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#4CAF7D] hover:bg-[#2d8659] text-white font-semibold text-lg rounded-lg transition-transform active:scale-95"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  )
}

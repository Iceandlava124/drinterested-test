"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supaBaseclient"

interface Member {
  id: string
  name: string
  role: string
  bio: string | null
  image_url: string
  department_id: string | null
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("status", "approved")

      if (error) {
        console.error(error)
        setError("Failed to load members.")
      } else if (data) {
        setMembers(data)
      }

      setLoading(false)
    }

    fetchMembers()
  }, [])

  if (loading) return <p>Loading members...</p>
  if (error) return <p>{error}</p>
  if (members.length === 0) return <p>No approved members yet.</p>

  // Optional: group by department
  const membersByDept: Record<string, Member[]> = {}
  members.forEach((m) => {
    const dep = m.department_id || "Unassigned"
    if (!membersByDept[dep]) membersByDept[dep] = []
    membersByDept[dep].push(m)
  })

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Approved Members</h1>
      {Object.entries(membersByDept).map(([dep, deptMembers]) => (
        <section key={dep} style={{ marginBottom: "2rem" }}>
          <h2>{dep}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {deptMembers.map((member) => (
              <div
                key={member.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <img
                  src={member.image_url}
                  alt={member.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "0.5rem",
                  }}
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                {member.bio && <p style={{ fontSize: "0.9rem" }}>{member.bio}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

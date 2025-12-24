import { supabase } from "@/lib/supaBaseclient"

export default async function MembersPage() {
  // Fetch all approved members
  const { data: members, error } = await supabase
    .from("members")
    .select("*")
    .eq("status", "approved")

  if (error) {
    console.error("Supabase error:", error)
    return <p>Error loading members</p>
  }

  if (!members || members.length === 0) {
    return <p>No approved members yet.</p>
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Approved Members</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {members.map((member) => (
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
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
            />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            {member.bio && <p style={{ fontSize: "0.9rem" }}>{member.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

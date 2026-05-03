import MembersClient from "@/components/members/MembersClient"  // relative import works fine

interface PageProps {
  params: { tab: string }
}

export default function MembersPage({ params }: PageProps) {
  return <MembersClient />
}

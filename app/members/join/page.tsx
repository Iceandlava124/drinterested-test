import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Join Our Team",
  description:
    "Join our leadership team and help inspire the next generation of healthcare professionals. Executive applications are open year-round.",
  keywords: [
    "Join Dr. Interested",
    "healthcare youth leadership",
    "pre-med student executive",
    "volunteer opportunities healthcare",
  ],
  openGraph: {
    title: "Join Our Team | Dr. Interested",
    description:
      "Join our leadership team and help inspire the next generation of healthcare professionals. Executive applications are open year-round.",
    url: "https://www.drinterested.org/members/join",
    siteName: "Dr. Interested",
    type: "website",
    images: [
      {
        url: "/websitebanner.jpg",
        width: 1920,
        height: 1080,
        alt: "Join Dr. Interested Team",
      },
    ],
  },
  alternates: {
    canonical: "https://www.drinterested.org/members/join",
  },
}

export default function JoinPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero / Banner Section */}
      <section className="bg-[#f5f1eb] py-12 md:py-16">
        <div className="container px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#405862] font-bricolage">
            Join Our Team
          </h1>
          <p className="text-lg text-[#405862]/80 mt-3 max-w-2xl mx-auto">
            Applications are open year-round and reviewed on an ongoing basis. 
            We&apos;re looking for passionate, driven students to join our 
            leadership team and help inspire the next generation of healthcare professionals.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* General Executive Card */}
            <Card className="border-[#405862]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full bg-[#f5f1eb]/20">
              <CardContent className="p-6 text-center flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-[#405862] mb-3">
                    General Executive
                  </h3>
                  <p className="text-sm text-[#405862]/80 leading-relaxed">
                    Join our core leadership team and help shape the future of
                    Dr. Interested.
                  </p>
                </div>
                <Link
                  href="https://forms.gle/e9etoCnFMPhgeujD9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4"
                >
                  <Button className="w-full bg-[#405862] hover:bg-[#334852] text-white py-5 font-medium">
                    Apply Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Org Ambassador Card */}
            <Card className="border-[#405862]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full bg-[#f5f1eb]/20">
              <CardContent className="p-6 text-center flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-[#405862] mb-3">
                    Org Ambassador
                  </h3>
                  <p className="text-sm text-[#405862]/80 leading-relaxed">
                    Represent Dr. Interested in your community and help us grow
                    our reach.
                  </p>
                </div>
                <Link
                  href="https://forms.gle/89v6zXtrdfGvMUBJ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4"
                >
                  <Button className="w-full bg-[#405862] hover:bg-[#334852] text-white py-5 font-medium">
                    Apply Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Podcast Team Card */}
            <Card className="border-[#405862]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full bg-[#f5f1eb]/20">
              <CardContent className="p-6 text-center flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-[#405862] mb-3">
                    Podcast Team
                  </h3>
                  <p className="text-sm text-[#405862]/80 leading-relaxed">
                    Help create engaging podcast content and share healthcare
                    stories.
                  </p>
                </div>
                <Link
                  href="https://forms.gle/WX7P4Vypq4ZHMEEDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4"
                >
                  <Button className="w-full bg-[#405862] hover:bg-[#334852] text-white py-5 font-medium">
                    Apply Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

          </div>

          {/* Contact Support */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-sm text-[#405862]/80">
              Have questions about joining our team?{" "}
              <Link
                href="mailto:hr@drinterested.org"
                className="text-[#4ecdc4] hover:text-[#405862] font-semibold transition-colors underline underline-offset-4"
              >
                Contact us at hr@drinterested.org
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

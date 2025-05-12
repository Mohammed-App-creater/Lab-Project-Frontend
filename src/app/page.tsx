import { ArrowRight, Code, Users, Laptop, BookOpen, Github, Linkedin, Twitter, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              CSEC-ASTU Lab
            </span>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-blue-600">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-blue-600">
              Testimonials
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Login <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </nav>
          <Link
            href="/login"
            className="md:hidden inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">CSEC-ASTU</span>
                <span className="block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Lab Portal
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                The premier platform for computer science students at ASTU to practice coding, collaborate on projects,
                and track their learning progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow hover:bg-blue-700"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 opacity-20 blur-2xl"></div>
              <div className="relative rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                <div className="overflow-hidden rounded-lg">
                  <div className="h-6 bg-gray-100"></div>
                  <div className="mt-4 space-y-4">
                    <div className="h-4 w-3/4 rounded bg-gray-100"></div>
                    <div className="h-4 rounded bg-gray-100"></div>
                    <div className="h-4 w-5/6 rounded bg-gray-100"></div>
                    <div className="h-4 w-2/3 rounded bg-gray-100"></div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100"></div>
                    <div className="h-8 w-8 rounded-full bg-emerald-100"></div>
                    <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                  </div>
                  <div className="mt-6 h-10 rounded-md bg-blue-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to <span className="text-blue-600">level up</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Our lab portal provides the tools and resources to help you succeed in your CS journey.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Code className="h-8 w-8 text-blue-600" />,
                title: "Interactive Coding Labs",
                description: "Practice coding with our interactive labs and real-time feedback system.",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Collaborative Projects",
                description: "Find teammates and work together on exciting tech projects.",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-blue-600" />,
                title: "Learning Resources",
                description: "Access curated tutorials, documentation, and learning paths.",
              },
              {
                icon: <Laptop className="h-8 w-8 text-blue-600" />,
                title: "Progress Tracking",
                description: "Monitor your skill development and completed challenges.",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Community Support",
                description: "Connect with peers and mentors for guidance and support.",
              },
              {
                icon: <Code className="h-8 w-8 text-blue-600" />,
                title: "Competitions",
                description: "Participate in coding challenges and hackathons.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by <span className="text-blue-600">ASTU students</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Here's what our members say about the CSEC-ASTU Lab Portal.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "The lab portal helped me practice for technical interviews and land my first internship. The interactive challenges were exactly what I needed!",
                name: "Kiya Kebe",
                role: "Computer Science, 4th Year",
              },
              {
                quote:
                  "I met my project team through the portal and we built an award-winning hackathon project together. The collaboration tools are fantastic.",
                name: "Mohammed Ismail",
                role: "Software Engineering, 3rd Year",
              },
              {
                quote:
                  "As a junior student, the learning paths helped me structure my studies and fill knowledge gaps I didn't even know I had.",
                name: "Temkin Mengstu",
                role: "Computer Engineering, 2nd Year",
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to boost your coding skills?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join hundreds of ASTU students already improving their skills with our lab portal.
            </p>
            <div className="mt-8">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-blue-600 shadow hover:bg-gray-100"
              >
                Get Started for Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-8">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold">CSEC-ASTU Lab</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                Terms
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} CSEC-ASTU. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
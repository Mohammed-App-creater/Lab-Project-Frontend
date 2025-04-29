import { ExternalLink } from "lucide-react"

export default function ResourcesView() {

  const resources = [
    { name: "Data science & AI challenges.", link: "https://googlecodejam.com/challenges" },
    { name: "Math-based programming problems.", link: "https://googlecodejam.com/challenges" },
    { name: "Cybersecurity & hacking challenges.", link: "https://googlecodejam.com/challenges" },
    { name: "Smart contract security challenges.", link: "https://googlecodejam.com/challenges" },
    { name: "CP contests for beginners & intermediates.", link: "https://googlecodejam.com/challenges" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <div>
        <p className="text-[#A2A1A8] mb-3">Resource Name</p>
        {resources.map((resource, index) => (
          <p key={`name-${index}`} className="mb-3">
            {resource.name}
          </p>
        ))}
      </div>
      <div>
        <p className="text-[#A2A1A8] mb-3">Link</p>
        {resources.map((resource, index) => (
          <p key={`link-${index}`} className="mb-3 flex items-center">
            <a href={resource.link} className="text-[#16151C] hover:underline" target="_blank" rel="noopener noreferrer">
              {resource.link}
            </a>
            <ExternalLink className="h-4 w-6 ml-10 text-black" />
          </p>
        ))}
      </div>
    </div>
  )
}

import { ExternalLink } from 'lucide-react'

interface ResourceCardProps {
  name: string
  url: string
}

export default function ResourceCard({ name, url }: ResourceCardProps) {
  return (
    <div className="py-3 px-4 border-b last:border-b-0 flex items-center">
      <div className="text-gray-400 mr-3">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label={`Open ${name} in new tab`}
        className="text-gray-400 hover:text-gray-600 "
      >
        <ExternalLink className="h-5 w-5" /> 
      </a> 
     
      </div>
      <div className="flex-grow">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{url}</div>
      </div>
    
    </div>
  )
}

import { ExternalLink } from 'lucide-react'

interface ResourceCardProps {
  name: string
  url: string
}

export default function ResourceCard({ name, url }: ResourceCardProps) {
  return (
    <div className="py-3 px-4 border-b dark:border-gray-700 last:border-b-0 flex items-center">
      <div className="text-gray-400 dark:text-gray-500 mr-3">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={`Open ${name} in new tab`}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <ExternalLink className="h-5 w-5" /> 
        </a> 
      </div>
      <div className="flex-grow">
        <div className="font-medium text-gray-900 dark:text-white">{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{url}</div>
      </div>
    </div>
  )
}

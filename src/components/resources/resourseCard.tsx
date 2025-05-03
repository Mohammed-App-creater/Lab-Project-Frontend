import { ExternalLink } from "lucide-react";
import { CiEdit } from "react-icons/ci";

interface ResourceCardProps {
  name: string;
  url: string;
}

export default function ResourceCard({ name, url }: ResourceCardProps) {
  return (
    <div className="py-3 px-4  flex items-center">
      <div className="text-gray-400 ml-8 flex justify-between ">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} in new tab`}
          className="text-gray-400 hover:text-gray-600 ">
          <ExternalLink className="h-4 w-5 text-[#16151CCC]" />
        </a>
        
      </div>

      <div className="flex-grow">
        <div className="font-medium text-[#16151C]">{name}</div>
        <div className="text-sm text-[#A2A1A8]">{url}</div>
      </div>
      <div className="text-[#16151C] mr-2">
          <CiEdit className="w-5 h-5"/>
        </div>
    </div>
  );
}

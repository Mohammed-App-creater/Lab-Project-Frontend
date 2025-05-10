import { ExternalLink } from "lucide-react";
import { Card } from "../ui/card";

interface ResourceCardProps {
  name: string;
  url: string;
}

export default function ResourceCard({ name, url }: ResourceCardProps) {
  return (
    <Card className="p-3 sm:p-4 hover:bg-gray-50  dark:border-gray-700 transition-colors">
      <div className="flex items-start gap-3 dark:text-gray-500">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} in new tab`}
          className="text-gray-400 hover:text-gray-600 mt-1 flex-shrink-0">
          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
        </a>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-gray-900 truncate dark:text-white">
            {name}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700 truncate block dark:text-gray-400">
            {url}
          </a>
        </div>
      </div>
    </Card>
  );
}

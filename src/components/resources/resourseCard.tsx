import { ExternalLink } from "lucide-react";
import { Card } from "../ui/card";

interface ResourceCardProps {
  name: string;
  url: string;
}

export default function ResourceCard({ name, url }: ResourceCardProps) {
  return (
    <Card className="p-3 sm:p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-start gap-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} in new tab`}
          className="text-muted-foreground hover:text-foreground mt-1 flex-shrink-0">
          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
        </a>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-foreground truncate">
            {name}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground truncate block">
            {url}
          </a>
        </div>
      </div>
    </Card>
  );
}

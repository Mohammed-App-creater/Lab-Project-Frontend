
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Resource } from "@/types/user";

interface ResourcesTabProps {
  resources: Resource[];
  onCancel: () => void;
  onSave: (resources: Resource[]) => void;
}

export default function ResourcesTab({ resources, onCancel, onSave }: ResourcesTabProps) {
  const [localResources, setLocalResources] = useState<Resource[]>(resources);

  const handleChange = (index: number, field: keyof Resource, value: string) => {
    const updated = [...localResources];
    updated[index] = { ...updated[index], [field]: value };
    setLocalResources(updated);
  };

  const handleAdd = () => {
    setLocalResources([...localResources, { name: "", link: "" }]);
  };

  const handleRemove = (index: number) => {
    const updated = localResources.filter((_, i) => i !== index);
    setLocalResources(updated);
  };

  return (
    <div>
      <div className="space-y-4">
        {localResources.map((resource, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Input
              value={resource.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="Resource name"
            />
            <Input
              value={resource.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
              placeholder="Resource URL"
            />
            <Button variant="destructive" onClick={() => handleRemove(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <Button variant="outline" onClick={handleAdd}>
          Add Resource
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(localResources)}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
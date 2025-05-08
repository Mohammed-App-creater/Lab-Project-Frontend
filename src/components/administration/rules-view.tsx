"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import type { Rule } from "@/lib/types"

interface RulesViewProps {
  rules: Rule[]
  onViewMembers: () => void
}

export default function RulesView({ rules, onViewMembers }: RulesViewProps) {
  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div key={rule.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{rule.name}</h3>
              <p className="text-sm text-gray-500">{rule.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="font-medium">{rule.threshold}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <Button className="bg-blue-700 hover:bg-blue-800" onClick={onViewMembers}>
          Members
        </Button>
      </div>
    </div>
  )
}

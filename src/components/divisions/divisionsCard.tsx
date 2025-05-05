"use client";

import { useState } from "react";
import { Search, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddNewDivisionUI } from "./AddNewDivision";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../global/login/pageLoader";

type DivisionGroupsDto = {
  groups: DivisionGroupDto[];
  name: string;
  id: string;
  description: string | null;
  imageUrl: string | null;
  establishedAt: Date | null;
  currentHeadID: string | null;
};

type DivisionGroupDto = {
  id: string;
  name: string;
  memberCount: number; // Add memberCount here
  groups: GroupDto[];
};

type GroupDto = {
  id: string;
  name: string;
  description: string | null;
  updatedAt: Date;
  memberCount: number;
};

const fetchDivision = async () => {
  try {
    const divisions = await fetch(
      "http://localhost:3000/api/division/all-divisions-and-groups"
    );
    if (!divisions) {
      throw new Error("No Division found");
    }
    const dates = await divisions.json();
    return dates as DivisionGroupsDto[];
  } catch (error) {
    console.log(error);
  }
};

export default function Divisions() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [divisions, setDivisions] = useState<DivisionGroupsDto[]>([]);

  const { error, isLoading } = useQuery({
    queryKey: ["division"],
    queryFn: async () => {
      const response = await fetchDivision();
      if (!response) {
        throw new Error("No Division found");
      }
      setDivisions(response);
      return response;
    },
  });


  const handleViewAll = (divisionId: string) => {
    router.push(`/alldivision/${divisionId}`);
  };

  const handleToGroup = (divisionId: string, groupId: string) => {
    router.push(`/alldivision/${divisionId}/${groupId}`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" p-3 mb-10 rounded-lg border-[1.5px] border-[#A2A1A833]">
      <div className="container mx-auto p-2">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input type="text" placeholder="Search" className="pl-8" />
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Division
          </Button>
        </div>

        {isLoading && <PageLoader fullPage={false} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {divisions.map((division) => (
            <Card className="overflow-hidden" key={division.id}>
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-lg font-semibold">
                  {division.name}
                </CardTitle>
                <Button
                  variant="link"
                  onClick={() => {
                    handleViewAll(division.id);
                  }}
                  className="text-blue-600 p-0 h-auto"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="text-sm text-gray-500 pb-2">
                {division.groups.length} Groups
              </CardContent>
              <div className="divide-y">
                {division.groups.map((group) => (
                  <div
                    key={`${group.id}-group-${group.name}`}
                    className="flex items-center justify-between p-4 hover:bg-[#0036870d] cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">Group {group.name}</div>
                      <div className="text-sm text-gray-500">
                        {`${group.memberCount}  Members`}
                      </div>
                    </div>
                    <ChevronRight
                      onClick={() => {
                        handleToGroup(division.id, group.id);
                      }}
                      className="h-5 w-5 text-gray-400"
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Show Modal */}
      {showModal && <AddNewDivisionUI onClose={() => setShowModal(false)} />}
    </div>
  );
}

"use client";

import { Search, Plus, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type AllGroupMemberDTO = {
  groupName: string;
  groupId: string;
  members: AllUserDTOWithGroup;
};

export type AllUserDTOWithGroup = {
  data: UserDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type DivisionGroupMemberDto = {
  id: string;
  name: string;
  groupsAndMembers: AllGroupMemberDTO[];
};

type Response = {
  status: string;
  message: string;
  data: DivisionGroupMemberDto;
};

export type UserDTO = {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: string;
  email: string;
  phone_number: string;
  telegramUserName: string | null;
  bio: string | null;
  berthDate: string | null;
  profileImageUrl: string | null;
  clubStatus: string | null;
  specialty: string | null;
  cvUrl: string | null;
  lastSeen: string;
  roleId: string;
  Role: {
    id: string;
    name: string;
  };
};

export function DivisionProfileUI() {
  const router = useRouter();
  const [data, setData] = useState<DivisionGroupMemberDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}api/division/groups-and-members`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              divisionId: "cd5c8e05-533f-4b76-9769-4d1638530104",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Response = await response.json();
        setData(data.data);
        console.log("Fetched data:", data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGroupData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Fetched data from useState:", data);
    }
  }
  , [data]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!data || !data.groupsAndMembers || data.groupsAndMembers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>No groups found</div>
      </div>
    );
  }

  const handleToGroup = (divisionId: string, groupId: string) => {
    router.push(`/alldivision/${divisionId}/${groupId}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search" className="w-64 pl-10" />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-md">
          <Plus className="mr-2 h-4 w-4" />
          Add Group
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {data.groupsAndMembers.map((group) => (
          <div key={group.groupId} className="rounded-lg border shadow-sm">
            <div className="flex items-center justify-between p-4 pb-2">
              <div>
                <h2 className="text-lg font-bold">{group.groupName}</h2>
                <p className="text-sm text-gray-500">
                  {group.members.data.length} Members
                </p>
              </div>
              <Button
                  variant="link"
                  onClick={() => {
                    handleToGroup(data.id, group.groupId);
                  }}
                  className="text-blue-600 p-0 h-auto"
                >
                  View All
                </Button>
            </div>
            <div className="mt-2">
              {group.members.data.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between border-t px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.profileImageUrl || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.firstName?.charAt(0) + member.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {member.firstName} {member.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{member.Role.name}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
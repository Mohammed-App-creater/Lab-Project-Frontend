"use client";

import { Search, Plus, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { AddGroupDialog } from "./AddNewGroup";
import { useState } from "react";
import PageLoader from "../global/login/pageLoader";

// Types
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

// 👇 React Query Fetch Function
const fetchGroupData = async (divisionId: string): Promise<DivisionGroupMemberDto> => {
  if (!divisionId) {
    throw new Error("Division ID is required");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}api/division/groups-and-members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        divisionId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: Response = await response.json();
  return data.data;
};

export const GroupComponent = ({divisionId}: {divisionId: string}) => {
  const router = useRouter();
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);


  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["divisionGroups"],
    queryFn: () => fetchGroupData(divisionId),
  });

  const handleCancel = () => {
    setShowAddGroupDialog(false);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {(error as Error).message}</div>
      </div>
    );
  }


  const handleToGroup = (divisionId: string, groupId: string) => {
    router.push(`/alldivision/${divisionId}/${groupId}`);
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search" className="w-64 pl-10" />
        </div>
        <Button onClick={() => setShowAddGroupDialog(true)} className="bg-blue-600 hover:bg-blue-700 rounded-md">
          <Plus className="mr-2 h-4 w-4" />
          Add Group
        </Button>
      </div>

      {showAddGroupDialog && <AddGroupDialog onCancel={handleCancel} divisionId={divisionId} />}

      {isLoading && ( <PageLoader fullPage={false} /> )}
      

      {error && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-red-500">Error: {(error as Error).message}</div>
        </div>
      )}

      {data?.groupsAndMembers.length === 0 && (
        <div className="flex items-center justify-center space-y-14">
          <div className="text-gray-500">No groups found</div>
          </div>
          )}
          

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {data?.groupsAndMembers.map((group) => (
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
                onClick={() => handleToGroup(data.id, group.groupId)}
                className="text-blue-600 p-0 h-auto"
              >
                View All
              </Button>
            </div>
            <div className="mt-2">
              {group.members.data.map((member) => (
                <CardContent
                  key={member.id}
                  className="flex items-center justify-between px-5 py-4 border-t hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={member.profileImageUrl || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {member.firstName?.charAt(0)}
                        {member.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-900">
                        {member.firstName} {member.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {member.Role.name}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardContent>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isFetching && ( <PageLoader fullPage={false} /> )} 
    </Card>
  );
};

 


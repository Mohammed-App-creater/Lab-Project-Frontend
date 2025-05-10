"use client";

import {
  Search,
  Import,
  Plus,
  Filter,
  Pencil,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddNewMember from "@/app/(main)/alldivision/[division]/[group]/_components/add.group.member.card";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../global/login/pageLoader";

interface user {
  id: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  gender: string;
  email: string;
  phone_number: string | null;
  telegramUserName: string | null;
  bio: string | null;
  berthDate: string | null;
  profileImageUrl: string | null;
  clubStatus: "Active" | "Inactive" | "Needs Attention" | null;
  specialty: string | null;
  cvUrl: string | null;
  lastSeen: string;
  Role: {
    id: string;
    name: string;
  };
  roleId: string;
  universityInfo: {
    currentYear: number;
    universityId: string;
    status: "onCampus" | "offCampus" | "withdrawn";
    expectedGraduationYear: number;
  };
}

interface PaginatedResponse {
  groupId: string;
  groupName: string;
  members: member;
}

type member = {
  data: user[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const fetchMembers = async (
  groupId: string,
  page: number,
  limit: number
): Promise<PaginatedResponse> => {
  const response = await api.get(
    `api/group/group-member/${groupId}?page=${page}&limit=${limit}`
  );
  return response.data as PaginatedResponse;
};

export function GroupMembersTableUI({ groupId, divisionId }: { groupId: string, divisionId: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [addNewMember, setAddNewMember] = useState(false);
  

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["group-members", groupId, page, limit],
    queryFn: () => fetchMembers(groupId, page, limit),
    staleTime: 5000, // Keeps data fresh for 5 seconds
  });

  const members = data?.members.data ?? [];
  const filteredMembers = searchTerm
    ? members.filter((member) =>
        [member.firstName, member.lastName, member.email, member.id].some(
          (field) => field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : members;

  const paginationInfo = {
    total: data?.members.total || 0,
    page: data?.members.page || page,
    limit: data?.members.limit || limit,
    totalPages: data?.members.totalPages || 1,
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleItemsPerPageChange = (value: string) => {
    setLimit(Number(value));
    setPage(1); // reset page when limit changes
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= paginationInfo.totalPages) {
      setPage(newPage);
    }
  };

  const getAttendanceBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Needs Attention":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isError) return <p>Error loading members</p>;

  return (
    <div className="p-3 rounded-lg border">
      {addNewMember && <AddNewMember onCancel={() => setAddNewMember(false)} divisionId={divisionId} groupId={groupId} page={page} limit={limit} />}
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, email, or ID"
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 bg-blue-900 hover:bg-blue-700 text-white"
          >
            <Import className="h-4 w-4" />
            Import
          </Button>
          <Button
            onClick={() => setAddNewMember(true)} 
           className="bg-blue-900 hover:bg-blue-700 gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member Name</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              // Show loader while loading
              <TableRow>
                <TableCell colSpan={6} className="text-center py-24">
                  <PageLoader fullPage={false} />
                </TableCell>
              </TableRow>
            ) : filteredMembers.length > 0 ? (
              // Show members
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={member.profileImageUrl || "/placeholder.svg"}
                          alt={`${member.firstName || ""} ${
                            member.lastName || ""
                          }`}
                        />
                        <AvatarFallback>
                          {member.firstName ? member.firstName.charAt(0) : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span>{`${member.firstName || ""} ${
                        member.lastName || ""
                      }`}</span>
                    </div>
                  </TableCell>
                  <TableCell>{member.universityInfo?.universityId}</TableCell>
                  <TableCell>{member.clubStatus}</TableCell>
                  <TableCell>{member.universityInfo?.currentYear}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getAttendanceBadgeColor(
                        member.clubStatus || "Inactive"
                      )}
                    >
                      {member.clubStatus || "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // No members found
              <TableRow>
                <TableCell colSpan={6} className="text-center py-24">
                  No members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Showing</span>
          <Select
            defaultValue={paginationInfo.limit.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-16 h-8">
              <SelectValue placeholder={paginationInfo.limit.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">
            {`${
              (paginationInfo.page - 1) * paginationInfo.limit + 1
            } to ${Math.min(
              paginationInfo.page * paginationInfo.limit,
              paginationInfo.total
            )} out of ${paginationInfo.total} records`}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              handlePageChange(Math.max(1, paginationInfo.page - 1))
            }
            disabled={paginationInfo.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from(
            { length: Math.min(paginationInfo.totalPages, 5) },
            (_, i) => {
              let pageNum;
              if (paginationInfo.totalPages <= 5) {
                pageNum = i + 1;
              } else if (paginationInfo.page <= 3) {
                pageNum = i + 1;
              } else if (paginationInfo.page >= paginationInfo.totalPages - 2) {
                pageNum = paginationInfo.totalPages - 4 + i;
              } else {
                pageNum = paginationInfo.page - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 ${
                    paginationInfo.page === pageNum
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            }
          )}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              handlePageChange(
                Math.min(paginationInfo.totalPages, paginationInfo.page + 1)
              )
            }
            disabled={paginationInfo.page === paginationInfo.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

    </div>
  );
}

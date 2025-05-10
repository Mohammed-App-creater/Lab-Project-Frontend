"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import PageLoader from "../global/login/pageLoader";
import ConfirmPopup from "./ConfirmPopup";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type Member = {
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
  clubStatus: string | null;
  specialty: string | null;
  cvUrl: string | null;
  lastSeen: string;
  Divisions: {
    id: string;
    name: string;
  };
  Role: {
    id: string;
    name: string;
  };
  roleId: string;
  universityInfo?: {
    universityId: string;
    currentYear: string;
    status: string;
  };
};

type PaginatedResponse = {
  data: Member[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type MemberTableProps = {
  userRole:
    | "VicePresident"
    | "President"
    | "SuperAdmin"
    | "DivisionHead"
    | "Coordinator"
    | "Member"
    | "Admin";
  onAddMember: () => void;
};

// Delete member API call
async function DeleteMember(id: string) {
  return await api
    .delete(`api/user/delete-user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data);
}

export default function MemberTable({
  userRole,
  onAddMember,
}: MemberTableProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    selectedMember: Member | null;
  }>({
    isOpen: false,
    selectedMember: null,
  });

  // Fetch members with react-query
  const { data, isLoading, error } = useQuery<PaginatedResponse>({
    queryKey: ["members", paginationInfo.page, paginationInfo.limit],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}api/user/all-users?limit=${paginationInfo.limit}&page=${paginationInfo.page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch members");
      return res.json();
    },
  });

  // Update members and pagination when data changes
  useEffect(() => {
    if (data) {
      setFilteredMembers(data.data);
      setPaginationInfo({
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
      });
    }
  }, [data]);

  // Filter members based on search term
  useEffect(() => {
    if (searchTerm.trim() === "" || !data) {
      setFilteredMembers(data?.data || []);
    } else {
      const filtered = data.data.filter((member) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (member.firstName?.toLowerCase().includes(searchLower) ?? false) ||
          (member.lastName?.toLowerCase().includes(searchLower) ?? false) ||
          (member.email?.toLowerCase().includes(searchLower) ?? false) ||
          (member.id?.toLowerCase().includes(searchLower) ?? false)
        );
      });
      setFilteredMembers(filtered);
    }
  }, [searchTerm, data]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setPaginationInfo((prev) => ({ ...prev, page: pageNumber }));
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    const newLimit = Number(value);
    setPaginationInfo((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  // Handle delete button click
  const handleDeleteClick = (member: Member) => {
    setPopupState({ isOpen: true, selectedMember: member });
  };

  // Handle delete mutation
  const handleDelete = useMutation({
    mutationFn: DeleteMember,
    onSuccess: () => {
      toast.success("Member deleted successfully ✅", {
        position: "top-right",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member ❌", {
        position: "top-right",
        duration: 3000,
      });
    },
  });

  // Handle confirmation
  const handleConfirm = async (name: string, isDivisionHead: boolean) => {
    if (isDivisionHead) {
      console.log(`Reporting deletion of ${name}`);
      toast.info(`Reported deletion of ${name}`, {
        position: "top-right",
        duration: 3000,
      });
      // TODOO: Add your API call for report-delete if needed
    } else {
      const memberId = popupState.selectedMember?.id;
      if (memberId) {
        await handleDelete.mutateAsync(memberId);
      }
    }
    setPopupState({ isOpen: false, selectedMember: null });
  };

  // Handle cancel
  const handleCancel = () => {
    setPopupState({ isOpen: false, selectedMember: null });
  };

  const getAttendanceBadgeColor = (attendance: string | null) => {
    switch (attendance) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Needs Attention":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "On Campus":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Off Campus":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Withdrawn":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  if (isLoading) return PageLoader({ fullPage: false });
  if (error)
    return (
      <p className="ml-50">
        Error: {error instanceof Error ? error.message : String(error)}
      </p>
    );

  return (

    <div className="w-full space-y-4 border rounded-lg p-4">
      <ConfirmPopup
        isOpen={popupState.isOpen}
        member={popupState.selectedMember}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Search by name, email, or ID"
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(userRole === "VicePresident" || userRole === "President") && (
            <Button
              className="bg-[#003087] hover:bg-[#002f87e7] w-full sm:w-auto"
              onClick={onAddMember}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          )}
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table className="min-w-[1000px] w-full ">
          <TableHeader>
            <TableRow className=" text-black dark:text-white">
              <TableHead className="w-[200px] text-black">
                Member Name
              </TableHead>
              <TableHead className="text-black dark:text-white">
                Member ID
              </TableHead>
              {/* Hide Division on mobile */}
              {(userRole === "President" ||
                userRole === "VicePresident" ||
                userRole === "DivisionHead") && (
                <TableHead className="hidden md:table-cell text-black dark:text-white">
                  Division
                </TableHead>
              )}
              <TableHead className="text-black dark:text-white">
                Attendance
              </TableHead>
              {/* Hide Year on small screens */}
              <TableHead className="hidden sm:table-cell text-black dark:text-white">
                Year
              </TableHead>
              <TableHead className="text-black dark:text-white">
                Status
              </TableHead>
              {/* Hide Action on mobile */}
              {(userRole === "President" ||
                userRole === "VicePresident" ||
                userRole === "DivisionHead") && (
                <TableHead className="text-right hidden sm:table-cell text-black dark:text-white">
                  Action
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow
                  onClick={() => {
                    router.push(`/member/${member.id}`);
                  }}
                  className="border-b"
                  key={member.id}
                >
                  <TableCell className="font-medium py-4">
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
                      </Avatar>9
                      <span className="truncate">{`${member.firstName || ""} ${
                        member.lastName || ""
                      }`}</span>
                    </div>
                  </TableCell>
                  <TableCell className="truncate">
                    {member.universityInfo?.universityId || "N/A"}
                  </TableCell>
                  {(userRole === "President" ||
                    userRole === "VicePresident" ||
                    userRole === "DivisionHead") && (
                    <TableCell className="truncate">
                      {member.Divisions.name || "N/A"}
                    </TableCell>
                  )}
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
                  <TableCell className="hidden sm:table-cell">
                    {member.universityInfo?.currentYear || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusBadgeColor(
                        member.universityInfo?.status || "offCampus"
                      )}
                    >
                      {member.universityInfo?.status || "Off Campus"}
                    </Badge>
                  </TableCell>
                  {/* Hide Action on mobile */}
                  {(userRole === "VicePresident" ||
                    userRole === "President" ||
                    userRole === "DivisionHead" ||
                    userRole === "SuperAdmin") && (
                    <TableCell className="text-right hidden sm:table-cell">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleDeleteClick(member)}
                          size="icon"
                          variant="ghost"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    userRole === "President" || userRole === "DivisionHead"
                      ? 7
                      : userRole === "VicePresident" || userRole === "Member"
                      ? 6
                      : 5
                  }
                  className="text-center py-8"
                >
                  No members found matching your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

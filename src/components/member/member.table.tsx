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
import {
  Pencil,
  Trash2,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageLoader from "../global/login/pageLoader";

type Member = {
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
  Role: {
    id: string;
    name: string;
  };
  roleId: string;
  universityInfo?: {
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
  userRole: "admin" | "manager" | "viewer";
  onAddMember: () => void;
};

export default function MemberTable({
  userRole,
  onAddMember,
}: MemberTableProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}api/user/all-users?limit=${paginationInfo.limit}&page=${paginationInfo.page}`
        );
        if (!res.ok) throw new Error("Failed to fetch members");
        const data: PaginatedResponse = await res.json();
        setMembers(data.data);
        setFilteredMembers(data.data); // Initialize filtered members with all members
        setPaginationInfo({
          total: data.total,
          page: data.page,
          limit: data.limit,
          totalPages: data.totalPages,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [paginationInfo.limit, paginationInfo.page]);

  // Filter members based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter((member) => {
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
  }, [searchTerm, members]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}api/user/all-users?limit=${paginationInfo.limit}&page=${pageNumber}`
      );
      if (!res.ok) throw new Error("Failed to fetch members");
      const data: PaginatedResponse = await res.json();
      setMembers(data.data);
      setFilteredMembers(data.data);
      setPaginationInfo({
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleItemsPerPageChange = async (value: string) => {
    const newLimit = Number(value);
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}api/user/all-users?limit=${newLimit}&page=1`
      );
      if (!res.ok) throw new Error("Failed to fetch members");
      const data: PaginatedResponse = await res.json();
      setMembers(data.data);
      setFilteredMembers(data.data);
      setPaginationInfo({
        total: data.total,
        page: 1,
        limit: newLimit,
        totalPages: data.totalPages,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
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

  if (loading) return PageLoader({ fullPage: false });
  if (error) return <p className="ml-50">Error: {error}</p>;

  return (
    <div className="w-full p-2 space-y-4 border rounded-lg">
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
          {(userRole === "admin" || userRole === "manager") && (
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
        <Table className="min-w-[1000px] w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Member Name</TableHead>
              <TableHead>Member ID</TableHead>
              {/* Hide Division on mobile */}
              {userRole === "admin" && <TableHead className="hidden md:table-cell">Division</TableHead>}
              <TableHead>Attendance</TableHead>
              {/* Hide Year on small screens */}
              <TableHead className="hidden sm:table-cell">Year</TableHead>
              <TableHead>Status</TableHead>
              {/* Hide Action on mobile */}
              {(userRole === "admin" || userRole === "manager") && (
                <TableHead className="text-right hidden sm:table-cell">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow className="border-b" key={member.id}>
                  <TableCell className="font-medium py-4">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={member.profileImageUrl || "/placeholder.svg"}
                          alt={`${member.firstName || ""} ${member.lastName || ""}`}
                        />
                        <AvatarFallback>
                          {member.firstName ? member.firstName.charAt(0) : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{`${member.firstName || ""} ${
                        member.lastName || ""
                      }`}</span>
                    </div>
                  </TableCell>
                  <TableCell className="truncate">{member.id}</TableCell>
                  {userRole === "admin" && (
                    <TableCell className="truncate">{member.specialty || "N/A"}</TableCell>
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
                  <TableCell  className="hidden sm:table-cell">{member.universityInfo?.currentYear || "N/A"}</TableCell>
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
                  {(userRole === "admin" || userRole === "manager") && (
                    <TableCell className="text-right hidden sm:table-cell">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
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
                    userRole === "admin"
                      ? 7
                      : userRole === "manager" || userRole === "viewer"
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
            {`${(paginationInfo.page - 1) * paginationInfo.limit + 1
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
            onClick={() => handlePageChange(Math.max(1, paginationInfo.page - 1))}
            disabled={paginationInfo.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.min(paginationInfo.totalPages, 5) }, (_, i) => {
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
                className={`h-8 w-8 ${paginationInfo.page === pageNum
                    ? "bg-primary text-primary-foreground"
                    : ""
                  }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              handlePageChange(Math.min(paginationInfo.totalPages, paginationInfo.page + 1))
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
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
import { useState, useEffect } from "react";
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
import AddNewMember from "../member/add.member.card";

interface Member {
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

type PaginatedResponse = {
  data: Member[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function GroupMembersTableUI() {
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [addNewMember, setAddNewMember] = useState<boolean>(false);

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


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}api/user/all-users?limit=${paginationInfo.limit}&page=${paginationInfo.page}`
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

    fetchMembers();
  }, [paginationInfo.limit, paginationInfo.page]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMembers(members);
    } else {
      const lower = searchTerm.toLowerCase();
      const filtered = members.filter(
        (member) =>
          (member.firstName?.toLowerCase().includes(lower) ?? false) ||
          (member.lastName?.toLowerCase().includes(lower) ?? false) ||
          (member.email?.toLowerCase().includes(lower) ?? false) ||
          member.id.toLowerCase().includes(lower)
      );
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

  const getAttendanceBadgeColor = (attendance: string) => {
    switch (attendance) {
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

  // const getStatusBadgeColor = (status: string) => {
  //   switch (status) {
  //     case "On Campus":
  //       return "bg-green-100 text-green-800";
  //     case "Off Campus":
  //       return "bg-red-100 text-red-800";
  //     case "Withdrawn":
  //       return "bg-blue-100 text-blue-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  

  return (
    <div className="p-3 rounded-lg border">
      {addNewMember && (
      <AddNewMember
        onCancel={() => setAddNewMember(false)}
      />
      )}
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
          <Button className="bg-blue-900 hover:bg-blue-700 gap-2">
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
            {filteredMembers.length > 0 ? (
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
              <TableRow>
                <TableCell colSpan={6} className="text-center">
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

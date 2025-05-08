"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { SessionTimeSlot } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PageLoader from "@/components/global/login/pageLoader";

// Define the attendance record type

interface User {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string | null;
}
interface AttendanceRecord {
  id: string;
  userId: string;
  user: User;
  sessionId: string;
  eventId: string | null;
  status: "UNMARKED" | "PRESENT" | "ABSENT";
  timestamp: SessionTimeSlot;
  headsUpId: string | null;
  createdAt: string;
  updatedAt: string;
}

// Fetch attendance data
const fetchAttendance = async (
  sessionId: string,
  groupId: string
): Promise<AttendanceRecord[]> => {
  const response = await axios.get(
    `http://localhost:3000/api/attendance/sessions/${sessionId}/groupId/${groupId}`
  );
  return response.data;
};

// Create session attendance if empty
const createSessionAttendance = async (sessionId: string): Promise<void> => {
  const response = await axios.post(
    `http://localhost:3000/api/attendance/create-session-attendance/${sessionId}`
  );
  return response.data;
};

// Save attendance (dummy API)
const saveAttendance = async (
  attendanceData: AttendanceRecord[]
): Promise<{ success: boolean }> => {
  console.log("Saving attendance:", attendanceData);
  return { success: true };
};

const Attendance = ({
  sessionId,
  groupId,
}: {
  sessionId: string;
  groupId: string;
}) => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [showHeadsUpPopup, setShowHeadsUpPopup] = useState<string | null>(null);
  const [headsUpReason, setHeadsUpReason] = useState("");
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Present" | "Absent" | "Unmarked"
  >("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const recordsPerPage = 10;
  const totalRecords = 60;


  const [selectedHeadsUpType, setSelectedHeadsUpType] = useState<string | null>(null);

  // Fetch attendance data using React Query
  const { data: attendanceData, refetch, isLoading } = useQuery<AttendanceRecord[]>({
    queryKey: ["attendance", sessionId, groupId],
    queryFn: () => fetchAttendance(sessionId, groupId),
    onSuccess: (data) => {
      if (data.length === 0) {
        createAttendanceMutation.mutate();
      } else {
        console.log("Attendance data fetched:", data);
        setLocalAttendance(data);
      }
    },
  });

  // Local state to manage attendance updates
  const [localAttendance, setLocalAttendance] = useState<AttendanceRecord[]>(
    []
  );

  useEffect(() => {
    console.log("Attendance Data:", attendanceData);
  }, [attendanceData]);

  // Mutation to create session attendance
  const createAttendanceMutation = useMutation({
    mutationFn: () => createSessionAttendance(sessionId),
    onSuccess: () => {
      refetch();
    },
  });

  // Mutation to save attendance
  const saveAttendanceMutation = useMutation({
    mutationFn: saveAttendance,
    onSuccess: () => {
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2000);
    },
  });

  // Update local state when attendance data changes
  useEffect(() => {
    console.log("Attendance Data Updated:", attendanceData);
    if (attendanceData && attendanceData.length > 0) {
      setLocalAttendance(attendanceData);
    }
  }, [attendanceData]);

  // Dummy member names mapping to user IDs


  // Handle status change (Present/Absent)
  const handleStatusChange = (id: string, status: "PRESENT" | "ABSENT") => {
    const updatedAttendance = localAttendance.map((record) =>
      record.id === id ? { ...record, status } : record
    );
    setLocalAttendance(updatedAttendance);
  };

  // Handle Heads Up submission
  const handleHeadsUpSubmit = (recordId: string) => {
    const updatedAttendance = localAttendance.map((record) =>
      record.id === recordId ? { ...record, headsUpId: "heads-up-123" } : record
    );
    setLocalAttendance(updatedAttendance);
    setShowHeadsUpPopup(null);
    setHeadsUpReason("");
  };

  // Handle Save button click
  const handleSave = () => {
    saveAttendanceMutation.mutate(localAttendance);
  };

  // Filter and search logic
  const filteredData = localAttendance
    .filter((record) => {
      if (filterStatus === "All") return true;
      return record.status === filterStatus.toUpperCase();
    })
    .filter((record) => {
      return (
        record.user.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.user.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });

  // Update total records based on filtered data
  const totalFilteredRecords = filteredData.length;

  // Pagination logic for filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );
  console.log("Paginated Data:", paginatedData);
  const totalPages = Math.ceil(totalFilteredRecords / recordsPerPage);

  // Reset page to 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  return (
    <div className="p-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full sm:w-1/3"
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="border px-4 py-2 rounded flex items-center gap-2"
            >
              Filter
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    setFilterStatus("All");
                    setShowFilterDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilterStatus("Present");
                    setShowFilterDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Present
                </button>
                <button
                  onClick={() => {
                    setFilterStatus("Absent");
                    setShowFilterDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Absent
                </button>
                <button
                  onClick={() => {
                    setFilterStatus("Unmarked");
                    setShowFilterDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Unmarked
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 p-4 font-semibold border-b">
            <div>Member Name</div>
            <div>Attendance</div>
            <div className="flex justify-end pr-6 hidden sm:block">Excused</div>
          </div>
          {paginatedData.map((record) => (
            <div
              key={record.id}
              className="grid grid-cols-2 sm:grid-cols-3 p-4 border-b items-end"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={record.user.profileImageUrl ?? ""}
                    alt={`${record.user.firstName} ${record.user.lastName}`}
                  />
                  <AvatarFallback>
                    {record.user.firstName?.charAt(0) || "UN"}
                  </AvatarFallback>
                </Avatar>
                <span>
                  {`${record.user.firstName} ${record.user.lastName}` || "Unknown Member"}
                </span>
                {record.headsUpId && (
                  <span className="ml-2 text-blue-600">⚠️</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(record.id, "PRESENT")}
                  className={`px-4 py-1 rounded-4xl ${record.status === "PRESENT"
                      ? "bg-[#3FC28A] text-white"
                      : "dark:bg-gray-800 border border-gray-300"
                    }`}
                >
                  Present
                </button>
                <button
                  onClick={() => handleStatusChange(record.id, "ABSENT")}
                  className={`px-4 rounded-4xl ${record.status === "ABSENT"
                      ? "bg-red-500 text-white"
                      : "dark:bg-gray-800 border border-gray-300"
                    }`}
                >
                  Absent
                </button>
              </div>
              <div className="flex justify-end hidden sm:flex">
                <button
                  onClick={() => setShowHeadsUpPopup(record.id)}
                  className="bg-[#003087] text-white px-4 py-2 rounded-lg"
                >
                  Heads Up
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <div>
          Showing{" "}
          {Math.min(
            (currentPage - 1) * recordsPerPage + 1,
            totalFilteredRecords
          )}{" "}
          to {Math.min(currentPage * recordsPerPage, totalFilteredRecords)} out
          of {totalFilteredRecords} records
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            {"<"}
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded ${currentPage === page ? "bg-blue-600 text-white" : ""
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>

      {isLoading ? (<PageLoader fullPage={false} />) : (
        <>
          {showHeadsUpPopup && (
            <div className="fixed inset-0 bg-[#00000089] bg-opacity-50 flex items-center  justify-center">
              <div className=" flex flex-col gap-4  p-6 rounded-2xl bg-white dark:bg-gray-800 w-1/5">
                <h2 className="text-lg dark:text-white font-bold mb-4">Heads Up</h2>
                <div className="mb-4">
                  <select onChange={(e) => { setSelectedHeadsUpType(e.target.value) }} className={`w-full border ${selectedHeadsUpType || selectedHeadsUpType === "" ? "" : "text-gray-500"} rounded-lg p-3`} >
                    <option className="" value="" disabled selected>
                      Select Type
                    </option>
                    <option value="SICK">SICK</option>
                    <option value="TRAVEL">TRAVEL</option>
                    <option value="PERSONAL">PERSONAL</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
                <div className="mb-4">
                  <textarea
                    className="w-full border rounded-lg p-4"
                    rows={3}
                    placeholder="Enter reason for heads up"
                    value={headsUpReason}
                    onChange={(e) => setHeadsUpReason(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => setShowHeadsUpPopup(null)}
                    className="border border-gray-300 grow px-4 py-3 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleHeadsUpSubmit(showHeadsUpPopup)}
                    className="bg-[#003087] grow text-white px-4 py-3 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )} </>)}

      {/* Save Toast */}
      {showSaveToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
          Attendance Saved Successfully!
        </div>
      )}
    </div>
  );
};

export default Attendance;

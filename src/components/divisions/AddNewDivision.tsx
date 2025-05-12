"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "../ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageLoader from "../global/login/pageLoader";
import { useState } from "react";
import { toast } from "sonner";

// Remove or complete the import statement

export interface DivisionHeadsDto {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  Divisions: {
    id: string;
    name: string;
  };
  Role: {
    id: string;
    name: string;
  };
}

import '@/app/globals.css';

const AddNewDivision = async (name: string, currentHeadID: string) => {
  console.log("Adding new division:", name, currentHeadID);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}api/division/create-division`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description: "",
          imageUrl: "",
          establishedAt: new Date(),
          currentHeadID,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Server error:", data);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Request failed:", error.message);
    } else {
      console.log("Request failed:", error);
    }
  }
};

const fetchDivisionHeads = async () => {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}api/user/get-users-by-role`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "DivisionHead",
      }),
    }
  ).then((res) => res.json());
};

export function AddNewDivisionUI({ onClose }: { onClose: () => void }) {
  const [SelectedHeadID, setSelectedHeadID] = useState<string>("");
  const [DivisionName, setDivisionName] = useState<string>("");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["divisionHeads"],
    queryFn: fetchDivisionHeads,
  });

  const mutation = useMutation({
    mutationFn: (data: { name: string; currentHeadID: string }) =>
      AddNewDivision(data.name, data.currentHeadID),
    onSuccess: () => {
      toast.success("Division created successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to add division"
      );
    },
  });
  

 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <Card className=" rounded-lg shadow-lg w-full max-w-xs p-4 ">
        <div className="">
          <h2 className="text-xl font-bold">Add New Division</h2>
        </div>

        <hr></hr>

        <div className="flex flex-col gap-4 ">
          <div>
            <Input value={DivisionName} onChange={(e) => setDivisionName(e.target.value)} placeholder="Division Name" className="w-full py-6" />
          </div>
          <div>
            <Select
              value={SelectedHeadID}
              onValueChange={(value) => setSelectedHeadID(value)}
            >
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="Select Division Head" />
              </SelectTrigger>
              <SelectContent>
                {isLoading && <PageLoader fullPage={false} />}
                {isError && <div>Error fetching division heads</div>}
                {data &&
                  data.map((head: DivisionHeadsDto) => (
                    <SelectItem key={head.id} value={head.id}>
                      {`${head.firstName} ${head.middleName || ""} ${
                        head.lastName
                      }`}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between w-full gap-4 px-1 py-2 border-t mt-4">
          <Button
            variant="outline"
            className="rounded-md flex-1 py-5"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={() =>
              mutation.mutate({
                name: DivisionName,
                currentHeadID: SelectedHeadID,
              })
            }
            className="bg-blue-900 hover:bg-blue-700 dark:text-white rounded-md px-4 py-5 flex-1 flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <>
                <span className="loader border-white border-2 rounded-full w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Division"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

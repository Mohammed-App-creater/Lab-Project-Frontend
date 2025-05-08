import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

async function AddGroup(groupName: string, divisionId: string): Promise<void> {
  console.log("Adding group:", groupName, "IN DIVISION:", divisionId);
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}api/group/create`,
    { name: groupName, divisionId }, 
  );
  return res.data;
}

export function AddGroupDialog({
  divisionId,
  onCancel,
  onGroupAdded,
}: {
  divisionId: string;
  onCancel: () => void;
  onGroupAdded?: () => void;
}) {
  const [groupName, setGroupName] = useState<string>("");
  const queryClient = useQueryClient();
  const handleAddGroup = useMutation({
    mutationFn: (groupName: string) => AddGroup(groupName, divisionId),
    onSuccess: () => {
      toast.success("Group added successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["divisionGroups"] });
      onGroupAdded?.(); 
      onCancel(); 
    },
    onError: (error) => {
      console.error("Error adding group:", error);
      toast.error("Failed to add group ❌");
    },
    onSettled: () => {
      setGroupName(""); // reset group name
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-[350px]  shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Add New Group</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            type="text"
            placeholder="Group Name"
            className="py-6"
          />
        </CardContent>

        <CardFooter className="flex justify-between gap-4 pt-2 pb-6">
          <Button
            onClick={onCancel}
            type="button"
            variant="outline"
            className="flex-1 py-5"
          >
            Cancel
          </Button>
          <Button
            disabled={handleAddGroup.isPending}
            onClick={() => handleAddGroup.mutate(groupName)}
            className="bg-blue-900 hover:bg-blue-700 dark:text-white rounded-md px-4 py-5 flex-1 flex items-center justify-center gap-2"
          >
            {handleAddGroup.isPending ? (
              <>
                <span className="loader border-white border-2 rounded-full w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Group"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

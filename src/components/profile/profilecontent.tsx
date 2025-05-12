"use client";

import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { CiUser } from "react-icons/ci";
import { SlBriefcase } from "react-icons/sl";
import RequiredInfoTab from "@/components/profile/requiredInfoTab";
import OptionalInfoTab from "@/components/profile/optionalInfoTab";
import ResourcesTab from "@/components/profile/resourcesTab";
import RequiredInfoView from "@/components/profile/requiredinfoView";
import OptionalInfoView from "@/components/profile/optionalInfoview";
import ResourcesView from "@/components/profile/resourcesView";
import { fetchUserProfile } from "@/api/user";
import { Card } from "../ui/card";
import { LoadingSpinner } from "../global/login/loading";

interface ProfileContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isEditing: boolean;
  onToggleEdit: () => void;
  userId: string;
}

export default function ProfileContent({
  activeTab,
  onTabChange,
  isEditing,
  onToggleEdit,
  userId
}: ProfileContentProps) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId),
  });

  const userData = user || null;



  return (
    <Card className="p-6 relative">
      {isLoading && <div className=" w-full py-20  flex items-center justify-center"><LoadingSpinner fullPage={false} /></div>}
      {!userData && !isLoading && <div className="text-red-500">Error fetching user data</div>}
      {userData && userData?.resourceLinks?.length === 0 && !isLoading && (
        <div className=" p-8">No resources available</div>
      )}
      {userData && userData?.resourceLinks?.length > 0 && !isLoading && (
      <Tabs
        value={activeTab}
        onValueChange={(value) => onTabChange(value as string)}
        className="w-full"
      >
        <TabsList className="w-full justify-start  rounded-none bg-transparent h-auto p-0 mb-6">
          <TabsTrigger
            value="required"
            className="border-t-0 border-x-0 border-b-[0.5px] border-gray-400 data-[state=active]:border-b-4 data-[state=active]:shadow-none data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
          >
            <CiUser className="h-5 w-5 -ml-14" />
            Required Information
          </TabsTrigger>
          <TabsTrigger
            value="optional"
            className="border-t-0 border-x-0 border-b-[0.5px] border-gray-400 data-[state=active]:border-b-4 data-[state=active]:shadow-none data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
          >
            <SlBriefcase className="h-5 w-5 mr-2" />
            Optional Information
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="border-t-0 border-x-0 border-b-[0.5px] border-gray-400 data-[state=active]:border-b-4 data-[state=active]:shadow-none data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
          >
            <FileText className="h-5 w-5 mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="required">
          {isEditing ? (
            <RequiredInfoTab 
              userData={userData} 
              onCancel={onToggleEdit} 
              onSave={onToggleEdit} 
            />
          ) : (
            <RequiredInfoView userData={userData} />
          )}
        </TabsContent>

        <TabsContent value="optional">
          {isEditing ? (
            <OptionalInfoTab 
              userData={userData} 
              onCancel={onToggleEdit} 
              onSave={onToggleEdit} 
            />
          ) : (
            <OptionalInfoView userData={userData} />
          )}
        </TabsContent>

        <TabsContent value="resources">
          {isEditing ? (
            <ResourcesTab onCancel={onToggleEdit} onSave={onToggleEdit} resources={[]} />
          ) : (
            <ResourcesView resources={userData?.resourceLinks??[]} />
          )}
        </TabsContent>
      </Tabs>
      )}
    </Card>
  );
}
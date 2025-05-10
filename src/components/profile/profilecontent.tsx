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
import { TabType } from "@/types/user";
import { fetchUserProfile, mapUserToUserData } from "@/api/user";
import { Card } from "../ui/card";

interface ProfileContentProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
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

  const userData = user ? mapUserToUserData(user) : null;

  if (isLoading) return <p>Loading...</p>;
  if (!userData) return <p>Failed to load user profile.</p>;

  return (
    <Card className="p-6 relative">
      <Tabs
        value={activeTab}
        onValueChange={(value) => onTabChange(value as TabType)}
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
    </Card>
  );
}
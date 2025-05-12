"use client";

import { user } from "../../types/user";

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

export default function OptionalInfoView({ userData }: { userData: user }) {
  const linkFinder = (socialLinkName: string) => {
    return (
      userData?.socialLinks?.find(
        (socialLink) => socialLink?.socialLinkName === socialLinkName
      )?.socialLinkUrl || "N/A"
    );
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FormField
          label="University ID"
          value={userData?.universityInfo?.universityId || "N/A"}
        />
        <FormField label="Instagram Handle" value={linkFinder("Instagram")} />
        <FormField label="LinkedIn URL" value={linkFinder("LinkedIn")} />
        <FormField
          label="Date of Birth"
          value={
            userData.berthDate
              ? new Date(userData.berthDate).toLocaleDateString("en-GB")
              : "N/A"
          }
        />
        <FormField label="Codeforces Handle" value={linkFinder("Codeforces")} />
        <FormField label="Leetcode Handle" value={linkFinder("Leetcode")} />
        {userData?.socialLinks?.length > 0 &&
          userData?.socialLinks?.map((socialLink) => (
            <FormField
              key={socialLink?.socialLinkName}
              label={socialLink?.socialLinkName}
              value={socialLink?.socialLinkUrl}
            />
          ))}
        <FormField label="CV" value={userData?.cvUrl || "N/A"} />
        <FormField
          label="Joining Date"
          value={
            userData.createdAt
              ? new Date(userData.createdAt).toLocaleDateString("en-GB")
              : "N/A"
          }
        />
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-1.5">Short Bio</p>
        <p className="font-medium">{userData.bio || "N/A"}</p>
      </div>
    </div>
  );
}

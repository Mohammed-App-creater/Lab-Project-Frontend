"use client";

import { useEffect, useState } from "react";
import DivisionCard from "@/components/resources/divisionCard";
import AddResourceModal from "@/components/resources/addResourceModal";

export interface Resource {
  name: string;
  url: string;
}

export interface Division {
  title: string;
  description: string;
  resources: Resource[];
}

export default function ResourceManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDivision, setCurrentDivision] = useState("");
  const [newResourceName, setNewResourceName] = useState("");
  const [newResourceUrl, setNewResourceUrl] = useState("");
  const [divisions, setDivisions] = useState<Division[]>([]);

  
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}api/division-resources/all-divisions-resource`
        );
        const data = await response.json();

        interface BackendDivision {
          name: string;
          resourceLink: { resourceLinkName: string; resourceLinkUrl: string }[];
        }

        const mapped: Division[] = data.map((div: BackendDivision) => ({
          title: div.name,
          description: `Useful resources and progress sheet for the ${div.name} division.`,
          resources: div.resourceLink.map((res) => ({
            name: res.resourceLinkName,
            url: res.resourceLinkUrl,
          })),
        }));

        setDivisions(mapped);
      } catch (err) {
        console.error("Failed to fetch division data:", err);
      }
    };

    fetchDivisions();
  }, []);

  const handleAddResource = (division: string) => {
    setCurrentDivision(division);
    setShowAddModal(true);
  };

  const handleSaveResource = async () => {
    if (!newResourceName || !newResourceUrl) return;

    try {
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}api/division-resources/all-divisions-resource`
      );
      const backendData: { name: string; id: string }[] = await response.json();
      const matchedDivision = backendData.find(
        (div) => div.name === currentDivision
      );

      if (!matchedDivision) {
        console.error("Division ID not found");
        return;
      }

      const divisionId = matchedDivision.id;

      const postRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}api/division-resources`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resourceLinkName: newResourceName,
            resourceLinkUrl: newResourceUrl,
            divisionId,
          }),
        }
      );

      if (!postRes.ok) {
        throw new Error("Failed to save resource to backend");
      }

      setDivisions((prev) =>
        prev.map((div) =>
          div.title === currentDivision
            ? {
                ...div,
                resources: [
                  ...div.resources,
                  { name: newResourceName, url: newResourceUrl },
                ],
              }
            : div
        )
      );

      setNewResourceName("");
      setNewResourceUrl("");
      setShowAddModal(false);
    } catch (err) {
      console.error("Error saving resource:", err);
    }
  };

  return (
    <>
      {divisions.map((division, index) => (
        <DivisionCard
          key={index}
          title={division.title}
          description={division.description}
          resources={division.resources}
          onAddResource={handleAddResource}
        />
      ))}

      <AddResourceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        resourceName={newResourceName}
        resourceUrl={newResourceUrl}
        onResourceNameChange={setNewResourceName}
        onResourceUrlChange={setNewResourceUrl}
        onSave={handleSaveResource}

      />
    </>
  );
}

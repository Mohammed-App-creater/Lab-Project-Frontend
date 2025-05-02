// API functions for resources

export interface Resource {
    id: string
    name: string
    url: string
    divisionId: string
  }
  
  export interface Division {
    id: string
    title: string
    description: string
  }
  
  // Get all divisions with their resources
  export async function fetchDivisions(): Promise<Division[]> {
    const res = await fetch("http://localhost:3000/api/divisions")
    if (!res.ok) throw new Error("Failed to fetch divisions")
    return res.json()
  }
  
  // Get all resources for a specific division
  export async function fetchDivisionResources(divisionId: string): Promise<Resource[]> {
    const res = await fetch(`http://localhost:3000api/division-resources/${divisionId}`)
    if (!res.ok) throw new Error(`Failed to fetch resources for division ${divisionId}`)
    return res.json()
  }
  
  // Get a specific resource by ID
  export async function fetchResourceById(id: string): Promise<Resource> {
    const res = await fetch(`http://localhost:3000/api/division-resources/link/${id}`)
    if (!res.ok) throw new Error(`Failed to fetch resource ${id}`)
    return res.json()
  }
  
  // Create a new resource
  export async function createResource(resource: Omit<Resource, "id">): Promise<Resource> {
    const res = await fetch("http://localhost:3000/api/division-resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    })
  
    if (!res.ok) throw new Error("Failed to create resource")
    return res.json()
  }
  
  // Update a resource
  export async function updateResource(id: string, resource: Partial<Resource>): Promise<Resource> {
    const res = await fetch(`http://localhost:3000/api/division-resources/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    })
  
    if (!res.ok) throw new Error(`Failed to update resource ${id}`)
    return res.json()
  }
  
  // Delete a resource
  export async function deleteResource(id: string): Promise<void> {
    const res = await fetch(`http://localhost:3000/api/division-resources/${id}`, {
      method: "DELETE",
    })
  
    if (!res.ok) throw new Error(`Failed to delete resource ${id}`)
  }
  
  // Get all resources across all divisions
  export async function fetchAllResources(divisionId: string): Promise<Resource[]> {
    const res = await fetch(`http://localhost:3000/api/division-resources/all/${divisionId}`)
    if (!res.ok) throw new Error("Failed to fetch all resources")
    return res.json()
  }
  
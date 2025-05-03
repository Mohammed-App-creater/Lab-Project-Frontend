
// import { useQuery } from '@tanstack/react-query';

// export const useDivisionResources = (divisionId: string) => {
//   return useQuery({
//     queryKey: ['division-resources', divisionId],
//     queryFn: async () => {
//       const res = await fetch(`http://localhost:3000/api/division-resources/all/${divisionId}`);
//       if (!res.ok) throw new Error('Failed to fetch resources');
//       return res.json();
//     },
//     enabled: !!divisionId, // prevents running query if ID is undefined
//   });
// };

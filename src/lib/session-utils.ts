import type { Session, SessionData } from "@/components/session/session-calendar"

// Define the types for the API response
interface ApiSession {
  id: string
  title: string
  startTime?: string
  divisionName?: string
  tags?: string[]
  // Add any other fields that might be in the API response
}

interface ApiResponse {
  data: {
    sessions: {
      date: string // Format: "YYYY-MM-DD"
      sessions: ApiSession[]
    }[]
  }
}

/**
 * Transforms API session data into the format expected by the SessionCalendar component
 * @param apiResponse Response from the API
 * @returns Transformed data in SessionData format
 */



export function transformApiData(apiResponse: ApiResponse): SessionData[] {
  if (!Array.isArray(apiResponse)) return [];

  const sessionsByDate: Record<string, Session[]> = {};

  for (const session of apiResponse) {
    const timeSlots = session.timeSlots || session.timeSlot || [];

    for (const slot of timeSlots) {
      const start = slot.startTime || slot.start || null;
      if (!start) continue;

      const dateKey = new Date(start).toISOString().split("T")[0]; // "YYYY-MM-DD"

      if (!sessionsByDate[dateKey]) {
        sessionsByDate[dateKey] = [];
      }

      sessionsByDate[dateKey].push({
        id: session.id,
        title: session.title,
        startTime: start, // preserve full ISO string
        divisionName: session.divisionName || "",
        tags: session.tags || [],
      });
    }
  }

  return Object.entries(sessionsByDate).map(([date, sessions]) => ({
    date,
    sessions,
  }));
}




/**
 * Formats sessions in markdown style
 * @param sessions Array of session data
 * @returns Markdown formatted string
 */
export function formatSessionsAsMarkdown(sessions: SessionData[]): string {
  return sessions
    .map((dayData) => {
      const date = new Date(dayData.date)
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date)

      const sessionsList = dayData.sessions
        .map((session) => {
          const category = session.divisionName || session.tags?.[0] || "General"
          return `- **${category}**  \n  ${session.title}`
        })
        .join("\n")

      return `${formattedDate}\n${sessionsList}`
    })
    .join("\n\n")
}

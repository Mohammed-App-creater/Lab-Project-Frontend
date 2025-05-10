import { User, Calendar, BarChart2, AlertCircle } from "lucide-react"

const navItems = [
  {
    icon: <User className="h-5 w-5 mr-2" />,
    label: "Profile",
    href: "/profile/[id]",
    id: "profile",
  },
  {
    icon: <Calendar className="h-5 w-5 mr-2" />,
    label: "Attendance",
    href: "/profile/[id]/attendance",
    id: "attendance",
  },
  {
    icon: <BarChart2 className="h-5 w-5 mr-2" />,
    label: "Progress",
    href: "/profile/[id]/progress",
    id: "progress",
  },
  {
    icon: <AlertCircle className="h-5 w-5 mr-2" />,
    label: "Heads up!",
    href: "/profile/[id]/heads-up",
    id: "heads-up",
  },
]

const ProfileSidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-2">
              <a href={item.href} className="flex items-center text-gray-700 hover:text-blue-500">
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default ProfileSidebar

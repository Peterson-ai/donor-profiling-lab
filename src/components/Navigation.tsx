import { Link } from "react-router-dom";
import { navigationItems } from "@/config/navigation";

export const Navigation = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <ul className="flex flex-wrap gap-4">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
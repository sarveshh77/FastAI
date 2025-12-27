import { UserCircle } from "lucide-react";
import { ThemeToggle } from "./theme-toggle"; // <-- Import

const Header = () => {
  return (
    <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300">

        {/* Add the theme toggle here */}
        <ThemeToggle />

        {/* User button */}
        <button className="flex items-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ml-4">
          <UserCircle className="w-6 h-6" />
        </button>

      </div>
    </header>
  );
};

export default Header;
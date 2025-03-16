import React from "react";
import Link from "next/link";


export default function NavBar() {
  return (
    <div className="p-8 bg-gray-900 sticky top-0 w-full z-50">
      <nav className="flex justify-between py-2 px-8 bg-gray-800 rounded-xl border-gray-700 border-2 text-white">
        <div>
          <Link href="/">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-lg font-extrabold text-transparent drop-shadow-lg md:text-4xl">
              bits n bobs
            </span>
          </Link>
        </div>
      </nav>

    </div>
  );
}
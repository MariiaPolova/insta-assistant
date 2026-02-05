'use client'
import { useSession, signOut } from "next-auth/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  return (
    <Menu>
      <MenuButton className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <UserCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
        )}
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {session.user.name}
        </span>
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
        <MenuItem>
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {session.user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {session.user.email}
            </p>
          </div>
        </MenuItem>
        <MenuItem>
          {({ focus }) => (
            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className={`${
                focus ? "bg-gray-100 dark:bg-gray-700" : ""
              } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2`}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Sign out
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

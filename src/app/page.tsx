'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserGroupIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import UserMenu from "../components/UserMenu";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl w-full mx-auto px-6 py-8">
        <div className="flex justify-end mb-4">
          <UserMenu />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Insta Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Assistant app to work with Instagram posts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/account"
            className="group block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <UserGroupIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <h2 className="ml-3 text-2xl font-semibold text-gray-900 dark:text-white">
                Accounts
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Manage Instagram accounts and view their posts
            </p>
          </Link>

          <Link
            href="/post"
            className="group block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
              <h2 className="ml-3 text-2xl font-semibold text-gray-900 dark:text-white">
                Posts
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Browse and manage Instagram posts
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

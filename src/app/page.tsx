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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <div className="px-4 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 pb-20 py-4 lg:pt-12 lg:pb-24 flex flex-row justify-between items-center">
        <div className="inline-flex">
          <div className="text-white">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Insta Assistant
            </h1>
            <p className="text-lg text-white/90">
              Assistant app to work with Instagram posts
            </p>
          </div>
        </div>
        <div className="flex items-center"><UserMenu transparent /></div>
      </div>
      
      <div className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex gap-y-4 flex-col rounded-lg min-h-[95vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/account"
            className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <UserGroupIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
                Accounts
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Manage Instagram accounts and view their posts
            </p>
            <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
              <span>Explore accounts</span>
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>

          <Link
            href="/lists"
            className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500 dark:hover:border-green-400"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <DocumentTextIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
                Lists
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Browse and manage Instagram lists
            </p>
            <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
              <span>Browse lists</span>
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

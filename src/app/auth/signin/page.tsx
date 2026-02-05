'use client'
import { signIn } from "next-auth/react";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function SignIn() {
  return (
    <div className="min-h-screen">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 pb-32 py-8">
        <div className="max-w-md mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <SparklesIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Insta Assistant
            </h1>
            <p className="text-white/90 text-lg">
              Your Instagram content companion
            </p>
          </div>
        </div>
      </div>

      {/* Sign-in Card */}
      <div className="max-w-md mx-auto px-6 -mt-24">
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to continue
            </p>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="group w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 rounded-xl px-6 py-4 text-gray-900 dark:text-white font-semibold hover:shadow-xl transition-all duration-300 shadow-lg border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign in with Google</span>
            <ArrowRightIcon className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Secure authentication powered by Google
          </p>
        </div>
      </div>
    </div>
  );
}

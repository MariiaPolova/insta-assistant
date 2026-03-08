'use client'
import Link from "next/link";
import UserMenu from "../../components/UserMenu";
import useAccount from "../../lib/hooks/useAccount";
import type { IAccount } from "../interfaces/account";
import LoadingSpinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Fragment, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import ModalDialog from "../../components/common/ModalDialog";
import AccountAPI from "../../lib/api/account";
import ActionButton from "../../components/common/ActionButton";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";


export default function Index() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const { data: accounts, error, isLoading } = useAccount<IAccount[]>();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', postsCount: 10 });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createAccount = async (username, postsCount) => {
    if (!username) {
      return;
    }
    const account = await AccountAPI.create(username);
    if (account?.created_at) {
      await AccountAPI.populate(username, postsCount);
      // Refresh accounts list
      // const updatedAccounts = useAccount<IAccount[]>();
      // if (updatedAccounts.error) {
      //   alert('Error refreshing accounts list');
      // }
    }

    setOpen(false);
    setFormData({ username: '', postsCount: 10 });
  }

  if (!accounts && isLoading) {
    return <LoadingSpinner />;
  }

  if (error)
    return (
      <ErrorMessage message="Cannot load accounts" />
    );

  return (
    <Fragment>
      <ModalDialog
        open={open}
        setOpen={setOpen}
        inputLabel='username'
        inputValue={formData.username}
        handleInputChange={handleFormChange}
        postsCount={formData.postsCount}
        handlePostsCountChange={handleFormChange}
        onOk={createAccount}
      ></ModalDialog>
      <div className="px-4 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 pb-20 py-4 lg:pt-12 lg:pb-24 flex flex-row justify-between items-center">
        <div className="inline-flex">
          <ActionButton
            label="Go Back"
            onClick={() => { window.history.back() }}
            icon={ChevronLeftIcon}
            className="inline-flex items-center rounded-lg px-4 py-2.5 mr-2 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
            disabled={false}
          />
          <ActionButton
            label="Add new"
            onClick={() => setOpen(true)}
            icon={UserPlusIcon}
            className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
            disabled={false}
          />


        </div>
        <div className="flex items-center"><UserMenu transparent /></div>

        {/* <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
        >
          <UserPlusIcon aria-hidden="true" className="m-0 lg:-ml-0.5 lg:mr-1.5 size-5" />
          <span className='hidden sm:block'>Add new account</span>
        </button> */}
      </div>
      <div className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex gap-y-4 flex-col rounded-lg min-h-[95vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
        <ul role="list" className="space-y-4">
          {accounts.map((account, index) => (
            <li key={`${account.username}_${index}`} className="group bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
              <div className="flex justify-between gap-x-6 items-center">
                <div className="flex min-w-0 gap-x-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                    <svg className="size-10 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-bold text-gray-900 dark:text-white">{account.full_name}</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">@{account.username}</p>
                  </div>
                </div>

                <Link
                  href="/account/[id]"
                  as={`/account/${account.username}`}
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
                >
                  <span className="text-sm">View Posts</span>
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment >
  )
}
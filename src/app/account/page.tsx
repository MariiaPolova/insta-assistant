'use client'
import Link from "next/link";
import UserMenu from "../../components/UserMenu";
import useAccount from "../../lib/hooks/useAccount";
import type { IAccount } from "../interfaces/account";
import LoadingSpinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Fragment, useState } from "react";
import { UserPlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import ModalDialog from "../../components/common/ModalDialog";
import AccountAPI from "../../lib/api/account";
import ActionButton from "../../components/common/ActionButton";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";


export default function Index() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const { data: accounts, error, isLoading, mutate } = useAccount<IAccount[]>();
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [formData, setFormData] = useState({ username: '', postsCount: 10 });

  const handleDeleteClick = (account) => {
    setAccountToDelete(account);
    setDeleteConfirmOpen(true);
  };

  const deleteAccount = async (username) => {
    try {
      await AccountAPI.delete(username);
      setDeleteConfirmOpen(false);
      setAccountToDelete(null);
      mutate();
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  const handleFormChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
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


  const accountFields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      placeholder: 'Enter username'
    },
    {
      name: 'postsCount',
      label: 'Posts Count',
      type: 'number',
      required: true,
      placeholder: 'Enter number of posts to fetch'
    }
  ];

  if (!accounts && isLoading) {
    return <LoadingSpinner />;
  }

  if (error)
    return (
      <ErrorMessage message="Cannot load accounts" />
    );

  if (!accounts || accounts.length === 0) {
    return (
      <Fragment>
        <ModalDialog
          open={open}
          setOpen={setOpen}
          title="Add new account"
          formData={formData}
          fields={accountFields}
          onSubmit={createAccount}
          onFormChange={handleFormChange}
          submitLabel="Create Account"
        />
        
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
              label="Add new account"
              onClick={() => setOpen(true)}
              icon={UserPlusIcon}
              className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
              disabled={false}
            />
          </div>
          <div className="flex items-center"><UserMenu transparent /></div>
        </div>
        
        <div className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex gap-y-4 flex-col rounded-lg min-h-[85vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <svg className="w-16 h-16 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No accounts yet
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              Add your first Instagram account to start exploring and managing your posts. Connect your accounts to get started.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <UserPlusIcon className="w-5 h-5" />
                Add Your First Account
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-4 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ModalDialog
        open={open}
        setOpen={setOpen}
        title="Add new account"
        formData={formData}
        fields={accountFields}
        onSubmit={createAccount}
        onFormChange={handleFormChange}
        submitLabel="Create Account"
      ></ModalDialog>
      
      <ModalDialog
        open={deleteConfirmOpen}
        setOpen={setDeleteConfirmOpen}
        title={`Delete "${accountToDelete?.full_name}"?`}
        formData={{}}
        fields={[]}
        onSubmit={() => deleteAccount(accountToDelete?.username)}
        onFormChange={() => {}}
        submitLabel="Delete"
      />
      
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
      </div>
      <div className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex gap-y-4 flex-col rounded-lg min-h-[85vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
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

                <div className="flex items-center gap-3">
                  {/* Mobile: Icon-only buttons */}
                  <div className="flex gap-2 sm:hidden">
                    <button
                      onClick={() => handleDeleteClick(account)}
                      className="flex items-center justify-center rounded-full p-2.5 font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                    <Link
                      href="/account/[id]"
                      as={`/account/${account.username}`}
                      className="flex items-center justify-center rounded-full p-2.5 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                  
                  {/* Desktop: Full buttons with text */}
                  <div className="hidden sm:flex items-center gap-3">
                    <button
                      onClick={() => handleDeleteClick(account)}
                      className="flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
                    >
                      <TrashIcon className="size-4" />
                      <span className="text-sm">Delete</span>
                    </button>
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
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
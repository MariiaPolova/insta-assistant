'use client'
import Link from "next/link";
import useAccount from "../../lib/hooks/useAccount";
import type { IAccount } from "../interfaces/account";
import LoadingSpinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Fragment, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import ModalDialog from "../../components/common/ModalDialog";
import AccountAPI from "../../lib/api/account";


export default function Index() {
  const { data: accounts, error, isLoading } = useAccount<IAccount[]>();
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleUserameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const createAccount = async (username) => {
    if (!username) {
      return;
    }
    const account = await AccountAPI.create(username);
    if (account?.created_at) {
      await AccountAPI.populate(username);
      // Refresh accounts list
      // const updatedAccounts = useAccount<IAccount[]>();
      // if (updatedAccounts.error) {
      //   alert('Error refreshing accounts list');
      // }
    }

    setOpen(false);
    setNewUsername('');
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
        inputValue={newUsername}
        handleInputChange={handleUserameChange}
        onOk={createAccount}
      ></ModalDialog>
      <div className="px-8 bg-gray-300 pb-20 py-4 lg:py-8 flex flex-row justify-between items-center">
        <h1 className="text-2xl/7 font-bold text-gray-900 py-5">Accounts</h1>
        <button
          type="button"
          className="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
        >
          <UserPlusIcon aria-hidden="true" className="m-0 lg:-ml-0.5 lg:mr-1.5 size-5 text-gray-400" />
          <span className='hidden sm:block' onClick={() => setOpen(true)}>Add new account</span>
        </button>
      </div>
      <div className="m-3 lg:mx-8 py-10 px-6 lg:px-8 lg:px-12 flex gap-y-4 flex-col bg-gray-100 rounded-lg min-h-[95vh] lg:-mt-10 -mt-20">
        <ul role="list" className="divide-y divide-gray-100 border-t border-b border-gray-200">
          {accounts.map((account, index) => (
            <li key={`${account.username}_${index}`} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <svg className="size-12 flex-none bg-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">{account.full_name}</p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">{account.username}</p>
                </div>
              </div>
              <div className="z-10 rounded-full px-1 py-2 lg:p-3 font-medium text-black border-2 border-yellow-700">
                <Link
                  className="text-sm/6 text-gray-900 px-3"
                  href="/account/[id]"
                  as={`/account/${account.username}`}>
                  Receipts
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  )
}
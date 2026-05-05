'use client'
import Link from "next/link";
import UserMenu from "../../components/UserMenu";
import useList from "../../lib/hooks/useList";
import { IList } from "../interfaces/list";
import ActionButton from "../../components/common/ActionButton";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ModalDialog from "../../components/common/ModalDialog";
import requester from "../../lib/helpers/requester";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ListsPage() {
  const { data: lists, isLoading, error, mutate } = useList<Array<IList>>();
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  console.log('ListsPage state:', { open, formData });

  const handleFormChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const createList = async (data) => {
    if (!data.name || data.name.trim() === "") {
      return;
    }
    try {
      await requester('POST', `${SERVER_BASE_URL}/api/lists`, { name: data.name });
      setOpen(false);
      setFormData({ name: '' });
      mutate(); // Refresh the lists
    } catch (error) {
      console.error('Failed to create list:', error);
    }
  };

  const deleteList = async (listId) => {
    try {
      await requester('DELETE', `${SERVER_BASE_URL}/api/lists/${listId}`);
      setDeleteConfirmOpen(false);
      setListToDelete(null);
      mutate(); // Refresh the lists
    } catch (error) {
      console.error('Failed to delete list:', error);
    }
  };

  const handleDeleteClick = (list) => {
    setListToDelete(list);
    setDeleteConfirmOpen(true);
  };

  const listFields = [
    {
      name: 'name',
      label: 'List Name',
      type: 'text',
      required: true,
      placeholder: 'Enter list name'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading lists...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Failed to load lists</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">We encountered an error while loading your lists. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center rounded-lg px-6 py-3 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!lists || lists.length === 0) {
    return (
      <div>
        <ModalDialog
          open={open}
          setOpen={setOpen}
          title="Add new list"
          formData={formData}
          fields={listFields}
          onSubmit={createList}
          onFormChange={handleFormChange}
          submitLabel="Create List"
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
              label="Add new list"
              onClick={() => setOpen(true)}
              icon={PlusIcon}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No lists yet
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              Create your first list to start organizing your Instagram posts. Lists help you categorize and manage your content effortlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  console.log('Button clicked! Current open state:', open);
                  setOpen(true);
                  console.log('setOpen(true) called');
                }}
                className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <PlusIcon className="w-5 h-5" />
                Create Your First List
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
      </div>
    );
  }

  return (
    <div>
      <ModalDialog
        open={open}
        setOpen={setOpen}
        title="Add new list"
        formData={formData}
        fields={listFields}
        onSubmit={createList}
        onFormChange={handleFormChange}
        submitLabel="Create List"
      />
      
      {/* Delete Confirmation Dialog */}
      <ModalDialog
        open={deleteConfirmOpen}
        setOpen={setDeleteConfirmOpen}
        title={`Delete "${listToDelete?.name}"?`}
        formData={{}}
        fields={[]}
        onSubmit={() => deleteList(listToDelete?.id)}
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
            label="Add new list"
            onClick={() => setOpen(true)}
            icon={PlusIcon}
            className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
            disabled={false}
          />
        </div>
        <div className="flex items-center"><UserMenu transparent /></div>
      </div>
      <div className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex gap-y-4 flex-col rounded-lg min-h-[85vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
        <ul role="list" className="space-y-4">
          {lists.map((list, index) => (
            <li key={`${list.id}_${index}`} className="group bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
              <div className="flex justify-between gap-x-6 items-center">
                <div className="flex min-w-0 gap-x-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                    <svg className="size-10 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25h15m-15 0A2.25 2.25 0 0 1 6.75 6h10.5a2.25 2.25 0 0 1 2.25 2.25m-15 0v7.5A2.25 2.25 0 0 0 6.75 18h10.5a2.25 2.25 0 0 0 2.25-2.25v-7.5m-15 0h15" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-bold text-gray-900 dark:text-white">{list.name}</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{Array.isArray(list.posts_ids) ? `${list.posts_ids.length} posts` : '0 posts'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Mobile: Icon-only buttons */}
                  <div className="flex gap-2 sm:hidden">
                    <button
                      onClick={() => handleDeleteClick(list)}
                      className="flex items-center justify-center rounded-full p-2.5 font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                    <Link
                      href="/lists/[id]"
                      as={`/lists/${list.id}`}
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
                      onClick={() => handleDeleteClick(list)}
                      className="flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
                    >
                      <TrashIcon className="size-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                    <Link
                      href="/lists/[id]"
                      as={`/lists/${list.id}`}
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
    </div>
  );
}

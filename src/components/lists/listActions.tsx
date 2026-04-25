import React, { useCallback, useMemo, useState } from "react";
import { MenuItem } from "@headlessui/react";
import {
    ChevronDownIcon,
    BookmarkIcon,
    BookmarkSlashIcon,
    XCircleIcon
} from '@heroicons/react/20/solid';
import ButtonDropdown from "../../components/buttonDropdown";

import PostAPI from "../../lib/api/post";

const ListActionsDropdown = ({ dbPostId, postId, lists, refreshPostFn, refreshPostsFn }) => {
    const [loadingActions, setLoadingActions] = useState(new Set());

    const addToList = useCallback(async (listId: string) => {
        const actionKey = `add-${listId}`;
        setLoadingActions(prev => new Set(prev).add(actionKey));
        try {
            await PostAPI.addToList(postId, listId);
            refreshPostFn();
        } finally {
            setLoadingActions(prev => {
                const newSet = new Set(prev);
                newSet.delete(actionKey);
                return newSet;
            });
        }
    }, [refreshPostFn, postId]);

    const removeFromList = useCallback(async (listId: string) => {
        const actionKey = `remove-${listId}`;
        setLoadingActions(prev => new Set(prev).add(actionKey));
        try {
            await PostAPI.removeFromList(postId, listId);
            refreshPostFn();
        } finally {
            setLoadingActions(prev => {
                const newSet = new Set(prev);
                newSet.delete(actionKey);
                return newSet;
            });
        }
    }, [refreshPostFn, postId]);

    const removePost = useCallback(async (dbPostId: string) => {
        const actionKey = `delete-${dbPostId}`;
        setLoadingActions(prev => new Set(prev).add(actionKey));
        try {
            await PostAPI.deletePost(dbPostId);
            refreshPostsFn();
            console.log('remove post');
        } finally {
            setLoadingActions(prev => {
                const newSet = new Set(prev);
                newSet.delete(actionKey);
                return newSet;
            });
        }
    }, [refreshPostsFn]);

    const listActions = useMemo(() =>
        lists?.map(list => {
            const isInList = list.posts_ids?.includes(postId);
            const actionKey = isInList ? `remove-${list.id}` : `add-${list.id}`;
            const isLoading = loadingActions.has(actionKey);
            
            return (
                <MenuItem key={`list-${list.id}`}>
                    <button
                        onClick={() => isInList ? removeFromList(list.id) : addToList(list.id)}
                        disabled={isLoading}
                        className={`group flex w-full items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            isLoading 
                                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800/50'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-700 dark:hover:text-blue-300'
                        }`}>
                        {isLoading ? (
                            <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
                        ) : (
                            isInList ?
                                <BookmarkSlashIcon aria-hidden="true" className="mr-3 h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" /> :
                                <BookmarkIcon className="mr-3 h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="flex-1 text-left">
                            {isLoading ? 'Processing...' : (
                                <>{isInList ? 'Remove from' : 'Add to'} <span className="font-semibold text-gray-900 dark:text-white">{list.name}</span></>
                            )}
                        </span>
                    </button>
                </MenuItem>)
        }), [addToList, removeFromList, lists, postId, loadingActions]);

    const actions = useMemo(() => {
        const deleteActionKey = `delete-${dbPostId}`;
        const isDeleting = loadingActions.has(deleteActionKey);
        
        return [
            ...listActions,
            (<MenuItem key={`remove-${postId}`}>
                <button
                    onClick={() => removePost(dbPostId)}
                    disabled={isDeleting}
                    className={`group flex w-full items-center px-4 py-3 text-sm font-medium transition-all duration-200 border-t border-gray-200 dark:border-gray-700 ${
                        isDeleting 
                            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800/50'
                            : 'text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 hover:text-red-700 dark:hover:text-red-300'
                    }`}>
                    {isDeleting ? (
                        <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-500" />
                    ) : (
                        <XCircleIcon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    )}
                    <span className="font-semibold">
                        {isDeleting ? 'Deleting...' : 'Remove Post'}
                    </span>
                </button>
            </MenuItem>)
        ];
    }, [listActions, postId, removePost, dbPostId, loadingActions]);

    return (
        <ButtonDropdown Icon={ChevronDownIcon} actions={actions} />
    );
};

export default ListActionsDropdown;
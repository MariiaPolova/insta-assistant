import React, { useCallback, useMemo } from "react";
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

    const addToList = useCallback(async (listId: string) => {
        await PostAPI.addToList(postId, listId);
        refreshPostFn();
        console.log('added to list');
    }, [refreshPostFn, postId]);

    const removeFromList = useCallback(async (listId: string) => {
        await PostAPI.removeFromList(postId, listId);
        refreshPostFn();
        console.log('remove from list');
    }, [refreshPostFn, postId]);

    const removePost = useCallback(async (dbPostId: string) => {
        await PostAPI.deletePost(dbPostId);
        refreshPostsFn();
        console.log('remove post');
    }, [refreshPostsFn]);

    const listActions = useMemo(() =>
        lists?.map(list => {
            const isInList = list.posts_ids.includes(postId);
            return (
                <MenuItem key={`list-${list.id}`}>
                    <button
                        onClick={() => isInList ? removeFromList(list.id) : addToList(list.id)}
                        className="block w-full text-left data-[focus]:bg-blue-100 py-3 px-2">
                        {isInList ?
                            <BookmarkSlashIcon aria-hidden="true" className="inline-block mr-1 size-5 text-indigo-400" /> :
                            <BookmarkIcon className="inline-block mr-1 size-5 text-indigo-400" />}
                        {isInList ? 'Remove from' : 'Add to'} {list.name}
                    </button>
                </MenuItem>)
        }), [addToList, removeFromList, lists, postId]);

    const actions = useMemo(() =>
        [...listActions,
        (<MenuItem key={`remove-${postId}`}>
            <button
                onClick={() => removePost(dbPostId)}
                className="block w-full text-left data-[focus]:bg-red-100 py-3 px-2">
                <XCircleIcon className="inline-block mr-1 size-5 text-red-400" />
                Remove Post
            </button>
        </MenuItem>)], [listActions, postId, removePost, dbPostId]);

    return (
        <ButtonDropdown Icon={ChevronDownIcon} actions={actions} />
    );
};

export default ListActionsDropdown;
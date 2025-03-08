import React, { useCallback, useMemo } from "react";
import { MenuItem } from "@headlessui/react";
import {
    ChevronDownIcon,
    BookmarkIcon,
    BookmarkSlashIcon
} from '@heroicons/react/20/solid';
import ButtonDropdown from "../../components/buttonDropdown";

import PostAPI from "../../lib/api/post";

const ListActionsDropdown = ({ postId, lists, trigger }) => {
   
    const addToList = useCallback(async (listId: string) => {
        await PostAPI.addToList(postId, listId);
        trigger();
        console.log('added to list');
    }, [postId]);

    const removeFromList = useCallback(async (listId: string) => {
        await PostAPI.removeFromList(postId, listId);
        trigger();
        console.log('remove from list');
    }, [postId]);

    const listActions = useMemo(() =>
        lists?.map(list => {
            const isInList = list.posts_ids.includes(postId);
            return (
                <MenuItem key={`list-${list.id}`}>
                    <button
                        onClick={() => isInList ? removeFromList(list.id) : addToList(list.id)}
                        className="block w-full text-left data-[focus]:bg-blue-100 py-3 px-2">
                        { isInList ? 
                        <BookmarkSlashIcon aria-hidden="true" className="inline-block mr-1 size-5 text-indigo-400"/> : 
                        <BookmarkIcon className="inline-block mr-1 size-5 text-indigo-400" /> }
                        {isInList ? 'Remove from' : 'Add to'} {list.name}
                    </button>
                </MenuItem>)
        }), [addToList, removeFromList, lists, postId]);

    return (
        <ButtonDropdown Icon={ChevronDownIcon} actions={listActions} />
    );
};

export default ListActionsDropdown;
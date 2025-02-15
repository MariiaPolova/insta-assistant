import React, { useCallback, useMemo } from "react";
import { MenuItem } from "@headlessui/react";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/Spinner";
import {
    ChevronDownIcon,
    BookmarkIcon
} from '@heroicons/react/20/solid';
import ButtonDropdown from "../../components/buttonDropdown";
import useList from "../../lib/hooks/useList";
import { IList } from "../../app/interfaces/list";
import PostAPI from "../../lib/api/post";

const ListActionsDropdown = ({ postId }) => {
    const { data: lists, error, isLoading } = useList<IList[]>();
    const addToList = useCallback(async (listId: string) => {
        await PostAPI.addToList(postId, listId);
        console.log('added to list');
    }, [postId]);

    const listActions = useMemo(() =>
        lists?.map(list => (
            <MenuItem key={`list-${list.id}`}>
                <button
                    onClick={() => addToList(list.id)}
                    className="block w-full text-left data-[focus]:bg-blue-100">
                    <BookmarkIcon aria-hidden="true" className="inline-block mr-1 size-5 text-gray-400" />
                    {list.name}
                </button>
            </MenuItem>)), [addToList, lists]);

    if (!lists || isLoading) {
        return <LoadingSpinner />;
    }

    if (error)
        return (
            <ErrorMessage message="Cannot load comments related to this article..." />
        );

    return (
        <ButtonDropdown Icon={ChevronDownIcon} actions={listActions} />
    );
};

export default ListActionsDropdown;
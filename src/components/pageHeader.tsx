import { CalendarIcon, LinkIcon, ArrowUturnLeftIcon, InboxArrowDownIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

const PageHeader = ({ data }) => {
    const router = useRouter();
    if (!data) return null;
    const { full_name, username, end_fetch_date, start_fetch_date } = data;
    return (
        <div className="lg:flex lg:items-center lg:justify-between p-2 lg:m-2 bg-yellow-600 lg:p-8 lg:rounded-md rounded-b-lg">
            <div className="min-w-0 flex-1 pt-2 lg:pt-0">
                <h2 className="text-2xl/7 font-bold text-white-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {full_name}
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-yellow-50">
                        <CalendarIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-white-400" />
                        {`Start: ${new Date(start_fetch_date).toLocaleDateString()} ${new Date(start_fetch_date).toLocaleTimeString()}`}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-yellow-50">
                        <CalendarIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-white-400" />
                        {`End: ${new Date(end_fetch_date).toLocaleDateString()} ${new Date(end_fetch_date).toLocaleTimeString()}`}
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-end lg:ml-4 lg:mt-0 -mt-10 pb-6 lg:pb-0">

                <span className="ml-3 sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                        onClick={() => router.back()}
                    >
                        <ArrowUturnLeftIcon aria-hidden="true" className="m-0 lg:-ml-0.5 lg:mr-1.5 size-5 text-gray-400" />
                        <span className='hidden sm:block'>Go Back</span>
                    </button>
                </span>

                <span className="ml-3 sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                        onClick={() => router.back()}
                    >
                        <InboxArrowDownIcon aria-hidden="true" className="m-0 lg:-ml-0.5 lg:mr-1.5 size-5 text-gray-400" />
                        <span className='hidden sm:block'>Fetch</span>
                    </button>
                </span>

                <span className="ml-3 sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                        <LinkIcon aria-hidden="true" className="m-0 lg:-ml-0.5 lg:mr-1.5 size-5 text-gray-400" />
                        <span className='hidden sm:block'>{username}</span>
                    </button>
                </span>
            </div>
        </div>
    )
};

export default PageHeader;
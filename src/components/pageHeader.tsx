import { LinkIcon, ArrowUturnLeftIcon, InboxArrowDownIcon, ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import ThemeSwitcher from './theme/themeSwitcher';
import ActionButton from './common/ActionButton';

const PageHeader = ({ data }) => {
    const router = useRouter();
    if (!data) return null;
    const { full_name, username, end_fetch_date, start_fetch_date } = data;
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 py-8 lg:px-8 lg:py-12 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
            <div className="min-w-0 flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                    {full_name}
                </h2>
                <div className="hidden lg:flex flex-row items-center gap-3 mt-4">
                    <ActionButton
                        label="Go Back"
                        onClick={() => { window.history.back() }}
                        icon={ChevronLeftIcon}
                        className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
                        disabled={false}
                    />
                    <ActionButton
                        label={`@${username}`}
                        onClick={() => { }}
                        icon={LinkIcon}
                        className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
                        disabled={false}
                    />
                </div>
            </div>
            <div className="hidden lg:flex mt-6 lg:mt-0 flex flex-col gap-3">
                <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-md">
                    <ArrowRightStartOnRectangleIcon aria-hidden="true" className="mr-2 size-5 shrink-0 text-white" />
                    <span className="font-mono">{end_fetch_date && `${new Date(end_fetch_date).toLocaleDateString()} ${new Date(end_fetch_date).toLocaleTimeString()}`}</span>
                </span>
                <div className="flex flex-wrap items-center justify-around gap-3">
                    <ThemeSwitcher iconOnly />
                    <ActionButton
                        label="Fetch"
                        onClick={() => router.back()}
                        icon={InboxArrowDownIcon}
                        className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
                        disabled={false}
                    />
                </div>
            </div>
            {/* Mobile: all buttons in one compact row */}
            <div className="flex lg:hidden items-center gap-2 mt-4">
                <ActionButton
                    label="Go Back"
                    onClick={() => { window.history.back() }}
                    icon={ChevronLeftIcon}
                    className="inline-flex items-center rounded-lg px-3 py-2 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300"
                    disabled={false}
                />
                <ActionButton
                    label={`@${username}`}
                    onClick={() => { }}
                    icon={LinkIcon}
                    className="inline-flex items-center rounded-lg px-3 py-2 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300"
                    disabled={false}
                />
                <ThemeSwitcher iconOnly />
                <ActionButton
                    label="Fetch"
                    onClick={() => router.back()}
                    icon={InboxArrowDownIcon}
                    className="inline-flex items-center rounded-lg px-3 py-2 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300"
                    disabled={false}
                />
                 <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-md">
                    <ArrowRightStartOnRectangleIcon aria-hidden="true" className="mr-2 size-5 shrink-0 text-white" />
                    <span className="font-mono">{end_fetch_date && `${new Date(end_fetch_date).toLocaleDateString()} ${new Date(end_fetch_date).toLocaleTimeString()}`}</span>
                </span>
            </div>
        </div>
    )
};

export default PageHeader;
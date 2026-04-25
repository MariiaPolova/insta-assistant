import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import UserMenu from './UserMenu';
import ActionButton from './common/ActionButton';

const PageHeader = ({ data }) => {
    if (!data) return null;
    const { full_name } = data;
    return (
        <div>
            {/* Profile Section */}
            <div className="px-4 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 pb-20 py-4 lg:pt-12 lg:pb-24">
                {/* Mobile: Stacked layout */}
                <div className="flex flex-col gap-4 md:hidden">
                    <div className="flex justify-between items-center">
                        <ActionButton
                            label="Go Back"
                            onClick={() => { window.history.back() }}
                            icon={ChevronLeftIcon}
                            className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300"
                            disabled={false}
                        />
                        <UserMenu transparent />
                    </div>
                    <h2 className="text-xl font-bold text-white text-center">
                        {full_name}
                    </h2>
                </div>
                
                {/* Desktop: Single row layout */}
                <div className="hidden md:flex flex-row justify-between items-center">
                    <div className="inline-flex">
                        <ActionButton
                            label="Go Back"
                            onClick={() => { window.history.back() }}
                            icon={ChevronLeftIcon}
                            className="inline-flex items-center rounded-lg px-4 py-2.5 mr-2 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
                            disabled={false}
                        />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white text-center flex-1">
                        {full_name}
                    </h2>
                    <div className="inline-flex items-center gap-3">
                        <UserMenu transparent />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PageHeader;
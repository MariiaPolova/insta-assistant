import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import {
    ChevronDownIcon,
  } from '@heroicons/react/20/solid';

const ButtonDropdown = ({Icon = ChevronDownIcon, actions = []}) => {
    return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="group inline-flex items-center justify-center w-10 h-10 text-sm font-semibold rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-xl border-2 border-white/30 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-blue-500/50">
          <Icon aria-hidden="true" className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-20 mt-2 w-64 origin-top-right rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in overflow-hidden"
      >
        <div className="py-2">
          {actions}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ButtonDropdown;
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import {
    ChevronDownIcon,
  } from '@heroicons/react/20/solid';

const ButtonDropdown = ({Icon = ChevronDownIcon, actions = []}) => {
    return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold z-10 rounded-full px-3 py-1.5 font-medium text-white hover:bg-blue-100 border-2 border-white bg-yellow-600 bg-opacity-50">
          <Icon aria-hidden="true" className="-mr-1 size-5 text-white-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {actions}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ButtonDropdown;
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import ActionButton from '../common/ActionButton';

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const ThemeIcon = theme === 'dark' ? SunIcon : MoonIcon;

    return (

        <span className="ml-3 sm:block">
            <ActionButton
                label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'}`}
                onClick={toggleTheme}
                icon={ThemeIcon}
                className="ring-[var(--background)]"
                iconOnlyOnMobile={true}
            />
        </span>
    );
};

export default ThemeSwitcher;
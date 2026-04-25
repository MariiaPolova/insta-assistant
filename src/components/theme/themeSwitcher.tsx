import React, { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import ActionButton from '../common/ActionButton';

const ThemeSwitcher: React.FC<{ iconOnly?: boolean }> = ({ iconOnly = false }) => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const ThemeIcon = theme === 'dark' ? SunIcon : MoonIcon;

    return (
        <ActionButton
            label={iconOnly ? '' : `Switch to ${theme === 'light' ? 'Dark' : 'Light'}`}
            onClick={toggleTheme}
            icon={ThemeIcon}
            className={`ring-[var(--background)] inline-flex items-center rounded-lg px-4 py-2.5 font-semibold transition-all duration-300 hover:scale-105 ${
                theme === 'light' 
                    ? 'bg-gray-400 hover:bg-gray-600 text-white border-2 border-gray-400' 
                    : '!bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white'
            }`}
            iconOnly={iconOnly}
        />
    );
};

export default ThemeSwitcher;
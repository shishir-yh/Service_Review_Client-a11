import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

const DarkModeToggle = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 px-3 py-1 rounded bg-blue-400 dark:bg-blue-400 text-sm dark:text-white"
        >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
    );
};

export default DarkModeToggle;

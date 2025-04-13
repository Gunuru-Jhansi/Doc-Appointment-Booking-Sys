import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
 
  return (
    <div className='fixed bottom-4 right-4 z-50'>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-3 rounded-lg text-2xl bg-gray-300 dark:bg-gray-700 text-sm text-black dark:text-white shadow-lg transition-all duration-300 hover:scale-110"
    >
      {darkMode ? '☀️' : '🌙 '}
    </button>
    </div>
  );
};

export default ThemeToggle;

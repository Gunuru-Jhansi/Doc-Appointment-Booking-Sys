import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { IoSunny } from "react-icons/io5";
import { HiOutlineMoon } from "react-icons/hi";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
 
  return (
    <div className='fixed bottom-4 right-4 z-50'>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-4 rounded-lg text-2xl bg-gray-300 dark:bg-gray-700 text-sm text-black dark:text-white shadow-lg transition-all duration-300 hover:scale-110"
    >
      {darkMode ? <IoSunny size={25}/> : <HiOutlineMoon size={25}/>}
    </button>
    </div>
  );
};

export default ThemeToggle;

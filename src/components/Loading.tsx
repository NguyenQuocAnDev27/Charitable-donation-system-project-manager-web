/* eslint-disable @typescript-eslint/no-unused-vars */
import useConfigPage from '@/store/custom_hooks/useConfigPage';
import React from 'react';


const Loading: React.FC = () => {
  const { darkMode } = useConfigPage();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-blue-950">
      <div className="w-16 h-16 border-4 border-t-transparent border-solid rounded-full animate-spin border-blue-500"></div>
        <p className='text-2xl font-semibold m-5 text-black dark:text-white'>Đang Tải...</p>
    </div>
  );
};

export default Loading;

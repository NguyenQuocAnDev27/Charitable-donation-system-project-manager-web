/* eslint-disable @typescript-eslint/no-unused-vars */
import Loading from "@/components/Loading";
import COOKIE_KEYS from "@/constants/cookieKeys";
import useConfigPage from "@/store/custom_hooks/useConfigPage";
import { getCookie } from "@/utils/cookieHandler";
import { checkDarkLightMode } from "@/utils/globalUltils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const HomePage = () => {
    
  const { username, darkMode, isLoadingFullScreen, setUsername, toggleDarkMode, toggleLoadingFullScreen } = useConfigPage();
  const router = useRouter();

  useEffect(() => {
    checkDarkLightMode();
    const refresh_token = getCookie(COOKIE_KEYS.REFRESH_TOKEN);
    const isDarkMode = getCookie(COOKIE_KEYS.DARK_MODE) === 'true';
    const userName = getCookie(COOKIE_KEYS.USER_NAME);

    if(isDarkMode) toggleDarkMode();

    if(refresh_token === undefined || refresh_token === 'undefined' 
        || refresh_token === null || refresh_token === 'null') {
        router.push('/login');
    } else {
        setUsername(userName);
        router.push('/dashboard');
    }

  }, [router, setUsername, toggleDarkMode]);

    return(
        <>
            <Loading/>
        </>
    )
}

export default HomePage;
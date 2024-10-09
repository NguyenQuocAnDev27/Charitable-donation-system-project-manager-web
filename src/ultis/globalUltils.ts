import { getCookie, setCookie } from "./cookieHandler";
import COOKIE_KEYS from '@/constants/cookieKeys'

const formatCurrencyToVND = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const isLogedIn = () => {
    const refresh_token = getCookie(COOKIE_KEYS.REFRESH_TOKEN);
    if(refresh_token) return true
    return false
}

function checkDarkLightMode () {
    const isTurnOnDarkMode = getCookie(COOKIE_KEYS.DARK_MODE);
    if (isTurnOnDarkMode === undefined || isTurnOnDarkMode === null) {
      setCookie(COOKIE_KEYS.DARK_MODE, 'false');
      return;
    }
    if(isTurnOnDarkMode === 'true') document.documentElement.classList.toggle('dark', true);
    else document.documentElement.classList.toggle('dark', false);
  }

export {
    formatCurrencyToVND,
    isLogedIn,
    checkDarkLightMode,
};
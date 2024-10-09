/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react'
import { BgKey } from '../../interfaces'
import { gradientBgPurplePink, gradientBgDark, gradientBgPinkRed } from '../../colors'
import COOKIE_KEYS from '@/constants/cookieKeys'
import { getCookie } from '@/ultis/cookieHandler'
import useConfigPage from '@/store/custom_hooks/useConfigPage'

type Props = {
  bg: BgKey
  children: ReactNode
}

export default function SectionFullScreen({ bg, children }: Props) {
  const {darkMode} = useConfigPage();
  let componentClass = 'flex min-h-screen items-center justify-center '

  if (darkMode) {
    componentClass += gradientBgDark
  } else if (bg === 'purplePink') {
    componentClass += gradientBgPurplePink
  } else if (bg === 'pinkRed') {
    componentClass += gradientBgPinkRed
  }

  return <div className={componentClass}>{children}</div>
}

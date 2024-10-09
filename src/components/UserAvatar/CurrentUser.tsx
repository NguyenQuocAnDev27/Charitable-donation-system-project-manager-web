import React, { ReactNode } from 'react'
import UserAvatar from '.'
import { getCookie } from '@/ultis/cookieHandler'
import COOKIE_KEYS from '@/constants/cookieKeys'

type Props = {
  className?: string
  children?: ReactNode
}

export default function UserAvatarCurrentUser({ className = '', children }: Props) {
  const userEmail = getCookie(COOKIE_KEYS.USER_NAME) ?? "Unknown User";

  return (
    <UserAvatar username={userEmail} className={className}>
      {children}
    </UserAvatar>
  )
}

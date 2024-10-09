import React, { ReactNode } from 'react'
import UserAvatar from '.'
import useConfigPage from '@/store/custom_hooks/useConfigPage'

type Props = {
  className?: string
  children?: ReactNode
}

export default function UserAvatarCurrentUser({ className = '', children }: Props) {
  const {userInfo} = useConfigPage();

  return (
    <UserAvatar username={userInfo?.fullName ?? 'Unknown'} className={className}>
      {children}
    </UserAvatar>
  )
}

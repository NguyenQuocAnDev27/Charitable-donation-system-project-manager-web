import {
  mdiMonitor,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Trang chủ',
  },{
    href: '/project_management',
    icon: mdiMonitor,
    label: 'Các chiến dịch',
  },
]

export default menuAside

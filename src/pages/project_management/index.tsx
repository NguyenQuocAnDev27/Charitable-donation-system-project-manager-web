/* eslint-disable @typescript-eslint/no-unused-vars */
'use-client';

import { mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Button from '@/components/Button'
import CardBox from '@/components/CardBox'
import CardBoxComponentEmpty from '@/components/CardBox/Component/Empty'
import LayoutAuthenticated from '@/layouts/Authenticated'
import NotificationBar from '@/components/NotificationBar'
import SectionMain from '@/components/Section/Main'
import SectionTitleLineWithButton from '@/components/Section/TitleLineWithButton'
import ProjectTables from '@/components/Table'
import { getPageTitle } from '@/config'
import data from './SampleData'
import { getCookie, setCookie } from '@/ultis/cookieHandler'
import COOKIE_KEYS from '@/constants/cookieKeys'
import { checkDarkLightMode } from '@/ultis/globalUltils';

const TablesPage = () => {
  checkDarkLightMode();

  return (
    <>
      <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head>
      <SectionMain>
        {/* <SectionTitleLineWithButton icon={mdiTableBorder} title="Tables" main>
          <Button
            href="https://github.com/justboil/admin-one-react-tailwind"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton> */}

        {/* <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar> */}

        <CardBox className="mb-6" hasTable>
          <ProjectTables data={data} />
        </CardBox>

        {/* <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" /> */}

        {/* <NotificationBar color="danger" icon={mdiTableOff}>
          <b>Empty card.</b> When there&apos;s nothing to show
        </NotificationBar>

        <CardBox>
          <CardBoxComponentEmpty />
        </CardBox> */}
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage

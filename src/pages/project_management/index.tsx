/* eslint-disable react-hooks/exhaustive-deps */
'use-client'

import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import CardBox from '@/components/CardBox'
import LayoutAuthenticated from '@/layouts/Authenticated'
import SectionMain from '@/components/Section/Main'
import ProjectTables from '@/components/Table'
import { getPageTitle } from '@/config'
import { checkDarkLightMode } from '@/utils/globalUltils'
import useProjectAPI from '@/store/api_hooks/useProjects'
import useConfigPage from '@/store/custom_hooks/useConfigPage'

const ProjectManagementPage = () => {
  checkDarkLightMode()

  const [tableData, setTableData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const { data, loading, error, success, fetchProjects } = useProjectAPI()
  const { userInfo } = useConfigPage()

  function handleOnClickPage(page: number) {
    setCurrentPage(page)
  }

  useEffect(() => {
    // console.log(`PM page ${JSON.stringify(userInfo)}`)
    if (userInfo !== null && userInfo?.userId !== null) {
      fetchProjects(currentPage, userInfo?.userId)
    }
  }, [userInfo])

  useEffect(() => {
    if (success !== null) {
      if (success) {
        setTableData(data.list ?? [])
        setTotalPage(data.totalPages ?? 1)
        setCurrentPage(data.currentPage ?? 0)
      } else {
        window.alert(error)
      }
    }
  }, [loading, success, error])

  return (
    <>
      <Head>
        <title>{getPageTitle('Quản Lí Chiến Dịch')}</title>
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
          <ProjectTables
            data={tableData}
            currentPage={currentPage}
            totalPage={totalPage}
            handleOnClickPage={handleOnClickPage}
          />
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

ProjectManagementPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProjectManagementPage

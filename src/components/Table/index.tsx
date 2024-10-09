/* eslint-disable @typescript-eslint/no-unused-vars */
import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import { OverviewProject } from '@/interfaces/OverviewProject'
import { formatCurrencyToVND } from '@/utils/globalUltils'
import global from '@/constants/global'

function calculateRemainingDays(expired_day: Date | string, start_day: Date | string): number {
  const expirationDate = typeof expired_day === 'string' ? new Date(expired_day) : expired_day
  const startDate = typeof start_day === 'string' ? new Date(start_day) : start_day

  // Check if the dates are valid
  if (isNaN(expirationDate.getTime()) || isNaN(startDate.getTime())) {
    console.error('Invalid date(s) provided.')
    return NaN // or handle the error as needed
  }

  console.log(`End - ${expirationDate} # Start - ${startDate}`)
  console.log(`Day 1 - ${expirationDate.getTime()} # Day 2 - ${startDate.getTime()}`)

  const timeDifference = expirationDate.getTime() - startDate.getTime()
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return remainingDays
}

const TableLabels = {
  Name: 'Chiến dịch',
  CurrentAmount: 'Số tiền ủng hộ hiện tại',
  Process: 'Tiến độ',
  RemainingDays: 'Số ngày còn lại',
}

const ProjectTables: React.FC<{
  data: OverviewProject[]
  currentPage: number
  totalPage: number
  handleOnClickPage: (page: number) => void
}> = ({ data, currentPage, totalPage, handleOnClickPage }) => {
  const pagesList = []

  for (let i = 0; i < totalPage; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>{TableLabels.Name}</th>
            <th>{TableLabels.CurrentAmount}</th>
            <th>{TableLabels.Process}</th>
            <th>{TableLabels.RemainingDays}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((project: OverviewProject) => (
            <tr key={project.projectId}>
              <td
                data-label={TableLabels.Name}
                className={`${
                  project.status === global.PROJECT_STATUS.STOPPED
                    ? 'text-red-500 line-through'
                    : project.status === global.PROJECT_STATUS.COMPLETED
                      ? 'text-purple-500'
                      : project.status === global.PROJECT_STATUS.PENDING
                        ? 'text-green-500'
                        : ''
                }`}
              >
                {project.projectName}
              </td>

              <td data-label={TableLabels.CurrentAmount} className="lg:w-60 text-right">
                {formatCurrencyToVND(project.currentAmount)}
              </td>
              <td data-label={TableLabels.Process} className="lg:w-32">
                <progress
                  className="flex w-2/5 self-center lg:w-full"
                  max="100"
                  value={(project.currentAmount / project.goalAmount) * 100}
                >
                  {(project.currentAmount / project.goalAmount) * 100}
                </progress>
              </td>
              <td
                data-label={TableLabels.RemainingDays}
                className="lg:w-40 whitespace-nowrap text-center"
              >
                <small className="text-gray-500 dark:text-slate-400">
                  {calculateRemainingDays(project.endDate, project.startDate)}
                </small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => setIsModalInfoActive(true)}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => handleOnClickPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {totalPage}
          </small>
        </div>
      </div>
    </>
  )
}

export default ProjectTables

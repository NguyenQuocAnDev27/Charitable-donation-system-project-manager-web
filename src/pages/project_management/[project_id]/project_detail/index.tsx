import Button from '@/components/Button'
import Buttons from '@/components/Buttons'
import CardBox from '@/components/CardBox'
import Divider from '@/components/Divider'
import FormField from '@/components/Form/Field'
import SectionMain from '@/components/Section/Main'
import { getPageTitle } from '@/config'
import global from '@/constants/global'
import LayoutAuthenticated from '@/layouts/Authenticated'
import { mdiAccount, mdiMail } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import React, { ReactElement } from 'react'

const ProjectDetailPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Chi tiết chiến dịch')}</title>
      </Head>
      <SectionMain>
        <CardBox>
          <Formik
            initialValues={{
                projectId: 0,
                projectName: 'test',
                description: 'test',
                goalAmount: 0,
                currentAmount: 0,
                startDate: new Date,
                endDate: new Date,
                status: global.PROJECT_STATUS.PENDING,
                color: 'green',
            //   textarea: 'Hello',
            }}
            onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          >
            <Form>
              <FormField label="Grouped with icons" icons={[mdiAccount, mdiMail, mdiMail]}>
                <Field name="projectId" placeholder="Tên chiến dịch" />
                <Field name="projectName" placeholder="Tên chiến dịch" />
                <Field name="description" placeholder="Tóm tắt về chiến dịch" />
              </FormField>

              <FormField label="Project Status" labelFor="color">
                <Field name="color" id="color" component="select">
                  <option value={global.PROJECT_STATUS.STOPPED} className='text-red-600'>Đã dừng</option>
                  <option value={global.PROJECT_STATUS.PENDING} className='text-green-500'>Đang hoạt động</option>
                  <option value={global.PROJECT_STATUS.COMPLETED} className='text-purple-600'>Đã hoàn thành</option>
                </Field>
              </FormField>

              <Divider />

              {/* <FormField label="Textarea" hasTextareaHeight>
                <Field name="textarea" as="textarea" placeholder="Your text here" />
              </FormField> */}

              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Submit" />
                <Button type="reset" color="info" outline label="Reset" />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

ProjectDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProjectDetailPage

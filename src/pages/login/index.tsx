/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '@/components/Button'
import CardBox from '@/components/CardBox'
import SectionFullScreen from '@/components/Section/FullScreen'
import LayoutGuest from '@/layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '@/components/Form/Field'
import FormCheckRadio from '@/components/Form/CheckRadio'
import Divider from '@/components/Divider'
import Buttons from '@/components/Buttons'
import { useRouter } from 'next/router'
import { getPageTitle } from '@/config'
import global from '@/constants/global'
import { checkDarkLightMode } from '@/utils/globalUltils'
import useAuthenticate from '@/store/api_hooks/useAuthenticate'
import { getCookie, setCookie } from '@/utils/cookieHandler'
import COOKIE_KEYS from '@/constants/cookieKeys'
import useConfigPage from '@/store/custom_hooks/useConfigPage'
import useGetInfoDetail from '@/store/api_hooks/useGetInfoDetail'

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState(null)
  const {
    data: dataAuth,
    loading: loadingAuthAPI,
    error: errorFetchAuthMessage,
    success: successFetchAuth,
    login,
  } = useAuthenticate()
  const {
    data: dataUserInfo,
    loading: loadingUserDetailAPI,
    error: errorFetchUserInfoMessage,
    success: successFetchUserInfo,
    fetchInfoDetail,
  } = useGetInfoDetail()
  const { userInfo, setUserInfo } = useConfigPage()

  checkDarkLightMode()

  const handleSubmit = (formValues: LoginForm) => {
    const form_email = formValues.email
    const form_password = formValues.password
    const form_remember = formValues.remember
    setEmail(form_email)
    login(form_email, form_password)
  }

  useEffect(() => {
    if (successFetchAuth !== null) {
      if (successFetchAuth) {
        console.log(`Access token: ${JSON.stringify(dataAuth)}`)
        setCookie(COOKIE_KEYS.ACCESS_TOKEN, dataAuth.accessToken)
        setCookie(COOKIE_KEYS.REFRESH_TOKEN, dataAuth.refreshToken)
        setCookie(COOKIE_KEYS.USER_GMAIL, email)

        const accessToken = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
        if (accessToken !== undefined && accessToken !== 'undefined') {
          fetchInfoDetail(email)
        } else {
          window.alert('Login failed')
        }
      } else if (errorFetchAuthMessage !== null) {
        window.alert(errorFetchAuthMessage)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAuthAPI, successFetchAuth])

  useEffect(() => {
    if (successFetchUserInfo !== null) {
      if (successFetchUserInfo) {
        setUserInfo(dataUserInfo)
        router.push('/dashboard')
      } else if (errorFetchUserInfoMessage !== null) {
        window.alert(errorFetchUserInfoMessage)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUserDetailAPI, successFetchUserInfo])

  const initialValues: LoginForm = {
    email: '',
    password: '',
    remember: false,
  }

  return (
    <>
      <Head>
        <title>{getPageTitle(global.pageTitle.login)}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <FormField label="Email" help="Nhập email">
                <Field name="email" placeholder="admin_email@example.com" />
              </FormField>

              <FormField label="Mật khẩu" help="Nhập mật khẩu">
                <Field name="password" type="password" placeholder={'*'.repeat(10)} />
              </FormField>

              <FormCheckRadio type="checkbox" label="Ghi nhớ cho lần đăng nhập sau">
                <Field type="checkbox" name="remember" />
              </FormCheckRadio>

              <Divider />

              <Buttons className="flex items-center w-full">
                <Button type="submit" label="Đăng nhập" color="info" className="w-full" />
                {/* <Button href="/dashboard" label="Home" color="info" outline /> */}
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default LoginPage

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import '../css/main.css'
import global from '@/constants/global'
import useConfigPage from '@/store/custom_hooks/useConfigPage'
import { checkDarkLightMode } from '@/utils/globalUltils'
import { getCookie } from '@/utils/cookieHandler'
import COOKIE_KEYS from '@/constants/cookieKeys'
import { useRouter } from 'next/router'
import useGetInfoDetail from '@/store/api_hooks/useGetInfoDetail'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  const title = global.titleApp
  const description = global.descriptionApp

  const { data, loading, error, success, fetchInfoDetail } = useGetInfoDetail()
  const accessToken = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
  const email = getCookie(COOKIE_KEYS.USER_GMAIL)
  const { userInfo, setUserInfo } = useConfigPage()
  const router = useRouter()

  useEffect(() => {
    if (
      accessToken !== undefined &&
      accessToken !== 'undefined' &&
      accessToken !== null &&
      accessToken !== 'null'
    ) {
      // console.log('Refresh user info')
      fetchInfoDetail(email)
    } else {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (success !== null && success === true) {
      // console.log('Set refresh user info')
      // console.log(JSON.stringify(data))
      // console.log(JSON.stringify(userInfo))
      setUserInfo(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, success])

  return (
    <>
      {getLayout(
        <>
          <Head>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* <meta property="og:url" content={url} />
            <meta property="og:site_name" content="JustBoil.me" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content={imageWidth} />
            <meta property="og:image:height" content={imageHeight} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image:src" content={image} />
            <meta property="twitter:image:width" content={imageWidth} />
            <meta property="twitter:image:height" content={imageHeight} /> */}

            <link rel="icon" href="/project_manager/favicon.png" />
          </Head>

          {/* SEO Google Function */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=UA-130795909-1"
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-130795909-1');
            `}
          </Script>
          {/* SEO Google Function */}

          <Component {...pageProps} />
        </>
      )}
    </>
  )
}

export default MyApp

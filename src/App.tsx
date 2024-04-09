import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import BaseLayout from '@layouts/base-layout'
import HomePage from '@pages/home-page'
import QuestionnaireStatusPage from '@pages/questionnaire/status'
import QuestionnaireProgressPage from '@pages/questionnaire/progress'
import QuestionnaireFormsPage from '@pages/questionnaire/forms'
import SignInPage from '@pages/sign-in'
import { APP_PAGES } from '@constants/app-pages'
import AppProvider from '@lib/contexts/app-context'
import SpinnerLoadingProvider from '@lib/contexts/spinner-loading-context'

const router = createBrowserRouter([
  {
    element: (
      <>
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      </>
    ),
    children: [
      {
        path: '/',
        element: <HomePage>Home</HomePage>
      },
      {
        path: APP_PAGES.SIGN_IN,
        element: <SignInPage />
      },
      {
        path: APP_PAGES.QUESTIONNARE_DASHBOARD,
        element: null,
        children: [
          {
            path: `${APP_PAGES.QUESTIONNARE_DASHBOARD}/`,
            element: <QuestionnaireStatusPage />
          },
          {
            path: APP_PAGES.QUESTIONNARE_PROGRESS,
            element: <QuestionnaireProgressPage />
          },
          {
            path: APP_PAGES.QUESTIONNARE_FORMS,
            element: <QuestionnaireFormsPage />
          }
        ]
      }
    ]
  }
])

const App = () => (
  <AppProvider>
    <SpinnerLoadingProvider>
      <RouterProvider router={router} />
    </SpinnerLoadingProvider>
  </AppProvider>
)

export default App

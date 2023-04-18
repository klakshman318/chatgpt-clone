import SessionProvider from '@/components/SessionProvider'
import './globals.css'
import SideBar from '@/components/SideBar'
import { getServerSession } from 'next-auth'
import { POST } from './api/auth/[...nextauth]/route'
import Login from '@/components/Login'
import ToastProvider from '@/components/ToastProvider'

export const metadata = {
  title: 'ChatGPT Clone',
  description: 'ChatGPT Clone Messenger',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(POST);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>
              <ToastProvider />
              <div className="bg-[#343541] flex-1">
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}

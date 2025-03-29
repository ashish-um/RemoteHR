import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Dashboard from './pages/dashboard'
import OfferLetter from './pages/OfferLater'
import ChatBot from './components/chatBot'
import VerifyDocument from './pages/VerifyDocument'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import HRChatbot from './pages/HRChatbot'
// import { configDotenv } from 'dotenv'

function App() {



  return (
    <>
    <HRChatbot/>
    {/* <Hiring/> */}
      {/* <div className="flex flex-col">
        <header className='border-2 w-14'>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <Dashboard />
        <OfferLetter />
        <ChatBot />
        <VerifyDocument />
      </div> */}
    </>
  )
}

export default App

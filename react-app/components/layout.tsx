import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Modal from "react-modal"

import { useStoreActions, useStoreState, useStore } from "../store"

const customModalStyles = {
  content: {
    margin: "auto",
    maxHeight: "300px",
    maxWidth: "400px",
  },
  overlay: { zIndex: 100, background: "rgba(0,0,0,0.5)" },
}

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // TODO: Dynamically calculate these from the Metadata permissions values
  const roles = useStoreState(state => state.allRoles)
  const currentRole = useStoreState(state => state.currentRole)
  const setCurrentRole = useStoreActions(actions => actions.setCurrentRole)
  const loadMetadataAndDatabaseInfo = useStoreActions(
    actions => actions.loadMetadataAndDatabaseInfo
  )

  const handleClick = () => {
    if (!isModalOpen) {
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
  }

  return (
    <header className="absolute flex justify-between w-screen h-20 px-12 py-1 shadow-md place-items-center">
      <div className="flex">
        <img src="/hasura_logo.svg" alt="hasura" id="hasura-logo" />
        <h1 className="text-2xl font-semibold ">Data Dictionary</h1>
      </div>
      <button
        onClick={handleClick}
        className="flex items-center justify-center capitalize rounded role-change-btn hover:shadow-xl"
      >
        <img src="/changeIcon.svg" alt="Switch role" id="switch-icon" />
        {`Role: ${currentRole}`}
      </button>
      {/* Persmissons selector modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <div className="block">
          <div className="flex justify-between">
            <span className="text-gray-700">Select role</span>
            <div
              className="flex items-center justify-center w-8 h-8 rouded close-btn"
              role="button"
              onClick={closeModal}
            >
              <img src="/closeIcon.svg" alt="close-icon" className="w-3" />
            </div>
          </div>
          <div className="mt-2">
            {roles?.map(role => (
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="radio"
                    value={role}
                    checked={currentRole == role}
                    onChange={e => {
                      setCurrentRole(e.target.value)
                      loadMetadataAndDatabaseInfo()
                    }}
                  />
                  <span className="ml-2">{role}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </header>
  )
}

const NavMenu = () => {
  const router = useRouter()

  // TODO: Extract this maybe to make it cleaner
  const navItems = [
    {
      text: "Data Models",
      route: "/",
    },
    {
      text: "Data Graph",
      route: "/datagraph",
    },
    {
      text: "GraphiQL",
      route: "/graphiql",
    },
  ]

  const styles =
    "flex  w-full h-12 mt-6 text-center place-items-center cursor-pointer bg-white shadow-md justify-center rounded hover:shadow-lg text-gray-800 border-l-4 border-transparent pr-4 nav-tab"

  return (
    <nav className="w-1/4 p-6 bg-gray-300">
      {navItems.map(({ route, text }) => (
        <div
          key={route}
          className={
            route === router.pathname
              ? `${styles} border-l-4 border-indigo-700 text-indigo-700 hover:shadow-md`
              : styles
          }
        >
          <Link href={route}>
            <p className="text-base font-medium hover:text-indigo-700">
              {text}
            </p>
          </Link>
        </div>
      ))}
    </nav>
  )
}

export default function Layout({ children }) {
  return (
    <div className="flex flex-row justify-center min-h-screen bg-gray-100">
      <Header />
      <div className="flex w-screen pt-20">
        <NavMenu />
        <main id="graphmain" className="w-full max-w-full bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}

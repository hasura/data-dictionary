import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Modal from "react-modal"

import { useStoreActions, useStoreState, useStore } from "../store"
import { customModalStyles } from "../pages/datagraph"

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // TODO: Dynamically calculate these from the Metadata permissions values
  const roles = ["admin", "user"]
  const currentRole = useStoreState(state => state.currentRole)
  const setCurrentRole = useStoreActions(actions => actions.setCurrentRole)
  const loadMetadataAndDatabaseInfo = useStoreActions(
    actions => actions.loadMetadataAndDatabaseInfo
  )

  return (
    <header className="absolute flex w-screen h-20 pl-10 py-1 shadow-md place-items-center place-content-start">
      <div className="flex">
        <img src="/hasura_logo.svg" alt="hasura" id="hasura-logo" />
        <h1 className="pr-10 text-3xl font-medium">Data Dictionary</h1>
      </div>
      <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none pt-2">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          checked={isModalOpen}
          onChange={() => setIsModalOpen(!isModalOpen)}
          className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox"
        />
        <label
          htmlFor="toggle"
          className="block h-6 overflow-hidden bg-gray-500 rounded-full cursor-pointer toggle-label"
        ></label>
      </div>

      <label htmlFor="toggle" className="text-lg text-gray-700 pt-2">
        Show for specific roles only
      </label>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customModalStyles}
      >
        <div className="block">
          <span className="text-gray-700">Role</span>
          <div className="mt-2">
            {roles.map(role => (
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

  console.log(router)

  // TODO: Extract this maybe to make it cleaner
  const navItems = [
    {
      text: "Data Models",
      route: "/"
    },
    {
      text: "Data Graph",
      route: "/datagraph"
    },
    {
      text: "GraphiQL",
      route: "/graphiql"
    }
  ]

  const styles =
    "flex  w-full h-12 mt-6 text-center place-items-center cursor-pointer bg-white shadow-md justify-center rounded delay-75 hover:shadow-lg text-gray-800"

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
            <p className="text-lg font-medium hover:text-indigo-700">{text}</p>
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

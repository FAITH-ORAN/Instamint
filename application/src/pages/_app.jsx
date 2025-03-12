import Footer from "@/components/business/Footer.jsx"
import Header from "@/components/business/Header.jsx"
import { ActiveIconProvider } from "@/components/contexts/ActiveIconContext.jsx"
import { SessionProvider } from "next-auth/react"
import "../i18n.js"
import "../styles/globals.css"

const App = ({ Component, pageProps, session }) => (
  <SessionProvider session={session}>
    <ActiveIconProvider>
      <Header />
      <main className=" h-dvh flex flex-col">
        <section>
          <div className="p-4 text-base font-medium">
            <Component {...pageProps} />
          </div>
        </section>
      </main>
      <Footer />
    </ActiveIconProvider>
  </SessionProvider>
)

export default App

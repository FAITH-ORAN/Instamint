import Link from "next/link"
import "../styles/globals.css"

const App = ({ Component, pageProps }) => (
  <main className="flex flex-col">
    <header className="border-b-2 border-b-stone-200 bg-stone-100">
      <div className="mx-auto max-w-5xl p-4 flex justify-between items-center">
        <Link href="/">TODOS</Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/todos/create">Create</Link>
            </li>
            <li>
              <Link href="/todos">List</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <section>
      <div className="mx-auto max-w-5xl p-4">
        <Component {...pageProps} />
      </div>
    </section>
  </main>
)

export default App

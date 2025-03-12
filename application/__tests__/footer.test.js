import Footer from "@/components/business/Footer"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("Footer component", () => {
  it("renders correctly", () => {
    render(<Footer />)

    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})

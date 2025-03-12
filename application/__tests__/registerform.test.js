import SigupForm from "@/components/business/SigupForm"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }), // Mock t() pour retourner simplement la clé
}))

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

describe("LoginForm component", () => {
  it("renders correctly", () => {
    render(<SigupForm />)
    expect(screen.getByLabelText("registerForm.email")).toBeInTheDocument()
    expect(screen.getByLabelText("registerForm.password")).toBeInTheDocument()
    expect(screen.getByText("registerForm.signup")).toBeInTheDocument()
  })
})

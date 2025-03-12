import LoginForm from "@/components/business/LoginFormUI"
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
    render(<LoginForm />)
    expect(screen.getByLabelText("loginForm.email")).toBeInTheDocument()
    expect(screen.getByLabelText("loginForm.password")).toBeInTheDocument()
    expect(screen.getByText("loginForm.signup")).toBeInTheDocument()
    expect(screen.getByText("loginForm.signin")).toBeInTheDocument()
    expect(screen.getByText("loginForm.forgotPassword")).toBeInTheDocument()
  })
})

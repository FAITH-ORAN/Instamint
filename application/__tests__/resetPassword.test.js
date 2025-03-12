import ResetpasswordForm from "@/components/business/ResetpasswordForm"
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
    render(<ResetpasswordForm />)
    expect(
      screen.getByLabelText("resetPasswordForm.newPassword"),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText("resetPasswordForm.password"),
    ).toBeInTheDocument()
    expect(screen.getByText("resetPasswordForm.reset")).toBeInTheDocument()
  })
})

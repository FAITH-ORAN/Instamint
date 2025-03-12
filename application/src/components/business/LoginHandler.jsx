import axios from "axios"

export const handleSubmit = async ({ email, password }, handlers) => {
  const {
    setError,
    setTempToken,
    setRequires2FA,
    setQRCodeDataURL,
    router,
    t,
    signIn,
  } = handlers

  try {
    setError(null)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/sign-in`,
      { email, password },
    )

    if (response.data.requires2FA) {
      setTempToken(response.data.tempToken)
      await handleGenerateOTP(response.data.userId, {
        setError,
        setQRCodeDataURL,
        setRequires2FA,
        t,
      })
    } else {
      await handleSignIn({ email, password }, { router, t, signIn, setError })
    }
  } catch (err) {
    setError(t("loginForm.errorMessage"))
  }
}

export const handleGenerateOTP = async (userId, handlers) => {
  const { setError, setQRCodeDataURL, setRequires2FA, t } = handlers

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/generate-2FA/${userId}`,
    )

    setQRCodeDataURL(response.data.qrCodeDataURL)
    setRequires2FA(true)
  } catch (err) {
    setError(t(err.message))
  }
}

const handleSignIn = async ({ email, password }, handlers) => {
  const { router, t, signIn, setError } = handlers
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  })

  if (result.ok) {
    router.push("/")
  } else {
    setError(t("loginForm.errorMessage"))
  }
}

export const handleVerifyOTP = async (tempToken, otp, handlers) => {
  const { setError, router, t, signIn } = handlers

  try {
    setError(null)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/verify-2FA`,
      { tempToken, otp },
    )
    const { token, email, password } = response.data

    if (token) {
      await handleSignIn({ email, password }, { router, t, signIn, setError })
    } else {
      setError(t("loginForm.errorMessage"))
    }
  } catch (err) {
    setError(t("loginForm.errorMessage"))
  }
}

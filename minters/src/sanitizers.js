const extract = (keys) => {
  const subExtract = (obj) =>
    Array.isArray(obj)
      ? obj.map(subExtract)
      : keys.reduce((sanitized, key) => ({ ...sanitized, [key]: obj[key] }), {})

  return subExtract
}

export const sanitizeMinter = extract([
  "id",
  "picture",
  "bio",
  "language",
  "isProfileVisible",
  "isEmailSearchEnabled",
])

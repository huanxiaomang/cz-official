export function normalizeAssetUrl(value?: string | null) {
  if (!value) {
    return value ?? null
  }

  const normalizedValue = value.replace(/\\/g, '/').trim()

  if (!normalizedValue) {
    return null
  }

  if (/^https?:\/\//i.test(normalizedValue)) {
    try {
      const url = new URL(normalizedValue)
      const uploadMatch = url.pathname.match(/\/uploads\/.+$/)
      if (uploadMatch) {
        return uploadMatch[0]
      }

      return normalizedValue
    }
    catch {
      return normalizedValue
    }
  }

  if (normalizedValue.startsWith('/uploads/')) {
    return normalizedValue
  }

  if (normalizedValue.startsWith('uploads/')) {
    return `/${normalizedValue}`
  }

  return normalizedValue
}

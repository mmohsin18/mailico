export async function fetchRejectionReason(): Promise<string> {
  try {
    const res = await fetch('https://naas.isalman.dev/no')
    const data = await res.json()
    return data.reason || 'Not allowed.'
  } catch (error) {
    return 'Action not allowed on your current plan.'
  }
}

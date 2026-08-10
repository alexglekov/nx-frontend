export const getVariablesForEmailSignUp = (formData: FormData) => {
  const email = formData.get('email') as string
  const name = formData.get('username') as string
  const password = formData.get('password') as string

  if (!(email && name && password)) throw new Error('Invalid form data')

  return {
    email,
    name,
    password
  }
}

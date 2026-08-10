import { v4 } from 'uuid'

/**
 * Transforms a Data URL to a File object.
 *
 * @param {string} dataurl - The Data URL to be transformed.
 * @returns {File} - The transformed File object.
 */

export const transformDataURLtoFile = (dataurl: string) => {
  const arr = dataurl.split(',')
  const bstr = atob(arr[arr.length - 1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `user_avatar_${v4()}`, {
    // TODO: ADD OTHER TYPES
    type: 'image/png'
  })
}

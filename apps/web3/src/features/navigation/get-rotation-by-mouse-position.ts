interface MousePosition {
  x: number | null
  y: number | null
}
export const getRotationByMousePosition = (mousePosition: MousePosition) => {
  if (!mousePosition.x || !mousePosition.y) return null

  const { x, y } = mousePosition

  const constrain = 20
  const calcX = -(y + 10) / constrain
  const calcY = (x + 1) / constrain
  return `perspective(100px) rotateX(${calcX}deg) rotateY(${calcY}deg) scale(2)`
}

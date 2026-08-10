interface Props {
  type: 'up' | 'down'
}
export const ModeButton: React.FC<Props> = ({ type }) => {
  return <button>{type}</button>
}

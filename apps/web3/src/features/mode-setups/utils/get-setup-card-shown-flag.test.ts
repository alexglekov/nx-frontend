import { SetupsGameFragment } from '__generated__/graphql'
import { getSetupCardShownFlag } from './get-setup-card-shown-flag'

// eslint-disable-next-line max-statements
describe('getCardShownFlag', () => {
  // prettier-ignore
  const setups = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' }
  ] as unknown as SetupsGameFragment[]

  it('should return true for the last setup in a row if it is selected', () => {
    const setup = setups[2]
    const selectedSetup = setup
    const i = 2
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(true)
  })

  it('should return true for the last setup in the list if it is selected', () => {
    const setup = setups[5]
    const selectedSetupId = '4'
    const i = 5
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetupId, i)
    expect(result).toBe(true)
  })

  it('should return true for the last setup in the row if  selected setup in the same row', () => {
    const setup = setups[8]
    const selectedSetup = setups[7]
    const i = 8
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(true)
  })

  it('should return true for the last setup in the list if it is not selected and selected setup in the same  row', () => {
    const setup = setups[8]
    const selectedSetup = setups[7]
    const i = 8
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(true)
  })

  it('should return false for a setup that is not the last in a row and selected', () => {
    const setup = setups[1]
    const selectedSetup = setups[1]
    const i = 1
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(false)
  })

  it('should return false for a setup that is not the last in a row and not selected', () => {
    const setup = setups[1]
    const selectedSetup = setups[2]
    const i = 1
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(false)
  })

  it('should return false for a setup that is last in a row and but selected setup in the next row', () => {
    const setup = setups[2]
    const selectedSetup = setups[5]
    const i = 2
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(false)
  })

  it('should return false for a setup that is last in a list and but selected setup in the previous row', () => {
    const setup = setups[5]
    const selectedSetup = setups[2]
    const i = 5
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(false)
  })

  it('should return true for the last setup in a row if it is selected and  with 5 setups in the list', () => {
    const setups = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' }
    ] as unknown as SetupsGameFragment[]
    const setup = setups[2]
    const selectedSetup = setup
    const i = 2
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(true)
  })

  it('should return true for the first setup in the list, if it is selected and with 1 setups in the list', () => {
    const setups = [{ id: '1' }] as unknown as SetupsGameFragment[]
    const setup = setups[0]
    const selectedSetup = setup
    const i = 0
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(true)
  })

  it('should return false for the first setup in the list, if it is selected and with 2 setups in the list', () => {
    const setups = [{ id: '1' }, { id: '2' }] as unknown as SetupsGameFragment[]
    const setup = setups[0]
    const selectedSetup = setup
    const i = 0
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetup.id, i)
    expect(result).toBe(false)
  })

  it('should return true for the last setup in the list, if it is not selected and with 2 setups in the list', () => {
    const setups = [{ id: '1' }, { id: '2' }] as unknown as SetupsGameFragment[]
    const i = 1
    const setup = setups[i]
    const selectedSetupId = '1'
    const result = getSetupCardShownFlag(setups, setup.id, selectedSetupId, i)
    expect(result).toBe(true)
  })

  it('should return false if selected setup is falsy', () => {
    const setup = setups[1]
    const i = 1
    const result = getSetupCardShownFlag(setups, setup.id, null, i)
    expect(result).toBe(false)
  })

  it('should return true for the last setup in the list and selected setup in a row, if it is not selected and with 5 setups in the list', () => {
    const setupId = setups[4].id
    const selectedSetupId = '3'
    const i = 4
    const result = getSetupCardShownFlag(setups, setupId, selectedSetupId, i)
  })
})

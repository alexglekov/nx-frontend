import { SetupPredictType } from '../types'
import { getAddSetupVariables } from './get-add-setup-variables'

describe('getAddSetupVariables', () => {
  it('should return the correct variables when setupBetAmountSelection is defined', () => {
    const formValues = {
      setupBetAmount: undefined,
      setupBetAmountSelection: '10',
      gameId: '1',
      price: '1.5'
    }
    const expected = {
      amount: 10,
      gameId: '1',
      price: 1.5
    }
    expect(getAddSetupVariables(formValues, SetupPredictType.TP, '1')).toEqual(
      expected
    )
  })

  it('should return the correct variables when setupBetAmount is defined', () => {
    const formValues = {
      setupBetAmount: '10',
      setupBetAmountSelection: '25',
      gameId: '1',
      price: '1.5'
    }
    const expected = {
      amount: 10,
      gameId: '1',
      price: 1.5
    }
    expect(getAddSetupVariables(formValues, SetupPredictType.TP, '1')).toEqual(
      expected
    )
  })
})

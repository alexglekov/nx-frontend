import { useState, useEffect } from 'react'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { getSecondInputValueDev } from '../utils/get-second-input-value-dev'
import { getSecondInputValueMain } from '../utils/get-second-input-value-main'
import { getFirstInputValueDev } from '../utils/get-first-input-value-dev'
import { getFirstInputValueMain } from '../utils/get-first-input-value-main'

const IS_MAINNET_STAND = STAND === Stand.mainnet

export const useBuyBackCardInputs = (price = 1) => {
  const [firstInputValue, setFirstInputValue] = useState<string>('')
  const [secondInputValue, setSecondInputValue] = useState<string>('')
  const [isFirstInputFocused, setFirstInputFocused] = useState(false)
  const [isSecondInputFocused, setSecondInputFocused] = useState(false)

  const [isSell, setIsSell] = useState(true)

  useEffect(() => {
    if (firstInputValue === '') {
      setSecondInputValue('')
      return
    }

    const numberredInputValue = Number(firstInputValue)

    const newValue =
      IS_MAINNET_STAND ?
        getSecondInputValueMain({
          isSell,
          inputValue: numberredInputValue,
          price
        })
      : getSecondInputValueDev({
          isSell,
          inputValue: numberredInputValue,
          price
        })

    if (
      Number(newValue.toFixed(2)) !== Number(secondInputValue) &&
      !isSecondInputFocused
    ) {
      setSecondInputValue(price === 1 ? String(newValue) : newValue.toFixed(2))
    }
  }, [firstInputValue])

  useEffect(() => {
    if (secondInputValue === '') {
      setFirstInputValue('')
      return
    }

    const numberredInputValue = Number(secondInputValue)

    const newValue =
      IS_MAINNET_STAND ?
        getFirstInputValueMain({
          isSell,
          inputValue: numberredInputValue,
          price
        })
      : getFirstInputValueDev({
          isSell,
          inputValue: numberredInputValue,
          price
        })

    if (
      Number(newValue.toFixed(2)) !== Number(firstInputValue) &&
      !isFirstInputFocused
    ) {
      setFirstInputValue(newValue.toFixed(2))
    }
  }, [secondInputValue])

  useEffect(() => {
    const bufferFistInput = firstInputValue
    const bufferSecondInput = secondInputValue

    setFirstInputValue(bufferSecondInput)
    setSecondInputValue(bufferFistInput)
  }, [isSell])

  return {
    firstInputValue,
    secondInputValue,
    setFirstInputValue,
    setSecondInputValue,
    setFirstInputFocused,
    setSecondInputFocused,
    isSell,
    setIsSell
  }
}

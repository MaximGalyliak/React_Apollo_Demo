import { makeVar } from '@apollo/client'
import { ASSUMED_USER } from '../config'

/**
 * Note that the return value of makeVar isn't the variable itself, but rather a function.
 * We get the variable's current value by calling  currentUserVar(),
 * and we set a new value by calling currentUserVar(newValue).
 */
export const currentUserVar = makeVar({ ...ASSUMED_USER })

export const selectedCommentsVar = makeVar([])

export const changeThemeVar = makeVar(true)

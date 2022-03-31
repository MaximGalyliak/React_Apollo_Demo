import { makeVar } from '@apollo/client'
import { ASSUMED_USER } from '../config'

/**
 * Note that the return value of makeVar isn't the variable itself, but rather a function.
 * We get the variable's current value by calling  currentUserVar(),
 * and we set a new value by calling currentUserVar(newValue).
 */

/**
 * changeThemeVar - simplest use case of using reactive variable on its own
 * See src/App.js that reads variable with useReactiveVar hook
 * and src/components/PageWrapper that sets it.
 */
export const changeThemeVar = makeVar(true)
/**
 * currentUserVar - this presents a use case where reactive variable is
 * used with combination of apollo cache type policy that reads info from
 * particular var. See ./index.js type policy for Query type, with new field - currentUser.
 * src/components/UserCard reads this variable utilizing useQuery hook instead of useReactiveVar
 * and src/components/EditUserDialog is tasked with modifying reactive var
 */
export const currentUserVar = makeVar({ ...ASSUMED_USER })

/**
 * selectedCommentsVar - takes previous example further by tracking which comment was selected on the
 * page and provide a value a new field on Comment type isSelected.
 * By doing this we can move state management logic from local states to Apollo cache and
 * query it just like we would back end data.
 * See ./index.js that created isSelected field in memory cache,
 * and src/components/CommentsList for usage
 */
export const selectedCommentsVar = makeVar([])
/**
 * Since interactions with selectedCommentsVar is
 * more complicated than previous examples, it
 * made sense to abstract it into separate function.
 * For better clarity manageSelectedCommentsVar scope is kept to work with specific
 * reactive var, but it can be easily refactored to be reusable to work with
 * any reactive var which has similar interactions.
 * See src/components/CommentsList for usage.
 */

export const manageSelectedCommentsVar = () => {
  const getCurrentSelection = () => {
    return selectedCommentsVar()
  }
  const clearAllSelection = () => {
    selectedCommentsVar([])
  }
  const addSelectedItem = (id) => {
    selectedCommentsVar(selectedCommentsVar().concat(id))
  }
  const removeSelectedItem = (id) => {
    selectedCommentsVar(
      selectedCommentsVar().filter((commentId) => id !== commentId)
    )
  }
  const toggleSelectedItem = (id, isSelected) => {
    if (isSelected) {
      removeSelectedItem(id)
    } else {
      addSelectedItem(id)
    }
  }
  return {
    clearAllSelection,
    removeSelectedItem,
    toggleSelectedItem,
    getCurrentSelection
  }
}

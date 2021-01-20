import { useQuery, useSession } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const session = useSession()
  const [user] = useQuery(getCurrentUser, null, { enabled: !!session.userId })
  return { currentUser: session.userId ? user : null, session }
}

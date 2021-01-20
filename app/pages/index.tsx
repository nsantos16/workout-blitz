import { BlitzPage, useSession, useRouter } from "blitz"

import Layout from "app/layouts/Layout"
import Hero from "app/components/landing/Hero"

const LandingPage: BlitzPage = () => {
  const session = useSession()
  const router = useRouter()

  if (session.userId) {
    router.push("/routines")
  }

  return (
    <div className="mt-24">
      <Hero />
    </div>
  )
}

LandingPage.getLayout = (page) => <Layout>{page}</Layout>

export default LandingPage

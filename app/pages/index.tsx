import { BlitzPage } from "blitz"

import Layout from "app/layouts/Layout"
import Hero from "app/components/landing/Hero"

const LandingPage: BlitzPage = () => (
  <div className="mt-24">
    <Hero />
  </div>
)

LandingPage.getLayout = (page) => <Layout>{page}</Layout>

export default LandingPage

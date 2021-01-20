import { BlitzPage } from "blitz"

import Layout from "app/layouts/Layout"
import Hero from "app/components/landing/Hero"

const Home: BlitzPage = () => <div className="mt-24"></div>

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home

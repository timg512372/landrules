import React from 'react'
import Layout from '../components/Layout';

import { ReactComponent as SplashGraphic } from '../svg/splash.svg';

export default function Home() {
  return (
    <Layout isWide className="home">
      <div className="jumbotron">
        <SplashGraphic />
        <h1>Ensuring transparency in land ownership</h1>
      </div>
    </Layout>
  )
}

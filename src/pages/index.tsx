import type { NextPage } from 'next'
import Link from 'next/link'

type Host = {
  link: string
  name: string
}

const hots: Host[] =
  [
    { link: 'https://www.google.com', name: 'Google' },
    { link: 'https://www.youtube.com', name: 'Youtube' }
  ]

const Home: NextPage = () => {
  return (
    <div>
      <h1>Hello!</h1>
      <ul style={{ listStyle: 'none' }}>
        {
          hots.map((host, index) => (
            <li key={index} style={{ marginBottom: '1rem' }}>
              <Link href={host.link} >
                <a target={'_blank'}>{host.name}</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home

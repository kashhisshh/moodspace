import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'


function Hero() {
  return (
    <>
        <Navbar/>
        <main>
          MoodSpace
          <Link to="/register">Get Started</Link>
        </main>
    </>
  )
}

export default Hero;

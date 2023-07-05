import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import GameWindow from './components/GameWindow/GameWindow'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <GameWindow />
  )
}

import './styles/main.css'
import { useState, useEffect} from 'react'
import logoImg from './assets/nlw-esports.svg'
import axios from 'axios'
import { GameBanner } from './components/GameBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'


function App() {

  interface Game {  // A interface tem que passar todos os formatos dos elementos que estarão na array
    id: string,
    title: string,
    bannerUrl: string,
    _count: {       // quando tiver um obj dentro de outro colocar assim
      ads: number
    }
    

  }                                 
                                  //useState<NomeInterface[]> como estou passando um array coloca [] no final 
  const [games, setGames] = useState<Game[]>([]) // antes do retorno (Tudo que for de variável q for aparecer na tela usa useState)

  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(response => setGames(response.data))
  
  },[])


  return (
    
    

    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
    <img src={logoImg}/>
    <h1 className='text-6xl text-white font-black mt-20'>
      Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui!
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>

      {games.map(game => { // Toda vez que percorrer colocar prop key={}
          return <GameBanner key={game.id} title={game.title} adsCount={game._count.ads} bannerUrl={game.bannerUrl}/>
        })}
       
 
      </div>
      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App

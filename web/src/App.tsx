import './styles/main.css'
import {MagnifyingGlassPlus} from 'phosphor-react'

import logoImg from './assets/nlw-esports.svg'

function App() {

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
    <img src={logoImg}/>
    <h1 className='text-6xl text-white font-black mt-20'>
      Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui!
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        <a className='relative rounded-lg overflow-hidden' href="" >
          <img src="/game-1.png" alt="" />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute right-0 bottom-0 left-0'>
            <strong className='font-bold text-white block'>League of Legends</strong>
            <span className='text-zinc-300 text-sm block'>4 anúncios</span>
          </div>
        </a>
        <a className='relative rounded-lg overflow-hidden' href="">
          <img src="/game-2.png" alt="" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute right-0 bottom-0 left-0'>
            <strong className='font-bold text-white block'>Dota 2</strong>
            <span className='text-zinc-300 text-sm block'>4 anúncios</span>
          </div>
        </a>
        <a className='relative rounded-lg overflow-hidden' href="">
          <img src="/game-3.png" alt="" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute right-0 bottom-0 left-0'>
            <strong className='font-bold text-white block'>Counter Strike: Global Offensive</strong>
            <span className='text-zinc-300 text-sm block'>4 anúncios</span>
          </div>
        </a>
        <a className='relative rounded-lg overflow-hidden' href="">
          <img src="/game-4.png" alt="" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute right-0 bottom-0 left-0'>
            <strong className='font-bold text-white block'>Apex Legends</strong>
            <span className='text-zinc-300 text-sm block'>4 anúncios</span>
          </div>
        </a>
        <a className='relative rounded-lg overflow-hidden' href="">
          <img src="/game-5.png" alt="" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute right-0 bottom-0 left-0'>
            <strong className='font-bold text-white block'>Fortnite</strong>
            <span className='text-zinc-300 text-sm block'>4 anúncios</span>
          </div>
        </a>
        <a className='relative rounded-lg overflow-hidden' href="">
          <img src="/game-6.png" alt="" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute right-0 bottom-0 left-0'>
            <strong className='font-bold text-white block'>World of Warcraft</strong>
            <span className='text-zinc-300 text-sm block'>4 anúncios</span>
          </div>
        </a>
      </div>

      <div className='w-full bg-nlw-gradient self-stretch pt-1 rounded-lg mt-8'>

      <div className='bg-[#2A2634] py-6 px-8 rounded-b-lg flex justify-between items-center' >
        <div>
        <strong className='text-white font-bold text-2xl block'>Não encontrou seu duo?</strong>
        <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
        </div>
        <button className='px-3 py-4 bg-violet-500 hover:bg-violet-600 rounded-md text-white flex items-center gap-3'>
          <MagnifyingGlassPlus size={24}/>
          Publicar anúncio
        </button>
      </div>
      </div>

    </div>
  )
}

export default App

import {MagnifyingGlassPlus} from 'phosphor-react' //icone
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner(){
    return (
        <div className='w-full bg-nlw-gradient self-stretch pt-1 rounded-lg mt-8'>

        <div className='bg-[#2A2634] py-6 px-8 rounded-b-lg flex justify-between items-center' >
          <div>
          <strong className='text-white font-bold text-2xl block'>Não encontrou seu duo?</strong>
          <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>
          <Dialog.Trigger className='px-3 py-4 bg-violet-500 hover:bg-violet-600 rounded-md text-white flex items-center gap-3'>
            <MagnifyingGlassPlus size={24}/>
            Publicar anúncio
          </Dialog.Trigger>
        </div>
        </div>
    )
}
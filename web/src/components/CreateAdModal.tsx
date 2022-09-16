import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog'
import { GameController, Check } from 'phosphor-react'
import { Input } from './Forms/inputs'
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export function CreateAdModal () {

    interface Game {  // A interface tem que passar todos os formatos dos elementos que estarão na array
        id: string,
        title: string,
      }                                 
                                      //useState<NomeInterface[]> como estou passando um array coloca [] no final 
      const [games, setGames] = useState<Game[]>([]) // antes do retorno (Tudo que for de variável q for aparecer na tela usa useState)
      const [weekDays, setWeekDays] = useState<string[]>(['1'])
      const [useVoiceChannel, setUseVoiceChannel] = useState(false)

console.log(weekDays)
console.log(useVoiceChannel)


      useEffect(() => {
        axios('http://localhost:3333/games')
        .then(response => setGames(response.data))
      },[])
    
      async function handleCreateAd(e: FormEvent){
        e.preventDefault()
        console.log('Clicou no Ad')
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if(!data.name){ // Para não permitir enviar o form vazio
            return;
        }
        
        console.log(data)
         try {
          await axios.post(`http://localhost:3333/games/${data.selectedGame}/ads`, 
        {
            name: data.name,
            weekDays:  weekDays.map(Number),
            discord: data.discord,
         hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel: useVoiceChannel,
          yearsPlayng: Number(data.yearsPlaying)
        })
        alert('Anúncio criado com sucesso!')
         } catch (err) {
            console.log(err)
            alert('Erro ao criar o anúncio')
         }
      }

    return (
        <>
        <Dialog.Portal>
        <Dialog.DialogOverlay className="bg-black/60 inset-0 fixed"/>
        <Dialog.DialogContent className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
          <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
            
              <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                  <select className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none' name="selectedGame" id='game' defaultValue="">

                    <option disabled >Selecione o game que deseja jogar</option>
                    {games.map(game => {
                        return (
                            <option key={game.id} value={game.id}>{game.title}</option>  // Sempre colocar a key no map
                        )
                    })}
                  </select>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome</label>
                  <Input type="text" name='name' id='name' placeholder='Como te chamam dentro do game?' />
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input type="number" name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser ZERO' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual o seu discord?</label>
                    <Input type="text" name='discord' id='discord' placeholder='Usuario#0000' />
                  </div>
                  </div>
                  <div className='flex gap-6'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="weekDays">Quando costuma jogar?</label>
                    
                        <ToggleGroup.Root className='grid grid-cols-4 gap-2' type='multiple' onValueChange={setWeekDays}>
                      <ToggleGroup.Item value='0' title="Domingo" className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'  } `}>D</ToggleGroup.Item>
                      <ToggleGroup.Item value='1' className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'  } `}  title="Segunda">S</ToggleGroup.Item>
                      <ToggleGroup.Item value='2' className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'  } `}  title="Terça">T</ToggleGroup.Item>
                      <ToggleGroup.Item value='3' className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'  } `}  title="Quarta">Q</ToggleGroup.Item>
                      <ToggleGroup.Item value='4' className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'  } `}  title="Quinta">Q</ToggleGroup.Item>
                      <ToggleGroup.Item value='5' className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'  } `}  title="Sexta">S</ToggleGroup.Item>
                      <ToggleGroup.Item value='6'className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'  } `}  title="Sábado">S</ToggleGroup.Item>
                      </ToggleGroup.Root>
                            
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                      <label htmlFor="hourStart">Qual o horário do dia?</label>
                      <div className='grid grid-cols-2 gap-2'>
                      <Input type="time" name='hourStart' id='hourStart' placeholder='De' />
                      <Input type="time" name='hourEnd' id='hourEnd' placeholder='Até' />
                      </div>
                    </div>
                    
                  
                </div>
                <label className='mt-2 flex gap-2 items-center text-sm'>
                  <Checkbox.Root checked={useVoiceChannel} className="w-6 h-6 rounded bg-zinc-900 p-1" onCheckedChange={(checked) => { 
                    if (checked === true) {
                          setUseVoiceChannel(true) 
                    } else {
                        setUseVoiceChannel(false)
                    }
                   }}>
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400"/>
                  </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                </label>
                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:border-zinc-600' type='button'>Cancelar</Dialog.Close>
                    <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
                    <GameController size={24}/>
                    Encontrar Duo
                    </button>
                </footer>
              </form>
            
            
        </Dialog.DialogContent>
      </Dialog.Portal>
      </>
    )
}
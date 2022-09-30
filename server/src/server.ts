import express from 'express'
import { PrismaClient } from 'prisma/prisma-client'
import { ConvertHoursStringToMinutes } from './utils/convert-hours-to-minutes-strings'
import { ConvertMinutesStringToHours } from './utils/convert-minutes-to-hours-string'
import cors from 'cors'

const app = express()
app.use(express.json())
const prisma = new PrismaClient()
app.use(cors())



app.get('/games' , async (request, response) => {
                        // ("game" é o nome da table) findMany pega tudo de dentro e Retorna um array
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    }) 
                           
    return response.json(games)
})

app.post('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id

    const body = request.body // receber JSON body do Insomnia ( usar app.use(express.json()) para visualizar nos testes)
    const criarNoBancoDeDados = await prisma.ad.create({
        //objeto data
        data: { 
            gameId: gameId, // (recebe game id do Parâmetro do link)
            name: body.name,
            yearsPlayng: body.yearsPlayng,
            discord: body.discord,
            weekDays: body.weekDays.join(','), // Como passou como array tem que transformar em string separado por vírgula
            hourStart: ConvertHoursStringToMinutes(body.hourStart),
            hourEnd: ConvertHoursStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    response.status(201).json(criarNoBancoDeDados);
})

app.get('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id //Pega o valor digitado em :id para a constante gameId

    

    const ads = await prisma.ad.findMany({ //Procure dentro da Table Ad
        where: {   // onde gameId === constante gameId (Passado por parâmetro no link)
            gameId: gameId  
        },
        select: { // Não quero mostrar no JSON o discord só irei selecionar oq quero
            id: true,
            name: true,
            weekDays: true,
            game: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
            yearsPlayng: true,
            createdAt: true,
        },
        orderBy: { // Ordenar jsons
            createdAt: 'desc', // Anúncios mais recentes vem primeiro
        }
    })

    response.json(ads.map((ad:any) => {
        return {
            ...ads, // retorne todos os select de adds
            weekDays: ad.weekDays.split(","), //weekDays substitua por
            hourStart: ConvertMinutesStringToHours(ad.hourStart),
            hourEnd: ConvertMinutesStringToHours(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {

    const idRecebido = request.params.id //recebe o id do parâmetro do link

    const apareceDiscord = await prisma.ad.findUniqueOrThrow({ //Procure um único dentro de Table Ad se não encontrar retorne um erro
        select: {   // Selecione somente o discord
            discord: true,
        },
        where: {   // onde a id dentro de Ad é igual a constante idRecebido
            id: idRecebido,
        },
       
})
        return response.json(apareceDiscord) 
})



app.listen('3333')
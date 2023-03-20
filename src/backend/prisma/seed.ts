import { PrismaClient, Prisma } from '@prisma/client'
import championsData from '../data/tft/set5patch1115/champions.json'
import traitsData from '../data/tft/set5patch1115/traits.json'


const prisma = new PrismaClient()

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Alice',
//     email: 'alice@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Join the Prisma Slack',
//           content: 'https://slack.prisma.io',
//           published: true,
//         },
//       ],
//     },
//     profile: {
//       create: {
//         bio: "Hello World",
//       }
//     }
//   },
//   {
//     name: 'Nilu',
//     email: 'nilu@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Follow Prisma on Twitter',
//           content: 'https://www.twitter.com/prisma',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Mahmoud',
//     email: 'mahmoud@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Ask a question about Prisma on GitHub',
//           content: 'https://www.github.com/prisma/prisma/discussions',
//           published: true,
//         },
//         {
//           title: 'Prisma on YouTube',
//           content: 'https://pris.ly/youtube',
//         },
//       ],
//     },
//   },
// ]

const traitsInput: Prisma.TraitCreateManyInput[] = traitsData.map(td => {
  return {
    id: td.key,
    name: td.name,
    description : td.description,
    type: td.type,
    sets: td.sets,
  }
})
const championsInput: Prisma.ChampionUncheckedCreateInput[] = championsData.map((cd) => {
  return {
    id: cd.championId,
    name: cd.name,
    cost: cd.cost,
    traits : { connect: cd.traits.map(traitId => {return {id: traitId} }) }
  }
})

async function main() {
  console.log(`${Date.now() } Start seeding traits...`)
  const traitsPayload = await prisma.trait.createMany({data: traitsInput})
  console.log(`${Date.now() } insert traits cnt: ${traitsPayload.count}`)
  console.log(`${Date.now() } Start seeding champions...`)
  
  championsInput.forEach( async ci => {
    const champion = await prisma.champion.create({data: ci })
  })
  console.log(`${Date.now() } Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

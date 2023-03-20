nodeenv --node=16.13.1 env

. env/bin/activate

npx prisma migrate dev --name init

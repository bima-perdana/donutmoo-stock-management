FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./

# hapus cache esbuild dulu biar bener
RUN npm install --legacy-peer-deps && npm rebuild esbuild

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

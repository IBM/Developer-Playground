FROM node:14.16.0-slim
WORKDIR /app
COPY . .
RUN cd Agro-Smart-Assistant/chatbot

WORKDIR /app/Agro-Smart-Assistant/chatbot
RUN npm install 

CMD ["npm", "start"]

EXPOSE 4000
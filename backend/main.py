from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union
import uvicorn
from dotenv import load_dotenv
import os
import chatGPT
import json
import sys

class Item(BaseModel):
    prompt: str
    username: str
    #conversation: str

class User(BaseModel):
    username: str
    password: str

app = FastAPI()

context = {"role": "system", "content": "Eres profesor de filosofía de la mente. Soy tu estudiante. \
           Tu objetivo es enseñarme las siguientes 5 teorías mente-cuerpo, una por una y de manera gradual: \
           1. Dualismo, 2. Conductismo, 3. Teoría de la identidad, 4. Materialismo eliminativista y 5. Funcionalismo. \
           Asegúrate de que entiendo cada teoría a medida que me la presentas. Te haré preguntas y tú también puedes hacerme algunas. \
           Cuando las 5 teorías estén cubiertas, o te diga que el ejercicio está terminado, tendrás que examinarme y \
           calificarme del 1 al 10 (siendo 10 la nota más alta y 1 la más baja). No indiques a qué bloque pertenece cada pregunta y \
           cambia el orden de las preguntas respecto del tema o teoría con la que se relacionan. Empieza por explicar por qué el problema \
           mente-cuerpo es importante y cómo vamos a proceder a aprender las 5 grandes teorías en torno a este problema, así como el breve \
           examen al que me vas a someter al final."}

chat = chatGPT.Chat(context=context)

# Allow all origins during development, replace "*" with your frontend's URL in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

""" # Rellenar las rutas para que se puedan usar las peticiones dinamicamente con eval(), importlib, hasattr(), getattr()
routes = [{
    "/pregunta/": "./chatGPT.py"
}]
"""
# Configurar bien el fichero .env para que las peticiones se hagan usando ese fichero

@app.get("/")
async def root():
    return {"message": "Hello world"}

@app.get("/messages/{username}")
async def getMessages(username: str, query_param: str = None):
    if not os.path.exists("conversations.json"):
        with open("conversations.json", 'w') as file:
            file.write("{}")
            file.close()
    with open("conversations.json", "r") as file:
        conversations = json.load(file)
        file.close()
    try:
        return conversations[username]
    except:
        return []

@app.post("/pregunta/")
async def hacerPregunta(item: Item):
    if not os.path.exists("conversations.json"):
        with open("conversations.json", 'w') as file:
            file.write("{}")
            file.close()
    with open("conversations.json", "r") as file:
        conversations = json.load(file)
        file.close()
    try:
        messages = chat.makePrompt(item.prompt, conversations[item.username], context=context)
    except:
        messages = chat.makePrompt(item.prompt, None, context=context)
    conversations[item.username] = messages
    with open("conversations.json", "w") as file:
        json.dump(conversations, file, indent=4)
        file.close()
    return messages[len(messages)-1]['content']

@app.post("/login/")
async def login(user: User):
    if os.path.exists("users.json"):
        with open("users.json", "r") as file:
            users = json.load(file)
    try:
        myUser = users[user.username]
        return myUser["password"] == user.password
    except:
        return False

@app.post("/register/")
async def register(user: User):
    if os.path.exists("users.json"):
        with open("users.json", "r") as file:
            users = json.load(file)
    else:
        users = {}
    users[user.username] = {"username": user.username, "password": user.password}
    with open("users.json", "w") as file:
        json.dump(users, file, indent=4)
    return True


if __name__ == "__main__":
    # Cargar el fichero .env en variables de entorno del sistema
    load_dotenv()
    # Recuperar la variable del sistema que nos interesa (socket de confguracion para el backend)
    socket = os.environ.get("BACKEND_SOCKET")
    [host, port] = socket.split(":")
    # Iniciar el servidor
    uvicorn.run(app, host=host, port=int(port))

""" Peticion HTTP con BurpSuite
POST /pregunta/ HTTP/1.1
Host: 127.0.0.1
Content-Type: application/json
Content-Length: 34

{"prompt": "Dame una lista de tareas"}
"""
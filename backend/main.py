from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union
import uvicorn
from dotenv import load_dotenv
import os
import chatGPT
import json

class Item(BaseModel):
    prompt: str

app = FastAPI()
chat = chatGPT.Chat()

# Allow all origins during development, replace "*" with your frontend's URL in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/pregunta/")
async def hacerPregunta(item: Item):
    return chat.makePrompt(item.prompt)

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
Content-Length: 20


{"name":"example"}
"""
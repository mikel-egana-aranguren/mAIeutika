from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union
import uvicorn
from dotenv import load_dotenv
import os

class Item(BaseModel):
    name: str

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/pregunta/")
async def hacerPregunta(item: Item):
    return item

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
# Libreria para configurar el servidor
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union
import importlib

routes = {
    "/": "/routes/HelloWorld.py",
    "/pregunta": "/routes/Helloworld.py"
}

class Item(BaseModel):
    name: str

app = FastAPI()
for route in routes:
    @app.get(route)
    async def root():
        return {"message": routes[route]}

    @app.post(route)
    async def hacerPregunta(item: Item):
        # Importa el módulo usando importlib
        hello_module = importlib.import_module(routes[route][:-3])  # Elimina la extensión '.py'

        # Crea una instancia de la clase Hello
        hello_instance = hello_module.Hello()
        """ esto en Hello.py
        # Hello.py
        class Hello:
            def say_hello(self):
                print("Hola desde la clase Hello!")
        """

        # Llama a un método de la clase
        hello_instance.doPost(item)
        return hello_instance.doPost(item)

""" Peticion HTTP con BurpSuite
POST /pregunta/ HTTP/1.1
Host: 127.0.0.1
Content-Type: application/json
Content-Length: 20


{"name":"example"}
"""
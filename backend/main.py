from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union

app = FastAPI()

"""
@app.get("/")
async def root():
    return {"message": "Hello World"}
"""
    
class Prompt(BaseModel):
    name: str

@app.post("/pregunta/")
async def hacerPregunta(prompt: Prompt):
    return prompt

""" Peticion HTTP con BurpSuite
POST /pregunta/ HTTP/1.1
Host: 127.0.0.1
Content-Type: application/json
Content-Length: 20


{"name":"example"}
"""
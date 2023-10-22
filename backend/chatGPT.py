import openai  # pip install openai
import os
from dotenv import load_dotenv
import sys
import requests

# Cargar la variable de entorno de la API-KEY
load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")

class Chat:
    
    def __init__(self, model="gpt-3.5-turbo", temperature=1, max_tokens=100, top_p = 0.5, n=3, stop=None, frequency_penalty=0.6, presence_penalty=0.8, stream=True, context=None):
        # gpt-3.5-turbo, gpt-4
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.top_p = top_p
        self.n = n
        self.stop = stop
        self.frequency_penalty = frequency_penalty
        self.presence_penalty = presence_penalty
        self.stream = stream
        # Example: {"role": "system", "content": "Eres un asistente muy útil."}
        # Roles: user, system, assistant
        self.messages = [context] if context != None else None
    
    def makePrompt(self, content):
        self.messages.append({"role": "user", "content": content})
        
        response = openai.ChatCompletion.create(
            model = self.model,
            temperature = self.temperature,
            max_tokens = self.max_tokens,
            top_p = self.top_p,
            n = self.n,
            stop = self.stop,
            frequency_penalty = self.frequency_penalty,
            presence_penalty = self.presence_penalty,
            messages=self.messages,
            stream=self.stream
            )
        if not self.stream:
            response_content = response.choices[0].message.content
            print(response_content)
        else:
            collected_text = []
            for chunk in response:
                chunk_message = chunk["choices"][0]["delta"]
                collected_text.append(chunk_message)
                response_content = "".join([m.get('content', '') for m in collected_text])
                print(response_content)
                print("\033[H\033[J", end="") # Clear terminal
            print(response_content)


        self.messages.append({"role": "assistant", "content": response_content})

        return response_content
    
    def generateImage(self, prompt, size="1024x1024"):
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size=size
        )
        image_url = response['data'][0]['url']
        image_name = "ejemplo"
        self.downloadImage(image_url, image_name, "png")

    def editImage(self, prompt, image_name, mask_name, size="1024x1024"):
        response = openai.Image.create_edit(
            image=open(image_name, "rb"),
            mask=open(mask_name, "rb"),
            prompt=prompt,
            n=1,
            size=size
        )
        image_url = response['data'][0]['url']
        self.downloadImage(image_url, image_name, "png")

    def variationImage(self, image_name):
        response = openai.Image.create_variation(
            image=open("corgi_and_cat_paw.png", "rb"),
            n=1,
            size="1024x1024"
        )       
        image_url = response['data'][0]['url']
        self.downloadImage(image_url, image_name, "png")

    def downloadImage(self, image_url, image_name, extension="png"):
        image = requests.request("GET", url=image_url, stream=True)
        with open(image_name+"."+extension, "wb") as file:
            file.write(image)

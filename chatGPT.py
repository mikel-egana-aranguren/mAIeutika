import openai  # pip install openai
import typer  # pip install "typer[all]"
from rich import print  # pip install rich
from rich.table import Table
import librosa
import os
from dotenv import load_dotenv
import sys

def main():
    # Cargar las variables de entorno del fichero .env
    load_dotenv()
    openai.api_key = os.environ.get("OPENAI_API_KEY")

    # Contexto del asistente
    context = {"role": "system",
               "content": "Eres un asistente muy útil."}
    messages = [context]

    while True:

        content = input("Hazme una pregunta: ")

        if content == "exit":
            sys.exit(1)

        messages.append({"role": "user", "content": content})

        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            temperature = 0.25,
            max_tokens = 50,
            top_p = 0.5,
            n = 3,
            stop = "Translate:",
            frequency_penalty = 0.6,
            presence_penalty = 0.8,
            messages=messages)

        response_content = response.choices[0].message.content

        messages.append({"role": "assistant", "content": response_content})

        print(f"[bold green]> [/bold green] [green]{response_content}[/green]")

if __name__ == "__main__":
    main()
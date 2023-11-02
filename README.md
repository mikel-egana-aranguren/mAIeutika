# mAIeutika

Maieutika or mAIeutika (formerly known as ChatTFG) is the name of a teaching software based on AI guided conversational learning. Maieutika is the basque term for _maieutics_, which is Socrate's method to teach students in a personalized and dialectical manner. Socrated did not deliver lectures, he used a conversational teaching mode that makes the best of the students prior knowledge and teaches with examples and adapted to the understanding level of the student. Connected to this original meaning, mAIeutika is a software project to use new generation LLM-driven AI systems (e.g. ChatGPT) for teaching. The idea is to create a personalized teaching experience so that, through a dialogue, students can be driven by a LLM to learn some content, course materials or exercises provided or fixed by a teacher. 

The paradigmatic use case in one in which a teacher fixes a learning session with a specific duraction, content, and goals (including potential evaluation criteria) and students use mAIeutika as a controlled and guided interface of a LLM. The system provides also means to monitor the activity of students and to (self)evaluate their progress.

# Clonar el resositotio:
```
git clone -b feature_frontend https://github.com/un4rch/mAIeutika.git
```
# Variables de entorno:
Crear el fichero .env en la raiz del proyecto:
```
OPENAI_API_KEY = sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BACKEND_SOCKET = 0.0.0.0:8000
FRONTEND_SOCKET = 0.0.0.0:4200
```
# Configurar backend:
```
pip3 install --upgrade pip
pip3 install -r requirements.txt
```
# Configurar frontend:
```
cd frontend
sudo dpkg --remove --force-remove-reinstreq libnode-dev
sudo dpkg --remove --force-remove-reinstreq libnode72:amd64
curl -s https://deb.nodesource.com/setup_18.x | sudo bash
sudo apt install nodejs -y
sudo npm install -g npm@latest
npm install -g @angular/cli
npm install
```
# Arrancar servicios:
```
sudo su
cd backend
python3 main.py &
cd ../frontend
ng serve --open --host 0.0.0.0 --port 4200 &
```
# Reiniciar servicios:
```
netstat -ntlp (fijarse en el PID del proceso que queramos reiniciar)
kill -9 <pid>
```
- Realizar cambios
- Seguir los pasos del apartado (Arrancar servicios)

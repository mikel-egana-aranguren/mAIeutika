# mAIeutika

Maieutika or mAIeutika (formerly known as ChatTFG) is the name of a teaching software based on AI guided conversational learning. Maieutika is the basque term for _maieutics_, which is Socrate's method to teach students in a personalized and dialectical manner. Socrated did not deliver lectures, he used a conversational teaching mode that makes the best of the students prior knowledge and teaches with examples and adapted to the understanding level of the student. Connected to this original meaning, mAIeutika is a software project to use new generation LLM-driven AI systems (e.g. ChatGPT) for teaching. The idea is to create a personalized teaching experience so that, through a dialogue, students can be driven by a LLM to learn some content, course materials or exercises provided or fixed by a teacher. 

The paradigmatic use case in one in which a teacher fixes a learning session with a specific duraction, content, and goals (including potential evaluation criteria) and students use mAIeutika as a controlled and guided interface of a LLM. The system provides also means to monitor the activity of students and to (self)evaluate their progress.

Instalation guide:
1. Install depencencies:
1.1. NodeJS
```
sudo apt update
cd ~
curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt install nodejs
node -v
```
1.2. npm
```
sudo npm install -g npm@latest
```
2. Clone the repository
```
git clone https://github.com/un4rch/mAIeutika.git --recurse-submodules
```
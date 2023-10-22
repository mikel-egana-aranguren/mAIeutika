if [[ -z "venv/bin/activate" ]]; then
    python -m venv venv
fi
source venv/bin/activate

# Backend
python backend/main.py &
# Frontend
cd frontend
ng serve --open

deactivate
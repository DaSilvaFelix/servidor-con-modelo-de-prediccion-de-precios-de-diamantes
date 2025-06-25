from fastapi import FastAPI
from src.routers import mainRouter
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],            # Orígenes permitidos
    allow_credentials=True,           # Permitir cookies/autenticación
    allow_methods=["*"],              # Métodos HTTP permitidos
    allow_headers=["*"],              # Encabezados permitidos
)


app.include_router(router=mainRouter.router)
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

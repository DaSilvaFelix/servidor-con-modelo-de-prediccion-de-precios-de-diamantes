from fastapi import APIRouter,Body
from src.services.mainService import getter,prediction
from src.validations.mainValidations import DiamondInput

router = APIRouter()

@router.get('/')
def run():
    return getter()

@router.post('/predict')
def predictDiamond(diamond: DiamondInput = Body(...)):
     print(diamond)
     return prediction(diamond)

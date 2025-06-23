from fastapi.responses import JSONResponse
from src.validations.mainValidations import DiamondInput
from joblib import load
import pandas as pd

model = load('src\model\modeloDiamonds.joblib')

def getter():
     return JSONResponse({'msg':'hola mundo'},status_code=200)

def prediction(diamond:DiamondInput):
     newDiamond = pd.DataFrame([diamond.model_dump()])
     result = model.predict(newDiamond)
     return JSONResponse(content={"priceEstimate": float(result[0])},status_code=200)

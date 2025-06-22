from pydantic import BaseModel,Field
from typing import Literal

class DiamondInput(BaseModel):
    carat: float = Field(..., gt=0, description="Peso del diamante en quilates")
    cut: Literal['Fair', 'Good', 'Very Good', 'Premium', 'Ideal']
    color: Literal['J', 'I', 'H', 'G', 'F', 'E', 'D']
    clarity: Literal['I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF']
    depth: float = Field(..., ge=0, le=100)
    table: float = Field(..., ge=0, le=100)
    x: float = Field(..., gt=0)
    y: float = Field(..., gt=0)
    z: float = Field(..., gt=0)

from main import app
from mangum import Mangum

# Wrap FastAPI app with Mangum
handler = Mangum(app)

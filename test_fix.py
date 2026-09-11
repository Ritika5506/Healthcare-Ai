import requests
from pathlib import Path

# Test pneumonia image
images = list(Path('dataset/pneumonia/').glob('*.jpeg'))
if images:
    img_path = images[0]
    print(f'Testing: {img_path.name}')
    
    with open(img_path, 'rb') as f:
        files = {'file': f}
        resp = requests.post('http://127.0.0.1:8000/predict', files=files)
    
    result = resp.json()
    print(f'\nPneumonia Image Results:')
    print(f'  Prediction: {result["prediction"]}')
    print(f'  Normal: {result["normal_probability"]}%')
    print(f'  Pneumonia: {result["pneumonia_probability"]}%')
    print(f'  Raw score: {result["raw_prediction"]}')

# Test normal image
images = list(Path('dataset/normal/').glob('*.jpeg'))
if images:
    img_path = images[0]
    print(f'\nTesting: {img_path.name}')
    
    with open(img_path, 'rb') as f:
        files = {'file': f}
        resp = requests.post('http://127.0.0.1:8000/predict', files=files)
    
    result = resp.json()
    print(f'\nNormal Image Results:')
    print(f'  Prediction: {result["prediction"]}')
    print(f'  Normal: {result["normal_probability"]}%')
    print(f'  Pneumonia: {result["pneumonia_probability"]}%')
    print(f'  Raw score: {result["raw_prediction"]}')

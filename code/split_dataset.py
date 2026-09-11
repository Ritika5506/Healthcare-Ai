import os
import shutil
import random

classes = ["pneumonia", "normal"]

for cls in classes:

    source_folder = f"dataset/{cls}"

    files = os.listdir(source_folder)
    random.shuffle(files)

    split_size = len(files) // 3

    hospital_A = f"hospitals/hospital_A/{cls}"
    hospital_B = f"hospitals/hospital_B/{cls}"
    hospital_C = f"hospitals/hospital_C/{cls}"

    for i, file in enumerate(files):

        source = os.path.join(source_folder, file)

        if i < split_size:
            shutil.copy(source, hospital_A)

        elif i < 2 * split_size:
            shutil.copy(source, hospital_B)

        else:
            shutil.copy(source, hospital_C)
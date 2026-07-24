# ml/model_architecture.py

import timm
import torch.nn as nn


def get_model(model_name: str, num_classes: int = 28, pretrained: bool = False):

    if model_name == "efficientnetv2":
        model = timm.create_model(
            "tf_efficientnetv2_s",
            pretrained=pretrained,
            num_classes=0,              # bare feature extractor, no default head
        )
        in_features = model.num_features  # 1280

        model.classifier = nn.Sequential(
            nn.Dropout(0.3),               # classifier.0
            nn.Linear(in_features, 512),   # classifier.1 ✔ matches checkpoint
            nn.ReLU(),                     # classifier.2
            nn.Dropout(0.3),               # classifier.3
            nn.Linear(512, num_classes),   # classifier.4 ✔ matches checkpoint
        )
        return model

    elif model_name == "vit":
        model = timm.create_model(
            "vit_base_patch16_224",
            pretrained=pretrained,
        )
        in_features = model.head.in_features  # 768

        model.head = nn.Sequential(
            nn.LayerNorm(in_features),     # head.0 ✔ matches checkpoint
            nn.Dropout(0.3),               # head.1
            nn.Linear(in_features, 512),   # head.2 ✔ matches checkpoint
            nn.ReLU(),                     # head.3
            nn.Dropout(0.3),               # head.4
            nn.Linear(512, num_classes),   # head.5 ✔ matches checkpoint
        )
        return model

    else:
        raise ValueError(
            f"Unknown model: '{model_name}'. Choose 'vit' or 'efficientnetv2'."
        )
---
title: "Towards Fair and Accurate Medical Image Embeddings"
subtitle: "Bachelor's thesis on developing bias-aware representation learning methods for medical imaging applications."
date: 2024-04-15
type: publication
tags: [ML, Medical, Fairness, Computer Vision]
thumbnail: /assets/thumbnails/placeholder.png
---

## Abstract

Medical imaging AI systems often exhibit biases that lead to disparate performance across demographic groups. In this thesis, I developed **bias-aware representation learning** methods to create fairer and more accurate embeddings for medical image analysis.

## Motivation

Recent studies have shown that AI models in healthcare can perpetuate or even amplify existing biases:

- Models trained on imbalanced datasets may perform worse on underrepresented groups
- Learned features may encode sensitive attributes unintentionally
- Standard evaluation metrics can hide significant performance disparities

This raises important **ethical concerns** about deploying such systems in clinical practice.

## Methodology

### Disentangled Representations

I proposed a method to disentangle disease-relevant features from sensitive attributes:

```python
class FairEncoder(nn.Module):
    def __init__(self):
        self.shared_encoder = ResNet50()
        self.disease_head = MLP(hidden_dim=256)
        self.sensitive_head = MLP(hidden_dim=256)
        
    def forward(self, x):
        features = self.shared_encoder(x)
        disease_emb = self.disease_head(features)
        sensitive_emb = self.sensitive_head(features)
        return disease_emb, sensitive_emb
```

### Adversarial Training

An adversarial discriminator was used to ensure the disease embeddings don't encode sensitive information:

1. Train the main encoder to predict disease labels
2. Train the adversary to predict sensitive attributes from disease embeddings
3. Update the encoder to maximize adversarial loss (confuse the discriminator)

### Evaluation Framework

I developed a comprehensive evaluation framework measuring:
- **Accuracy** across demographic groups
- **Equalized odds** for diagnostic predictions
- **Calibration** differences between groups

## Key Results

| Metric | Baseline | Fair Model |
|--------|----------|------------|
| Overall AUC | 0.89 | **0.87** |
| AUC Gap (Groups) | 0.12 | **0.03** |
| Equalized Odds Diff | 0.15 | **0.04** |

The fairness-aware model achieved significant improvements in group parity with only a minor reduction in overall accuracy.

## Contributions

1. **Novel architecture** for disentangled medical image representations
2. **Fairness metrics** adapted for medical imaging contexts
3. **Empirical analysis** on chest X-ray and dermatology datasets
4. **Guidelines** for implementing fair ML in clinical settings

## Impact

This work contributes to the growing field of **fair machine learning** in healthcare, providing practical methods for developing more equitable AI systems.

> [!NOTE]
> This thesis was completed as part of my B.Sc. in Computer Science at TUM and received a grade of 1.0.

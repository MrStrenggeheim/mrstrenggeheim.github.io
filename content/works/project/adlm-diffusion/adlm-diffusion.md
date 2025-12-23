---
title: "Segmentation Guided Diffusion"
subtitle: "Medical Image Generation from Segmentation Masks"
type: project
date: 2025-02-19
tags: [Python, DL, Medical, Diffusion, CV]
thumbnail: /assets/thumbnails/segguideddif.png
links:
  GitHub: https://github.com/MrStrenggeheim/adlm-diffusion
  Report: ./report.pdf
  Poster: ./poster.pdf
---

# Abstract

This project aims to leverage modern diffusion architecture to generate medical images from segmentation masks. By reversing the traditional segmentation process, the model creates realistic medical images conditioned on specific anatomical layouts.

# Details

Previous work in medical imaging has heavily focused on the segmentation of structures. This project explores the inverse: generating the medical image itself from a given segmentation mask. This is achieved using a generative diffusion model where the reverse process is conditioned on the segmentation masks.

The project utilizes the [AMOS22](https://amos22.grand-challenge.org/) dataset, combined with enhanced segmentations of up to 72 different classes created using [TotalVibeSegmentor](https://github.com/robert-graf/TotalVibeSegmentator).

## Key Components

- **Segmentation Guided Diffusion**: The core model for generating images.
- **AMOS Segmentator**: A U-Net based model for segmentation tasks.
- **VQ-VAE**: Employed for efficient image and mask embedding.
- **Evaluation**: A custom pipeline that verifies the quality of generated images by segmenting them and comparing the result to the original masks (Dice Score).

For further technical details, you can refer to the [project report](https://github.com/MrStrenggeheim/adlm-diffusion/blob/main/report.pdf).

---
title: "Towards Fair and Accurate Medical Image Embeddings"
subtitle: "Bachelor's thesis on developing bias-aware representation learning methods for medical imaging applications."
date: 2024-04-15
type: publication
tags: [ML, DL, Medical, Fairness, CV]
thumbnail: /assets/thumbnails/image-embeddings.png
links:
  Paper: https://arxiv.org/abs/2410.10220
  Thesis: ../../../assets/misc/tum_thesis_image_embeddings.pdf
---

# Abstract

As machine learning models get more complex and profound in their structure, they rely even more on large and representative datasets. Recent years have brought up new medical studies driving the development of image classifiers within the medical domain to astonishing accuracy. However, these datasets and deep learning models still function like some black box and need more insights into their decision-making, especially regarding fair and unbiased treatment of individuals and groups. Most previous work evaluating bias in models or datasets has been done with human-reliant workflows speculating for hidden bias or manual surveys. This thesis proposes to create new representations of image datasets using embeddings, obtained through unsupervised training of autoencoders, to extract semantic features and make the data more insightful. We train two recent autoencoder architectures based on Variational Bayes and Diffusion on the two medical image datasets, German National Cohort and CheXpert. We compare their accuracy with existing classifiers and use the obtained embeddings for further qualitative and quantitative analysis. Visualizing the embeddings using t-SNE plots and the provided labels, our analysis shows that the autoencoders can confidently extract and encode the differences in protected variables like the sex or age of the patient, even without supervision in the training process. Utilizing the newly obtained representations, we reveal interesting, systematic, and unwanted clustering of data samples based on variations in the imaging processes in both datasets. Furthermore, we quantitatively check for any unfair behavior in the predictions of chosen diseases for any patient’s sex subgroup and apply automated bias mitigation by directly removing it from the embeddings.
---
title: "Building a Graph Neural Network for Molecular Generation"
subtitle: "Exploring de-novo molecular design using message-passing neural networks and reinforcement learning for drug discovery."
date: 2024-11-15
type: project
tags: [ML, GNN, Python, Drug Discovery]
thumbnail: /assets/thumbnails/placeholder.png
---

## Introduction

In this project, I explored the fascinating intersection of **graph neural networks** and **drug discovery**. The goal was to generate novel molecular structures with desired properties using deep learning.

Molecular generation is a challenging problem because molecules are inherently graph-structured data—atoms are nodes and bonds are edges. Traditional sequence-based approaches often fail to capture the complex topology of chemical compounds.

## Approach

### Graph Representation

Each molecule was represented as a graph where:
- **Nodes** represent atoms with features like atomic number, charge, and hybridization
- **Edges** represent bonds with features like bond type and stereochemistry

### Message Passing Neural Networks

I implemented a **message-passing neural network** (MPNN) architecture that iteratively updates node representations by aggregating information from neighboring nodes:

```python
def message_passing(node_features, edge_index, edge_features):
    messages = compute_messages(node_features, edge_index, edge_features)
    aggregated = aggregate_messages(messages, edge_index)
    updated = update_nodes(node_features, aggregated)
    return updated
```

### Reinforcement Learning for Generation

The model was trained using **policy gradient methods** to optimize for:
- Drug-likeness (QED score)
- Synthetic accessibility
- Target binding affinity predictions

## Results

The model successfully generated novel molecules that satisfied multiple constraints:

| Metric | Baseline | Our Model |
|--------|----------|-----------|
| Validity | 85% | **97%** |
| Uniqueness | 90% | **94%** |
| Novelty | 100% | **100%** |
| QED Score | 0.45 | **0.72** |

## Conclusion

This project demonstrated that combining GNNs with reinforcement learning can effectively generate drug-like molecules. The key insights were:

1. **Graph representations** naturally encode molecular structure
2. **Message passing** captures local and global chemical properties
3. **RL optimization** allows targeting specific molecular properties

For more details, check out the [code on GitHub](https://github.com/MrStrenggeheim).

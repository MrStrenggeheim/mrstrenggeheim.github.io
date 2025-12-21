---
title: "df1sh"
subtitle: "A Formula 1 Analytics Dashboard"
type: project
date: 2024-12-27
tags: [Python, Streamlit, Analytics, Visualization]
thumbnail: /assets/thumbnails/df1sh.png
links:
  GitHub: https://github.com/MrStrenggeheim/df1sh
---

# Abstract

df1sh is a streamlined, interactive dashboard designed for tracking Formula 1 statistics and standings. Built with **Streamlit**, it provides an accessible and visual way to follow the current F1 season, offering insights into driver and constructor performance.

# Details

The core of this project is a **Streamlit** application that transforms raw Formula 1 data into an intuitive user interface. It is designed to be lightweight and easy to deploy, allowing fans to quickly check scores and standings without navigating complex sports news sites.

The application is structured to be modular, utilizing Streamlit's multi-page functionality to organize different types of data effectively.

## Key Components

- **Streamlit Dashboard**: The main application (`DF1shboard.py`) serves as the entry point, orchestrating the user interface and navigation.
- **Multi-Page Layout**: The `pages/` directory suggests a segmented approach, likely providing dedicated views for different aspects of the championship (e.g., Driver Standings, Constructor Standings, Race Results).
- **Data Engineering**: Custom utility scripts in the `utils/` folder handle the backend logic, such as fetching data from APIs and processing it for visualization.
- **Configuration**: Uses TOML configuration files (`config.toml`, `settings.toml`) for easy customization of the dashboard settings and appearance.

## Usage

Getting the dashboard running is straightforward with Python:

```bash
# Install dependencies
pip install -r requirements.txt

# Launch the dashboard
streamlit run DF1shboard.py
```

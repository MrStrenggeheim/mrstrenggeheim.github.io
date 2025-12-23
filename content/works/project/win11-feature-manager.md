---
title: "Windows 11 Feature Manager"
subtitle: "A powerful PowerShell script to manage Windows 11 AI features, telemetry, and background services"
type: project
date: 2025-12-23
tags: [PowerShell, Windows, Tool, Optimization]
thumbnail: /assets/thumbnails/win11-feature-manager.png
links:
  GitHub: https://github.com/MrStrenggeheim/win11-feature-manager
---

# Abstract

The **Windows 11 Feature Manager** is a compact yet powerful PowerShell script designed to give users granular control over their Windows 11 experience. It allows you to toggle "AI" features (like Copilot and Recall), manage telemetry settings, and optimize background services with ease.

# Details

This tool was created to address the increasing number of pre-installed features in Windows 11 that many users find unnecessary or intrusive. It provides a simple, unified interface to manage these settings without manually editing registry keys or group policies.

## Key Features

- **Granular Control**: Toggle 20+ specific features across categories like AI & Copilot, Widgets, Telemetry, and Gaming.
- **Interactive UI**: Navigate through options using a simple, unified arrow-key interface directly in the terminal.
- **Preset Modes**:
  - **Safe Mode**: Disables only non-essential bloatware.
  - **Aggressive Mode**: Maximizes resource savings for power users.
- **Safety First**: Includes built-in backup and restore functionality to ensure all changes are fully reversible.

## Usage

The tool is designed to be run interactively:

```powershell
# Run the script as Administrator
.\Win11FeatureManager.ps1
```

Or via command-line arguments for automation:

```powershell
# Apply the "Safe" preset
.\Win11FeatureManager.ps1 -DisablePreset Safe
```

This project aims to declutter the Windows 11 experience, prioritizing performance and user privacy without breaking core system functionality.

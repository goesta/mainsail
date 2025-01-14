---
layout: default
title: Thumbnails
parent: Quicktips
permalink: /quicktips/thumbnails
description: >-
  Mainsail can display thumbnails in the file browser and as previews in the print status.
---

# {{ page.title }}
{{ page.description }}

![preview](../assets/img/additional/large-preview.png)

### PrusaSlicer (since v2.3.0)

In "Expert" mode PrusaSlicer has an option in the "Printer Settings" tab to activate previews.
Under `General / Firmware`, enter `32x32,400x300` as "G-code thumbnails".

![PrusaSlicer](../assets/img/additional/PrusaSlicer2.3.0-thumbnails.png)

### SuperSlicer (since v2.2.54.0)

In "Expert" mode SuperSlicer has some very convenient options in the "Printer Settings" tab to activate and customize the previews.

![SuperSlicer](../assets/img/additional/SuperSlicer-thumbnails.png)

### PrusaSlicer/SuperSlicer

To enable thumbnails, click on `Help > Show Configuration Folder` and navigate to your printer profiles inside the `printer` folder.
Open your printer profile in a text editor and find `thumbnails =` and add the resolutions `32x32,400x300`. Save the file and restart your Slicer.

![PrusaSlicer](../assets/img/additional/PrusaSlicer-thumbnails.png)

From now on the gcode files contain thumbnails displayed by mainsail.

### Cura

The Cura plugin "Cura2Moonraker" is required for this. You can find this plugin and a install guide
here: [https://github.com/emtrax-ltd/Cura2MoonrakerPlugin](https://github.com/emtrax-ltd/Cura2MoonrakerPlugin)

![Cura](../assets/img/additional/Cura-thumbnails.png)

### ideaMaker (since v4.2.1)

To enable thumbnails, open the `Advanced` tab in the `printer settings`, enable the `GCode Thumbnails for Octoprint and Mainsail` option and
enter your prefered *square format* image size in the `Resolution` fields (e.g. `400 X 400`).
It's necessary that the thumbnail width and height resolution is equal.

![ideaMaker](../assets/img/additional/IdeaMaker4.2.1-thumbnails.png)
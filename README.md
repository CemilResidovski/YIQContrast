# YIQContrast
Adobe XD plugin to automatically change the text fill color to get the best contrast according to YIQ:
https://24ways.org/2010/calculating-color-contrast/

Just select a text object and the background object (Rectangle/Ellipse/Polygon), run the plugin, and the plugin will change the color of the text to either black or white.

Assumes that the text object is on top of a solid-filled object.

If the text is on an image, try to average out the color of the image into a solid-filled object.

For any issues/bugs/enhancement ideas, please visit https://github.com/CemilResidovski/YIQContrast/issues

## How to fork this plugin

1. Download this repo to your computer
2. **Important:** Change the `id` in manifest.json
3. Launch XD and go to _Plugins > Development > Show Develop Folder_
4. Place this entire repo in a subfolder in this location
5. In XD, run _Plugins > Development > Reload Plugins_ (or quit & relaunch XD)

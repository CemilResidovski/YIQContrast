/*
 * Copyright (c) 2020 Cemil Residovski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
 
 /*
 * Huge thanks to Peter Flynn
 * https://github.com/peterflynn/xd-color-blender
 */


const {Rectangle, Polygon, Ellipse, Text, Color} = require("scenegraph"); 

function yiqContrastFunction(selection) { 
     if (selection.items.length < 2 || selection.items.length > 2) {
        return showOnboarding();
	} else if (selection.items.length === 2) {
		var obj1 = selection.items[0];
        var obj2 = selection.items[1];
        if (!checkFillType(obj1.fill, obj2.fill)) {
			return;
		} else if (!checkObjectTypes(obj1, obj2)) {
			return showOnboarding();
		}
		
		var t_i = getTextObjectIndex(obj1, obj2);
		var r_i = 1 - t_i;
		
		var color = getYIQ(selection.items[r_i].fill);
		selection.items[t_i].fill = new Color(color);
	}
}

function showOnboarding() {
    var dialog = document.createElement("dialog");
    dialog.innerHTML = `
        <form method="dialog">
            <h1>YIQ Contrast Finder</h1>
            <hr>
            <div>Select a text object and a solid-filled figure (like rectangle, ellipse, or polygon).</div>
            <div>This plugin will automatically change the fill color of the text - according to YIQ - depending on the color of the figure.</div>
            <footer>
                <button id="ok" type="submit" uxp-variant="cta">OK</button>
            </footer>
        </form>`;
    document.appendChild(dialog);

    return dialog.showModal().then(function () {
        dialog.remove();
    });
}

function checkFillType(color1, color2) {
    if (!(color1 instanceof Color) || !(color2 instanceof Color)) {
        var dialog = document.createElement("dialog");
        dialog.innerHTML = `
            <form method="dialog">
                <h1>YIQ Contrast Finder</h1>
                <hr>
                <div>Text and Rectangle must both have a solid-color fill.</div>
                <footer>
                    <button id="ok" type="submit" uxp-variant="cta">OK</button>
                </footer>
            </form>`;
        document.appendChild(dialog);

        dialog.showModal().then(function () {
            dialog.remove();
        });
        return false;
    }
    return true;
}

function checkObjectTypes(obj1, obj2) {
    return (isText(obj1) && isBackgroundObj(obj2)) || (isBackgroundObj(obj1) && isText(obj2));
}

function isBackgroundObj(obj) {
    return (obj instanceof Rectangle ||
        obj instanceof Polygon ||
        obj instanceof Ellipse);
}

function isText(obj) {
    return (obj instanceof Text);
}

function getTextObjectIndex(obj1, obj2) {
	if (obj1 instanceof Text) {
		return 0;
	}
	return 1;
}

function getYIQ(color) {
	var yiq = Math.round( ((color.r * 299) + (color.g * 587) + (color.b * 114)) / 1000);
	return (yiq >= 128 ? "Black" : "White");
}

module.exports = {
    commands: {
        yiqContraster: yiqContrastFunction
    }
};

<img src="./src/icon.svg" width="100" /><br>
# Clipping Mask
<i>A Clipping mask addon for Construct 3</i> <br>
### Version 2.0.0.3

[<img src="https://placehold.co/200x50/4493f8/FFF?text=Download&font=montserrat" width="200"/>](https://github.com/skymen/clipping_mask/releases/download/skymen_mask-2.0.0.3.c3addon/skymen_mask-2.0.0.3.c3addon)
<br>
<sub> [See all releases](https://github.com/skymen/clipping_mask/releases) </sub> <br>

#### What's New in 2.0.0.3
- **Changed:** Uses Construct's new public scissor API (IRenderer.setScissorRect) instead of patching the renderer. Requires Construct r512 or later. Known issue: an object with effects between a start and an end mask can break the clipping, until Construct fixes it on their side.

<sub>[View full changelog](#changelog)</sub>

---
<b><u>Author:</u></b> reddog, skymen <br>
<b>[Construct Addon Page](https://www.construct.net/en/make-games/addons/1183/clipping-mask)</b>  <br>
<b>[Addon Website](https://www.construct.net/en/make-games/addons/1183/clipping-mask)</b>  <br>
<b>[Documentation](https://www.construct.net/en/make-games/addons/1183/clipping-mask/documentation)</b>  <br>
<sub>Made using [CAW](https://marketplace.visualstudio.com/items?itemName=skymen.caw) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
---
## Usage
To build the addon, run the following commands:

```
npm i
npm run build
```

To run the dev server, run

```
npm i
npm run dev
```

## Examples Files

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |
| Start Clipping | Enable to start clipping. To prevent rendering issues, you need a second mask with this to off to stop clipping at a higher Z index. | check |
| Visible | Enable to make the mask visible. When invisible, the mask will not clip. | check |
| Origin X | X Coordinate (0-1) | float |
| Origin Y | Y Coordinate (0-1) | float |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Start clipping | Set whether to start clipping or end clipping | Is Start             *(boolean)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| Is Clipping | Check if clipping is enabled |  |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |


---
## Changelog

**2.0.0.3**
- **Changed:** Uses Construct's new public scissor API (IRenderer.setScissorRect) instead of patching the renderer. Requires Construct r512 or later. Known issue: an object with effects between a start and an end mask can break the clipping, until Construct fixes it on their side.

**2.0.0.2**
- **Fixed:** fixed hack

**2.0.0.1**
- **Fixed:** Fixing broken instance ref

**0.0.0.0**
- **Added:** Initial release.

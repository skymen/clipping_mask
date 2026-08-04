import {
  ADDON_CATEGORY,
  ADDON_TYPE,
  PLUGIN_TYPE,
  PROPERTY_TYPE,
} from "./template/enums.js";
import _version from "./version.js";
export const addonType = ADDON_TYPE.PLUGIN;
export const type = PLUGIN_TYPE.WORLD;
export const id = "skymen_mask";
export const name = "Clipping Mask";
export const version = _version;
export const minConstructVersion = undefined;
export const author = "reddog, skymen";
export const website = "https://www.construct.net/en/make-games/addons/1183/clipping-mask";
export const documentation = "https://www.construct.net/en/make-games/addons/1183/clipping-mask/documentation";
export const description = "A Clipping mask addon for Construct 3";
export const category = ADDON_CATEGORY.GENERAL;

export const hasDomside = false;
export const files = {
  extensionScript: {
    enabled: false,
    watch: false,
    targets: ["x86", "x64"],
    name: "MyExtension",
  },
  fileDependencies: [],
  remoteFileDependencies: [],
  cordovaPluginReferences: [],
  cordovaResourceFiles: [],
};

export const aceCategories = {
  general: "General",
};

export const info = {
  Set: {
    CanBeBundled: true,
    IsDeprecated: false,
    IsResizable: true,
    IsRotatable: false,
    Is3D: false,
    HasImage: false,
    IsTiled: false,
    SupportsZElevation: false,
    SupportsColor: false,
    SupportsEffects: false,
    MustPreDraw: false,
  },
  AddCommonACEs: {
    Position: true,
    SceneGraph: true,
    Size: true,
    Angle: false,
    Appearance: true,
    ZOrder: true,
  },
};

export const properties = [
  {
    type: PROPERTY_TYPE.CHECK,
    id: "start",
    options: {
      initialValue: true,
    },
    name: "Start Clipping",
    desc: "Enable to start clipping. To prevent rendering issues, you need a second mask with this to off to stop clipping at a higher Z index.",
  },
  {
    type: PROPERTY_TYPE.CHECK,
    id: "visible",
    options: {
      initialValue: true,
    },
    name: "Visible",
    desc: "Enable to make the mask visible. When invisible, the mask will not clip.",
  },
  {
    type: PROPERTY_TYPE.FLOAT,
    id: "hotspot-x",
    options: {
      initialValue: 0,
      interpolatable: false,
    },
    name: "Origin X",
    desc: "X Coordinate (0-1)",
  },
  {
    type: PROPERTY_TYPE.FLOAT,
    id: "hotspot-y",
    options: {
      initialValue: 0,
      interpolatable: false,
    },
    name: "Origin Y",
    desc: "Y Coordinate (0-1)",
  },
];

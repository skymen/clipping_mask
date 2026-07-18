// Every internal-engine access of this addon lives in this file, one function
// per missing public API. SDK v2 blind spots this substitutes for:
// - no scissor rect / cross-draw renderer state in IRenderer
// - no way to force an instance to always draw (culling override)
// - no layer-to-draw-surface coordinate transform
// - no path to the internal runtime (captured via the Sprite patch below)

let internalRuntime = null;
let spritePatched = false;
let rendererPatched = false;

function patchSprite() {
  if (spritePatched) return;
  // The build validator imports this module in Node, where self is missing.
  const C3 = typeof self !== "undefined" && self.C3;
  if (!C3) return;
  if (!C3.Plugins.Sprite || !C3.Plugins.Sprite.Instance) {
    console.warn(
      "[Clipping Mask] Sprite plugin not found. Add a Sprite to the project or the mask cannot work."
    );
    return;
  }
  const Orig = C3.Plugins.Sprite.Instance;
  C3.Plugins.Sprite.Instance = class extends Orig {
    constructor(...args) {
      super(...args);
      if (!internalRuntime && this._runtime) {
        internalRuntime = this._runtime;
      }
    }
  };
  spritePatched = true;
}

patchSprite();

function getRuntime() {
  if (!internalRuntime && globalThis.sdk_runtime) {
    internalRuntime = globalThis.sdk_runtime;
  }
  return internalRuntime;
}

export function ready() {
  return getRuntime() !== null;
}

// v1's MaybeMonkeyPatchRect: wrap the shared renderer's scissor methods with
// a force flag so the engine's own scissor calls cannot cancel an active mask.
function patchRenderer() {
  if (rendererPatched) return;
  const renderer = getRuntime().GetRenderer();
  if (renderer.__skymen_clippingMaskPatch) {
    rendererPatched = true;
    return;
  }
  const oldSet = renderer.SetScissorRect.bind(renderer);
  const oldRemove = renderer.RemoveScissorRect.bind(renderer);
  renderer.SetScissorRect = (x, y, w, h, rtHeight = 0, force = false) => {
    if (force || !renderer.__skymen_clippingMaskForce) {
      oldSet(x, y, w, h, rtHeight);
      renderer.__skymen_clippingMaskForce = force;
    }
  };
  renderer.RemoveScissorRect = (force = false) => {
    if (force || !renderer.__skymen_clippingMaskForce) {
      oldRemove();
      renderer.__skymen_clippingMaskForce = !force;
    }
  };
  renderer.__skymen_clippingMaskPatch = true;
  rendererPatched = true;
}

// Returns an opaque handle for a mask instance: its internal WorldInfo with
// the culling override applied (an offscreen end marker must still draw, or
// the scissor never gets removed).
export function attach(uid) {
  const rt = getRuntime();
  if (!rt) return null;
  patchRenderer();
  const wi = rt.GetInstanceByUID(uid).GetWorldInfo();
  wi.GetBoundingBox = () => wi.GetLayer().GetViewport();
  return wi;
}

export function setScissorFromLayerRect(wi, x0, y0, x1, y1) {
  const layer = wi.GetLayer();
  const start = layer.LayerToDrawSurface(x0, y0);
  const end = layer.LayerToDrawSurface(x1, y1);
  getRuntime()
    .GetRenderer()
    .SetScissorRect(start[0], start[1], end[0] - start[0], end[1] - start[1], 0, true);
}

export function removeScissor() {
  getRuntime().GetRenderer().RemoveScissorRect(true);
}

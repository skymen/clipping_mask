// Every internal-engine access of this addon lives in this file, one function
// per missing public API. SDK v2 blind spots this substitutes for:
// - no way to force an instance to always draw (culling override)
// - no path to the internal runtime (captured via the Sprite patch below)
// The scissor itself uses the public IRenderer.setScissorRect() (r512+).

let internalRuntime = null;
let spritePatched = false;

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

// Applies the culling override to a mask instance: an offscreen end marker
// must still draw, or the scissor never gets removed. Returns whether it was
// applied.
export function attach(uid) {
  const rt = getRuntime();
  if (!rt) return false;
  const wi = rt.GetInstanceByUID(uid).GetWorldInfo();
  // In the v1 era GetBoundingBox returned a C3.Rect, so v1 could return the
  // viewport Rect directly. Since then it returns a C3.AABB3D and callers use
  // its 3D API (IsInViewport calls getBack()), so the override must return a
  // viewport sized AABB3D. Back and front stay 0, which keeps the 2D culling
  // path and makes render and collision cells cover the whole viewport.
  const aabb = new self.C3.AABB3D();
  wi.GetBoundingBox = () => {
    aabb.setFromRect(wi.GetLayer().GetViewport());
    return aabb;
  };
  return true;
}

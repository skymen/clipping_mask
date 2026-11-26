import * as internals from "./internals.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      this.isStart = true;
      this._attached = false;

      const properties = this._getInitProperties();
      if (properties) {
        this.isStart = properties[0];
        this.isVisible = properties[1];
      }

      // The internal runtime is captured from the first Sprite constructed,
      // which may happen after this instance. Tick until it is available.
      this._setTicking(true);
    }

    _tick() {
      if (!internals.ready()) return;
      this._attached = internals.attach(this.uid);
      this._setTicking(false);
    }

    _draw(renderer) {
      if (!this._attached) return;
      if (this.isStart) {
        const x = this.x;
        const y = this.y;
        const w = this.width;
        const h = this.height;
        const ox = this.originX;
        const oy = this.originY;
        const [left, top] = this.layer.layerToDrawSurface(
          x - ox * w,
          y - oy * h,
        );
        const [right, bottom] = this.layer.layerToDrawSurface(
          x + (1 - ox) * w,
          y + (1 - oy) * h,
        );
        renderer.setScissorRect(left, top, right - left, bottom - top);
      } else {
        renderer.removeScissorRect();
      }
    }

    _saveToJson() {
      return {
        isStart: this.isStart,
      };
    }

    _loadFromJson(o) {
      this.isStart = o.isStart;
    }
  };
}

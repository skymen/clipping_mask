import * as internals from "./internals.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      this.isStart = true;
      this._wi = null;

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
      this._wi = internals.attach(this.uid);
      this._setTicking(false);
    }

    _draw(renderer) {
      if (!this._wi) return;
      if (this.isStart) {
        const x = this.x;
        const y = this.y;
        const w = this.width;
        const h = this.height;
        const ox = this.originX;
        const oy = this.originY;
        internals.setScissorFromLayerRect(
          this._wi,
          x - ox * w,
          y - oy * h,
          x + (1 - ox) * w,
          y + (1 - oy) * h,
        );
      } else {
        internals.removeScissor();
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

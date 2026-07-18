export default function (parentClass) {
  return class extends parentClass {
    constructor(sdkType, inst) {
      super(sdkType, inst);
    }

    OnCreate() {
      this.UpdateOrigin();
    }

    UpdateOrigin() {
      this._inst.SetOrigin(
        this._inst.GetPropertyValue("hotspot-x"),
        this._inst.GetPropertyValue("hotspot-y")
      );
    }

    OnPropertyChanged(id, value) {
      if (id === "hotspot-x" || id === "hotspot-y") {
        this.UpdateOrigin();
      }
    }

    Draw(iRenderer, iDrawParams) {
      iRenderer.SetColorFillMode();
      iRenderer.SetColor(this._inst.GetColor());
      iRenderer.PushLineWidth(2);
      iRenderer.PushLineCap("square");
      iRenderer.LineQuad(this._inst.GetQuad());
      iRenderer.PopLineWidth();
      iRenderer.PopLineCap();
    }

    IsOriginalSizeKnown() {
      return false;
    }
  };
}

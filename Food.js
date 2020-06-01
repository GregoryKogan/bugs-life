class Food{
  constructor(FieldRadius){
    let Angle = random(0, 360);
    let Radius = random(0, FieldRadius - 10);
    angleMode(DEGREES);
    this.PosX = (windowWidth - 5) / 2 + cos(Angle) * Radius;
    this.PosY = (windowHeight - 5) / 2 + sin(Angle) * Radius;
    this.Energy = random(2, 5);
    this.Color = color(255, 255, 0);
    this.ScreenPosX = 0;
    this.ScreenPosY = 0;
  }

  RecalculateCoordinats(GlobalScale, Camera){
    angleMode(DEGREES);
    let Radius = dist(this.PosX, this.PosY, (windowWidth - 5) / 2, (windowHeight - 5) / 2);
    let Angle = acos((this.PosX - (windowWidth - 5) / 2) / Radius);
    if (this.PosY > (windowHeight - 5) / 2) Angle = -Angle;
    Radius *= GlobalScale;
    this.ScreenPosX = ((windowWidth - 5) / 2) + Radius * cos(Angle);
    this.ScreenPosY = ((windowHeight - 5) / 2) - Radius * sin(Angle);
    this.ScreenPosX -= Camera.PosX;
    this.ScreenPosY -= Camera.PosY;
  }

  Render(Camera, FoodArray, ThisIndex, GlobalScale, FieldRadius){
    if (dist((windowWidth - 5) / 2, (windowHeight - 5) / 2, this.PosX, this.PosY) < FieldRadius / 2){
      fill(this.Color);
      this.RecalculateCoordinats(GlobalScale, Camera);
      circle(this.ScreenPosX, this.ScreenPosY, this.Energy * 3 * GlobalScale);
    }
    else{
      FoodArray.splice(ThisIndex, 1);
    }
  }
}

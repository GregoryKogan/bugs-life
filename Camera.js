class Camera{
  constructor(){
    this.PosX = 0;
    this.PosY = 0;
    this.PointX = 0;
    this.PointY = 0;
    this.type = "Centered";
    this.FieldRadius = 0;
    this.FollowIndex = 0;
    this.FollowCreature = undefined;

    this.Counter = 0;
    this.Timer = 0;
  }

  Follow(Creature){
    this.PosX = Creature.ScreenPosX - (windowWidth - 5) / 2;
    this.PosY = Creature.ScreenPosY - (windowHeight - 5) / 2;
  }

  GoTo(TargetX, TargetY){
    if (TargetX > this.PosX + ((windowWidth - 5) / 2)) this.PosX += abs(TargetX - this.PosX - ((windowWidth - 5) / 2)) / 30;
    else this.PosX -= abs(TargetX - this.PosX - ((windowWidth - 5) / 2)) / 30;
    if (TargetY > this.PosY + ((windowHeight - 5) / 2)) this.PosY += abs(TargetY - this.PosY - ((windowHeight - 5) / 2)) / 30;
    else this.PosY -= abs(TargetY - this.PosY - ((windowHeight - 5) / 2)) / 30;

    if (dist(TargetX, TargetY, this.PosX + ((windowWidth - 5) / 2), this.PosY + ((windowHeight - 5) / 2)) < 25) this.MakeNewPoint();
  }

  MakeNewPoint(){
    let Angle = random(0, 360);
    let Radius = random(0, (this.FieldRadius / 5) - 10);
    angleMode(DEGREES);
    this.PointX = ((windowWidth - 5) / 2) + cos(Angle) * Radius;
    this.PointY = ((windowHeight - 5) / 2) + sin(Angle) * Radius;
  }

  Logic(Creatures){
    if (this.Timer > 0) this.Timer -= 1;

    if (this.type == "Centered"){
      this.PosX = 0;
      this.PosY = 0;
      this.Counter = 1;
    }
    else if (this.type == "Following"){
      if (Creatures.length > 0){
        if (this.Counter != 0){
          this.FollowCreature = Creatures[0];
          this.Counter = 0;
        }
        if (this.FollowCreature == Creatures[this.FollowIndex]){
          this.FollowIndex = this.FollowCreature.ThisIndex;
          this.Follow(this.FollowCreature);
        }
        else{
          if (this.FollowIndex >= Creatures.length) this.FollowIndex = 0;
          if (this.FollowIndex < 0) this.FollowIndex = Creatures.length - 1;
          this.FollowCreature = Creatures[this.FollowIndex];
        }
        if (this.Timer == 0){
          if (keyIsDown(LEFT_ARROW)){
            this.FollowIndex -= 1;
            if (this.FollowIndex >= Creatures.length) this.FollowIndex = 0;
            if (this.FollowIndex < 0) this.FollowIndex = Creatures.length - 1;
            this.FollowCreature = Creatures[this.FollowIndex];
            this.Timer = 60;
          }
          else if (keyIsDown(RIGHT_ARROW)){
            this.FollowIndex += 1;
            if (this.FollowIndex >= Creatures.length) this.FollowIndex = 0;
            if (this.FollowIndex < 0) this.FollowIndex = Creatures.length - 1;
            this.FollowCreature = Creatures[this.FollowIndex];
            this.Timer = 60;
          }
        }
      }
      else{
        this.PosX = 0;
        this.PosY = 0;
        this.Counter = 1;
      }
    }
    else if (this.type == "Controllable"){
      if (keyIsDown(UP_ARROW)) this.PosY -= 15;
      if (keyIsDown(DOWN_ARROW)) this.PosY += 15;
      if (keyIsDown(LEFT_ARROW)) this.PosX -= 15;
      if (keyIsDown(RIGHT_ARROW)) this.PosX += 15;
      this.Counter = 1;
    }
    else{
      this.GoTo(this.PointX, this.PointY);
      this.Counter = 1;
    }
  }
}

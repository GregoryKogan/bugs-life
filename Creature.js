class Creature{
  constructor(Camera){
    //Параметры объекта в мире
    this.PosX = undefined;
    this.PosY = undefined;
    this.ScreenPosX = undefined;
    this.ScreenPosY = undefined;
    this.TurnSpeed = 0.3;
    this.Angle = 0;
    this.Speed = 0;
    this.SpeedX = 0;
    this.SpeedY = 0;
    this.TimeScale = 1;
    this.GlobalScale = 1;
    this.Camera = Camera;

    //5 определяющих параметров
    this.EnergyValue = random(50, 150);
    this.Bravery = false;
    this.FoodPrefs = 3;
    this.LifeSpan = random(50, 100);
    this.Laziness = false;
    this.Race = undefined;

    //Вычисляемые параметры
    this.MaxSpeed = (1 / this.EnergyValue) * 80;
    this.Size = (40 * this.EnergyValue) / 100;
    this.ViewRadius = this.Size * 5;

    //Биология
    this.CurrentEnergy = this.EnergyValue;
    this.BirthDate = millis();
    this.Age = 0;
    this.Color = color(random(0, 255), random(0, 255), random(0, 255));

    //Объекты для взаимодействия
    this.FoodNear = 0;
    this.EnemiesNear = 0;

    //Память существа
    this.BackUpX = (windowWidth - 5) / 2;
    this.BackUpY = (windowHeight - 5) / 2;
    this.ScreenBackUpX = (windowWidth - 5) / 2;
    this.ScreenBackUpY = (windowHeight - 5) / 2;
    this.ThisIndex = 0;
  }

  MakeNewBackUp(FieldRadius){
    let Angle = random(0, 360);
    let Radius = random(0, (FieldRadius / 2) - 10);
    angleMode(DEGREES);
    this.BackUpX = ((windowWidth - 5) / 2) + cos(Angle) * Radius;
    this.BackUpY = ((windowHeight - 5) / 2) + sin(Angle) * Radius;
  }

  CalculateScreenPos(GlobalScale, Camera){
    angleMode(DEGREES);
    let Radius = dist(this.BackUpX, this.BackUpY, (windowWidth - 5) / 2, (windowHeight - 5) / 2);
    let Angle = acos((this.BackUpX - (windowWidth - 5) / 2) / Radius);
    if (this.BackUpY > (windowHeight - 5) / 2) Angle = -Angle;
    Radius *= GlobalScale;
    this.ScreenBackUpX = ((windowWidth - 5) / 2) + Radius * cos(Angle);
    this.ScreenBackUpY = ((windowHeight - 5) / 2) - Radius * sin(Angle);
    this.ScreenBackUpX -= this.Camera.PosX;
    this.ScreenBackUpY -= this.Camera.PosY;
  }

  SpeedUp(){
    if (this.Speed < this.MaxSpeed * this.TimeScale){
      this.Speed += this.MaxSpeed * this.TimeScale / 15;
    }
  }

  SlowDown(){
    this.Speed -= this.MaxSpeed * this.TimeScale / 10;
    if (this.Speed < 0.1) this.Speed = 0;
  }

  Turn(Direction){
    this.TurnSpeed = this.MaxSpeed * 0.375;
    angleMode(DEGREES);
    this.Angle += this.TurnSpeed * this.TimeScale * Direction * deltaTime;
    if (this.Angle > 360) this.Angle -= 360;
    if (this.Angle < 0) this.Angle = 360 - this.Angle;
  }

  GoTo(TargetX, TargetY){
    let TargetDistnace = dist(this.PosX, this.PosY, TargetX, TargetY);
    if (TargetDistnace > this.Size / 3){
      let XDifference = TargetX - this.PosX;
      let TargetAngle = acos(XDifference / TargetDistnace);
      if (TargetY < this.PosY) TargetAngle = 360 - TargetAngle;
      if (TargetAngle > 360) TargetAngle -= 360;
      if (TargetAngle < 0) TargetAngle = 360 - TargetAngle;

      let OffSet = 5 * this.TimeScale;

      if (TargetAngle > this.Angle + OffSet){
        if (TargetAngle - this.Angle - OffSet > 360 - TargetAngle +  this.Angle + OffSet) this.Turn(-1);
        else this.Turn(1);
      }
      else if (TargetAngle < this.Angle - OffSet){
        if (this.Angle + OffSet - TargetAngle > 360 - this.Angle - OffSet + TargetAngle) this.Turn(1);
        else this.Turn(-1);
      }

      if (abs(TargetAngle - this.Angle) < OffSet) this.SpeedUp();
      else this.SlowDown();
    }
    else{
      this.SlowDown();
    }
  }

  RunFrom(TargetX, TargetY){
    let TargetDistnace = dist(this.PosX, this.PosY, TargetX, TargetY);
    let XDifference = TargetX - this.PosX;
    let TargetAngle = acos(XDifference / TargetDistnace);
    if (TargetY < this.PosY) TargetAngle = 360 - TargetAngle;

    TargetAngle += 180;

    if (TargetAngle > 360) TargetAngle -= 360;
    if (TargetAngle < 0) TargetAngle = 360 - TargetAngle;

    let OffSet = 5 * this.TimeScale;

    if (TargetAngle > this.Angle + OffSet){
      if (TargetAngle - this.Angle - OffSet > 360 - TargetAngle +  this.Angle + OffSet) this.Turn(-1);
      else this.Turn(1);
    }
    else if (TargetAngle < this.Angle - OffSet){
      if (this.Angle + OffSet - TargetAngle > 360 - this.Angle - OffSet + TargetAngle) this.Turn(1);
      else this.Turn(-1);
    }

    if (abs(TargetAngle - this.Angle) < OffSet) this.SpeedUp();
    else this.SlowDown();
}

  CalculateParameters(FieldRadius){
    this.MakeNewBackUp(FieldRadius);
    let Angle = random(0, 360);
    let Radius = random(0, (FieldRadius / 2) - 10);
    this.PosX = (windowWidth - 5) / 2 + cos(Angle) * Radius;
    this.PosY = (windowHeight - 5) / 2 + sin(Angle) * Radius;
    this.MaxSpeed = (1 / this.EnergyValue) * 80;
    this.Size = (40 * this.EnergyValue) / 100;
    this.ViewRadius = this.Size * 5;
  }

  MakeChildren(CreaturesArray, FieldRadius){
    let AmountOfChildren = random(2, 4);
    let NewCreature;
    for (let i = 0; i < AmountOfChildren; ++i){
      NewCreature = new Creature(this.Camera);

      NewCreature.EnergyValue = this.EnergyValue + random(-this.EnergyValue / 15, this.EnergyValue / 15);
      if (random(0, 16) > 15) NewCreature.Bravery = !this.Bravery;
      else NewCreature.Bravery = this.Bravery;
      if (random (0,16) > 15) NewCreature.FoodPrefs = floor(random(1, 3.99));
      else NewCreature.FoodPrefs = this.FoodPrefs;
      NewCreature.LifeSpan = this.LifeSpan + random(-this.LifeSpan / 15, this.LifeSpan / 15);
      if (random(0, 16) > 15) NewCreature.Laziness = !this.Laziness;
      else NewCreature.Laziness = this.Laziness;

      NewCreature.Color = this.Color;
      NewCreature.Race = this.Race;

      NewCreature.CalculateParameters(FieldRadius);

      CreaturesArray.push(NewCreature);
    }
  }

  Physiology(ThisIndex, FoodArray, CreaturesArray, FieldRadius){
    this.Age += (deltaTime / 1000) * this.TimeScale;
    let MovingCoefficient = 1;
    if (this.Speed <= this.MaxSpeed) MovingCoefficient = 0.4;
    this.CurrentEnergy -= (deltaTime / 150) * this.TimeScale * MovingCoefficient;
    if (this.CurrentEnergy > this.EnergyValue) this.CurrentEnergy = this.EnergyValue;
    if (this.CurrentEnergy <= 0) this.Die(ThisIndex, FoodArray, CreaturesArray, false);
    if (this.Age >= this.LifeSpan) this.Die(ThisIndex, FoodArray, CreaturesArray, true, FieldRadius);
  }

  Die(ThisIndex, FoodArray, CreaturesArray, ShouldMakeChildren, FieldRadius){
    if (ShouldMakeChildren) this.MakeChildren(CreaturesArray, FieldRadius);

    let AmountOfFood = random(3, 8);
    for (let i = 0; i < AmountOfFood; ++i){
      let NewPiece = new Food;
      NewPiece.PosX = this.PosX + random(-this.Size, this.Size);
      NewPiece.PosY = this.PosY + random(-this.Size, this.Size);
      FoodArray.push(NewPiece);
    }
    CreaturesArray.splice(ThisIndex, 1);
  }

  SetTimeScale(GlobalTimeScale){
    this.TimeScale = GlobalTimeScale;
  }

  Logic(FoodArray, CreaturesArray, ThisIndex, FieldRadius, ShowInsides, Camera, GlobalScale){
    this.ThisIndex = ThisIndex;
    this.Physiology(ThisIndex, FoodArray, CreaturesArray, FieldRadius);

    if(dist(this.BackUpX, this.BackUpY, (windowWidth - 5) / 2, (windowHeight - 5) / 2) > FieldRadius / 2 - 10) this.MakeNewBackUp(FieldRadius);

    this.FoodNear = 0;
    this.EnemiesNear = 0;

    for (let i = 0; i < FoodArray.length; i++){
      if (dist(this.PosX, this.PosY, FoodArray[i].PosX, FoodArray[i].PosY) < this.ViewRadius){
        if(dist(this.PosX, this.PosY, FoodArray[i].PosX, FoodArray[i].PosY) < this.Size / 2){
          this.CurrentEnergy += FoodArray[i].Energy;
          FoodArray.splice(i, 1);
        }
        else this.FoodNear++;
      }
    }
    for (let i = 0; i < CreaturesArray.length; ++i){
      if ((dist(this.PosX, this.PosY, CreaturesArray[i].PosX, CreaturesArray[i].PosY) < this.ViewRadius * 1.2) && i != ThisIndex){
        if (dist(this.PosX, this.PosY, CreaturesArray[i].PosX, CreaturesArray[i].PosY) < this.Size * 1.5){
          if (this.FoodPrefs > 1 && this.Size > CreaturesArray[i].Size){
            this.CurrentEnergy += CreaturesArray[i].CurrentEnergy;
            CreaturesArray.splice(i, 1);
          }
        }
        else this.EnemiesNear++;
      }
    }

    let MostDelicious = -1;
    let MostDangerous = -1;
    let BestFood = -1;

    if (this.FoodNear > 0){
      let HighestEnergy = 0;
      for (let i = 0; i < FoodArray.length; ++i){
        if (FoodArray[i].Energy > HighestEnergy && dist(this.PosX, this.PosY, FoodArray[i].PosX, FoodArray[i].PosY) < this.ViewRadius && this.FoodPrefs != 2){
          HighestEnergy = FoodArray[i].Energy;
          BestFood = i;
        }
      }
    }

    if (this.EnemiesNear > 0){
      for (let i = 0; i < CreaturesArray.length; ++i){
        if (dist(this.PosX, this.PosY, CreaturesArray[i].PosX, CreaturesArray[i].PosY) < this.ViewRadius * 1.2){
          if (MostDelicious == -1) MostDelicious = i;
          if (MostDangerous == -1) MostDangerous = i;

          //Выбираем самого опасного
          if (this.FoodPrefs == 1){
            if (CreaturesArray[i].MaxSpeed > CreaturesArray[MostDangerous]) MostDangerous = i;
          }
          else{
            if (CreaturesArray[i].Size > CreaturesArray[MostDangerous].Size) MostDangerous = i;
          }

          //Выбираем самого вкусного
          if (this.FoodPrefs > 1){
            if (this.FoodPrefs == 2){
              if (CreaturesArray[i].CurrentEnergy > CreaturesArray[MostDelicious].CurrentEnergy){
                if (CreaturesArray[i].FoodPrefs == 1) MostDelicious = i;
                else if (CreaturesArray[i].Size < CreaturesArray[MostDelicious].Size) MostDelicious = i;
              }
            }
            else{
              if (CreaturesArray[i].Size < CreaturesArray[MostDelicious].Size && CreaturesArray[i].CurrentEnergy > CreaturesArray[MostDelicious].CurrentEnergy) MostDelicious = i;
            }
          }
        }
      }
    }
    if (dist(this.PosX, this.PosY, (windowWidth - 5) / 2, (windowHeight - 5) / 2) < FieldRadius / 2){
      //Выбрали все три точки, теперь решаем что делать
      if(MostDangerous == ThisIndex) MostDangerous = -1;
      if(MostDelicious == ThisIndex) MostDelicious = -1;
      if (MostDangerous != -1 && this.Bravery){
        if (!this.IsDangerous(CreaturesArray[MostDangerous])) MostDangerous = -1;
      }
      if (MostDelicious != -1){
        if (!this.CanIEatHim(CreaturesArray[MostDelicious])) MostDelicious = -1;
      }

      if (MostDangerous != -1){
        this.RunFrom(CreaturesArray[MostDangerous].PosX, CreaturesArray[MostDangerous].PosY);
        if (ShowInsides){
          push();
          stroke(255, 0, 0);
          strokeWeight(5);
          line(this.ScreenPosX - Camera.PosX, this.ScreenPosY - Camera.PosY, CreaturesArray[MostDangerous].ScreenPosX - Camera.PosX, CreaturesArray[MostDangerous].ScreenPosY - Camera.PosY);
          pop();
        }
      }
      else{ //Если не надо убегать
        if (MostDelicious != -1){
          this.GoTo(CreaturesArray[MostDelicious].PosX, CreaturesArray[MostDelicious].PosY);
          if (ShowInsides){
            push();
            stroke(0, 255, 0);
            strokeWeight(3);
            if (CreaturesArray[MostDelicious].ScreenPosX - Camera.PosX != 0){
              line(this.ScreenPosX - Camera.PosX, this.ScreenPosY - Camera.PosY, CreaturesArray[MostDelicious].ScreenPosX - Camera.PosX, CreaturesArray[MostDelicious].ScreenPosY - Camera.PosY);
            }
            pop();
          }
        }
        else if (BestFood != -1){
          this.GoTo(FoodArray[BestFood].PosX, FoodArray[BestFood].PosY);
          if (ShowInsides){
            push();
            stroke(0, 255, 0);
            strokeWeight(1);
            if (FoodArray[BestFood].ScreenPosX != 0){
              line(this.ScreenPosX - Camera.PosX, this.ScreenPosY - Camera.PosY, FoodArray[BestFood].ScreenPosX, FoodArray[BestFood].ScreenPosY);
            }
            pop();
          }
        }
        else{
          if (!this.Laziness){
            if (dist(this.PosX, this.PosY, this.BackUpX, this.BackUpY) > this.Size) {
              this.GoTo(this.BackUpX, this.BackUpY);
              if (ShowInsides){
                push();
                stroke(255, 0, 255);
                strokeWeight(1);
                line(this.ScreenPosX - Camera.PosX, this.ScreenPosY - Camera.PosY, this.ScreenBackUpX, this.ScreenBackUpY);
                pop();
              }
            }
            else{
              this.MakeNewBackUp(FieldRadius);
            }
          }
          else this.SlowDown();
        }
      }
    }
    else this.GoTo((windowWidth - 5) / 2, (windowHeight - 5) / 2);
  }

  CanIEatHim(Creature){
    if (this.FoodPrefs == 1) return false;
    if (this.FoodPrefs > 1){
      if (this.Size > Creature.Size) return true;
      else return false;
    }
  }

  IsDangerous(Creature){
    if (this.FoodPrefs == 1){
      if (Creature.FoodPrefs == 2) return true;
      if (Creature.FoodPrefs == 1) return false;
      if (Creature.FoodPrefs == 3 && Creature.Size > this.Size) return true;
    }
    if (this.FoodPrefs > 1){
      if (Creature.FoodPrefs > 1 && Creature.Size > this.Size) return true;
      else return false;
    }
  }

  RecalculateCoordinats(GlobalScale, Camera){
    angleMode(DEGREES);
    let Radius = dist(this.PosX, this.PosY, (windowWidth - 5) / 2, (windowHeight - 5) / 2);
    let Angle = acos((this.PosX - (windowWidth - 5) / 2) / Radius);
    if (this.PosY > (windowHeight - 5) / 2) Angle = -Angle;
    Radius *= GlobalScale;
    this.ScreenPosX = ((windowWidth - 5) / 2) + Radius * cos(Angle);
    this.ScreenPosY = ((windowHeight - 5) / 2) - Radius * sin(Angle);
  }

  Render(Camera, GlobalScale, ShowInsides){
    this.Camera = Camera;
    this.GlobalScale = GlobalScale;

    this.ViewRadius = this.Size * 5;

    if (ShowInsides){
      this.CalculateScreenPos(this.GlobalScale, this.Camera);
      fill(255, 0, 0);
      circle(this.ScreenBackUpX, this.ScreenBackUpY, 15 * GlobalScale);
      push();
      noFill();
      stroke(255);
      circle(this.ScreenPosX - Camera.PosX, this.ScreenPosY - Camera.PosY, this.ViewRadius * 2 * GlobalScale);
      stroke(255, 0, 0);
      circle(this.ScreenPosX - Camera.PosX, this.ScreenPosY - Camera.PosY, this.ViewRadius * 2 * 1.2 * GlobalScale);
      pop();
   }

    angleMode(DEGREES);
    this.SpeedX = this.Speed * cos(this.Angle);
    this.SpeedY = this.Speed * sin(this.Angle);

    this.PosX += this.SpeedX * deltaTime;
    this.PosY += this.SpeedY * deltaTime;

    this.RecalculateCoordinats(GlobalScale, Camera);

    push();
    ellipseMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES);
    translate(this.ScreenPosX - Camera.PosX, this.ScreenPosY - Camera.PosY);
    rotate(this.Angle);
    fill(255);
    if (!this.Bravery) rect(0, 0, this.Size / 4 * GlobalScale, this.Size * GlobalScale, this.Size / 10 * GlobalScale);
    fill(this.Color);
    ellipse(0, 0, this.Size * GlobalScale, this.Size / 1.7 * GlobalScale);
    fill(255);
    if (this.FoodPrefs == 1) ellipse(0, 0, this.Size / 1.4 * GlobalScale, this.Size / 5 * GlobalScale);
    if (this.FoodPrefs == 2) ellipse(0, 0, this.Size / 6 * GlobalScale, this.Size / 2.2 * GlobalScale);
    if (this.FoodPrefs == 3){
      ellipse(0, 0, this.Size / 1.4 * GlobalScale, this.Size / 5 * GlobalScale);
      ellipse(0, 0, this.Size / 6 * GlobalScale, this.Size / 2.2 * GlobalScale);
    }
    stroke(255);
    strokeWeight(1);
    line(this.Size / 2.5 * GlobalScale, this.Size / 9 * GlobalScale, this.Size / 2.5 * GlobalScale + this.ViewRadius / 10 * GlobalScale, this.Size / 2.5 * GlobalScale);
    line(this.Size / 2.5 * GlobalScale, this.Size / -9 * GlobalScale, this.Size / 2.5 * GlobalScale + this.ViewRadius / 10 * GlobalScale, this.Size / -2.5 * GlobalScale);
    fill(255);
    circle(this.Size / 2.5 * GlobalScale + this.ViewRadius / 10 * GlobalScale, this.Size / 2.5 * GlobalScale, this.Size / 10 * GlobalScale);
    circle(this.Size / 2.5 * GlobalScale + this.ViewRadius / 10 * GlobalScale, this.Size / -2.5 * GlobalScale, this.Size / 10 * GlobalScale);
    line(this.Size / -2 * GlobalScale, 0, this.Size / -2 * GlobalScale - this.Age / 7 * GlobalScale, 0);
    fill(255);
    if (!this.Laziness) circle(this.Size / -2 * GlobalScale - this.Age / 7 * GlobalScale, 0, this.Size / 7 * GlobalScale);
    pop();
  }
}

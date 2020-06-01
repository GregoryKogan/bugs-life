//Параметры устройства
let Device = "Laptop";
let Os = "Win";

//Параметры мира
let TimeScale;
let FieldRadius;
let FoodSpawn;
let GlobalCamera;
let GlobalScale;

//Интерфейс
let ShowUI = false;
let ShowChangeMenu = false;
let ShowStatistics = false;
let InterfaceSwitcher;
let ShowInsidesSwitcher;
let TimeScaleSlider;
let FoodSpawnSlider;
let FieldRadiusSlider;
let GlobalScaleSlider;
let CreatureSizeSlider;
let CreatureLifeSpanSlider;
let CameraTypeSelector;
let CreatureFoodPrefsSelector;
let FoodSpawningTypeCheckBox;
let CreatureLazinessCheckBox;
let CreatureBraveryCheckBox;
let KillAllButton;
let MakeBalancedSetButton;
let MakeRandomSetButton;
let StatsSwitcherButton;
let ChangeCreatureButton;
let DieButton;
let MakeChildrenButton;
let ApplyChangesButton;

//Необходимые переменные
let ShowInsides = false;
let FoodPiece;
let NewCreature;
let Creatures = new Array;
let FoodPieces = new Array;

function preload(){
  ThiccFont = loadFont('Fonts/Roboto-Black.ttf');
  ThinFont = loadFont('Fonts/Roboto-Thin.ttf');
  RegularFont = loadFont('Fonts/Roboto-Regular.ttf');
  loadFont('Fonts/Roboto-Black.ttf');
  loadFont('Fonts/Roboto-Thin.ttf');
  loadFont('Fonts/Roboto-Regular.ttf');
}

function setup() {
  frameRate(60);
  pixelDensity(displayDensity());
  if (displayWidth / 4.29 >= 150)
    Device = "Laptop";
  else
    Device = "Phone";
  if (navigator.userAgent.indexOf("like Mac") != -1){
     Os = "IOS";
     Device = "Phone";
  }
  SetUpUI();

  TimeScale = TimeScaleSlider.value();
  FoodSpawn = FoodSpawnSlider.value();
  GlobalCamera = new Camera;
  FieldRadius = FieldRadiusSlider.value();
  GlobalScale = GlobalScaleSlider.value();

  if (Device == "Laptop")
    createCanvas(windowWidth - 5, windowHeight - 5);
  else
    createCanvas(windowWidth + 1, windowHeight + 1);
}

function draw() {
  background(18);
  fill(255);
  if (Device == "Laptop")
    textSize(22);
  else
    textSize(15);
  push();
  if (Device == "Laptop")
    textSize(17);
  else
    textSize(15);
  textFont(RegularFont);
  textAlign(LEFT);
  text(Math.round(frameRate()) + "FPS", 10, windowHeight - 10);
  textAlign(RIGHT);
  text("G.Koganovskiy 2020", windowWidth - 10, windowHeight - 10);
  text("v.1.6", windowWidth - 10, windowHeight - 30);
  pop();

  if (GlobalCamera.type == "Following" && Creatures.length > 0) ChangeCreatureButton.show();
  else{
    if (ShowChangeMenu == true){
      ShowChangeMenu = !ShowChangeMenu;
      ChangeCreatureButton.html("Change Creature");
      CreatureSizeSlider.hide();
      CreatureLifeSpanSlider.hide();
      CreatureLazinessCheckBox.hide();
      CreatureBraveryCheckBox.hide();
      CreatureFoodPrefsSelector.hide();
      DieButton.hide();
      MakeChildrenButton.hide();
      ApplyChangesButton.hide();
    }
    ChangeCreatureButton.hide();
  }

  if (Creatures.length == 0){
     KillAllButton.hide();
     if ((ShowUI == false && ShowStatistics == false) || Device == "Laptop"){
      MakeBalancedSetButton.show();
      MakeRandomSetButton.show();
    }
  }
  else{
     KillAllButton.show();
     MakeBalancedSetButton.hide();
     MakeRandomSetButton.hide();
  }

  TimeScale = TimeScaleSlider.value();
  FoodSpawn = FoodSpawnSlider.value();
  FieldRadius = FieldRadiusSlider.value();
  GlobalScale = GlobalScaleSlider.value();
  GlobalCamera.type = CameraTypeSelector.value();
  GlobalCamera.FieldRadius = FieldRadius;

  GlobalCamera.Logic(Creatures);

  push();
  stroke(255);
  strokeWeight(5);
  noFill();
  circle((windowWidth - 5) / 2 - GlobalCamera.PosX, (windowHeight - 5) / 2 - GlobalCamera.PosY, FieldRadius * GlobalScale);
  pop();

  for (let i = 0; i < FoodPieces.length; ++i) FoodPieces[i].Render(GlobalCamera, FoodPieces, i, GlobalScale, FieldRadius);

  if (FoodSpawningTypeCheckBox.checked()){
    if (FoodPieces.length < FoodSpawn){
      FoodPiece = new Food(FieldRadius / 2);
      FoodPieces.push(FoodPiece);
    }
    else if (FoodPieces.length > FoodSpawn && FoodSpawn > 0){
      FoodPieces.splice(0, 1);
    }
    else if (FoodSpawn == 0) FoodPieces = [];
  }
  else{
    if (frameCount % floor((1 / (FoodSpawn / 60 / (1000 / deltaTime)))) == 0 && FoodPieces.length < 1500){
      for (let i = 0; i < TimeScale; ++i){
        FoodPiece = new Food(FieldRadius / 2);
        FoodPieces.push(FoodPiece);
      }
    }
  }

  for (let i = 0; i < Creatures.length; ++i){
    Creatures[i].Render(GlobalCamera, GlobalScale, ShowInsides);
    Creatures[i].SetTimeScale(TimeScale);
    Creatures[i].Logic(FoodPieces, Creatures, i, FieldRadius, ShowInsides, GlobalCamera, GlobalScale);
  }

  DrawInterface();
  DrawStatistics();
}

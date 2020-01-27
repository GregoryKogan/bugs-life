//Параметры устройства
let Device = "Laptop";

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
let ShowInfo = false;
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
let InfoButton;
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

function DrawInterface(){
  if (ShowUI){
    fill(0, 0, 0, 200);
    rect(5, 5, 365, 300);
    textSize(22);
    fill(255);
    text(TimeScaleSlider.value() + " - TimeScale", 170, 70);
    if (FoodSpawningTypeCheckBox.checked()) text(FoodSpawnSlider.value() + " - FoodAmount", 170, 100);
    else text(FoodSpawnSlider.value() + " - FoodSpawn", 170, 100);
    text(FieldRadiusSlider.value() / 2 + " - FieldRadius", 170, 130);
    text(GlobalScaleSlider.value() + " - GlobalScale", 170, 160);
    text(" - CameraType", 170, 200);
  }
  if (ShowChangeMenu){
    fill(0, 0, 0, 200);
    rect ((windowWidth - 5) / 2 - 200, windowHeight - 355, 400, 300);
    textSize(22);
    fill(255);
    if (Device == "Laptop"){
      text(CreatureSizeSlider.value() + " - Size", (windowWidth - 5) / 2 - 20, windowHeight - 325);
      text(CreatureLifeSpanSlider.value() + " - LifeSpan", (windowWidth - 5) / 2 - 20, windowHeight - 295);
    }
    else{
      text(CreatureSizeSlider.value() + " - Size", (windowWidth - 5) / 2 - 15, windowHeight - 325);
      text(CreatureLifeSpanSlider.value() + " - LifeSpan", (windowWidth - 5) / 2 - 15, windowHeight - 295);
    }
  }
}

function DrawInfo(){
  if (ShowInfo){
    fill(0, 0, 0, 200);
    rect(20, 100, windowWidth - 45, windowHeight - 150);
    textSize(22);
    fill(255);
    const Information = `
      You can determinate creature's parameters by it's look. Length of the tail indicates age, the presence of a pompom at the end of the tail indicates laziness. From the pattern on the back, you can determinate food preferences
      of a creature.
      If it's a predator, it will have one ellipse on it's back, and it will be prependicular to the creature. If it's a herbivore, it will also have one ellipse on it's back, but it will be parallel to the creature.
      If it's an omnivore, it will have both ellipses. Every creature has view radius, white radius is the largest distance a creature sees food and red one is the largest distance for creature to see other creatures.
      If creature is lazy, when it doesn't see any food, it just stops and waits for something to happen. When creature is not moving, it spends less energy. If creature is not lazy, when there is no food in his white Radius
      it goes to random point on the map, in ShowInsides mode this point appears to be a red dot.
      If creature is brave, it won't run from another creature if it can't hurt it.
      if creature is not brave, it will avoid any contacts with other creatures.
      Player can change world's specifications such as radius of field or food spawning rate or type of camera and so on. You can see statistics of all creatures in right corner. This program at least tries to simulate evolution
      in nature. If creature lives long enough withot being killed or dead becouse of hunger it dies anyway but makes random number of children. Children have alike specs with it's parent, but not exactly same, every child have
      mutations. Every child has exact same color as his parent. You can change specs of exact creature by making camera type -> Following and clicking change button at the bottom of the screen. After that it will canhge color
      to white.
      If you press MakeBalancedSet button it spawns 7 preprogrammed creatures. All of them a different types of creatures and have very different specs.
      If you press MakeRandomSet button it spawns random amount of creatures with random specs.
    `
    text(Information, 30, 130);
    text("Hardcoded by Koganovskiy G. 2020.25.01", windowWidth - 500, windowHeight - 60);
  }
}

function DrawStatistics(){
  if (ShowStatistics){
    fill(0, 0, 0, 200);
    rect(windowWidth - 10, 5, -250, 480);
    textSize(22);
    fill(255);
    let Changed = 0;
    let Red = 0;
    let Orange = 0;
    let Yellow = 0;
    let Green = 0;
    let BrightBlue = 0;
    let Blue = 0;
    let Purple = 0;
    let Lazy = 0;
    let Brave = 0;
    let Size = 0;
    let LifeSpan = 0;
    let Herbivores = 0;
    let Predators = 0;
    let Omnivores = 0;
    for (let i = 0; i < Creatures.length; ++i){
      if (Creatures[i].Race == "White") Changed++;
      if (Creatures[i].Race == "Red") Red++;
      if (Creatures[i].Race == "Orange") Orange++;
      if (Creatures[i].Race == "Yellow") Yellow++;
      if (Creatures[i].Race == "Green") Green++;
      if (Creatures[i].Race == "BrightBlue") BrightBlue++;
      if (Creatures[i].Race == "Blue") Blue++;
      if (Creatures[i].Race == "Purple") Purple++;
      if (Creatures[i].Race == "Changed") Changed++;
      if (Creatures[i].Laziness) Lazy++;
      if (Creatures[i].Bravery) Brave++;
      if (Creatures[i].FoodPrefs == 1) Herbivores++;
      if (Creatures[i].FoodPrefs == 2) Predators++;
      if (Creatures[i].FoodPrefs == 3) Omnivores++;
      Size += Creatures[i].Size;
      LifeSpan += Creatures[i].LifeSpan;
    }

    text("Red: " + Red, windowWidth - 250, 75);
    text("Orange: " + Orange, windowWidth - 250, 100);
    text("Yellow: " + Yellow, windowWidth - 250, 125);
    text("Green: " + Green, windowWidth - 250, 150);
    text("BrightBlue: " + BrightBlue, windowWidth - 250, 175);
    text("Blue: " + Blue, windowWidth - 250, 200);
    text("Purple: " + Purple, windowWidth - 250, 225);
    text("Changed: " + Changed, windowWidth - 250, 250);
    text("Herbivores: " + Herbivores, windowWidth - 250, 300);
    text("Predators: " + Predators, windowWidth - 250, 325);
    text("Omnivores: " + Omnivores, windowWidth - 250, 350);
    text(round(Lazy / Creatures.length * 100) + "% are Lazy", windowWidth - 250, 400);
    text(round(Brave / Creatures.length * 100) + "% are Brave", windowWidth - 250, 425);
    text("Average size: " + round(Size / Creatures.length), windowWidth - 250, 450);
    text("Average LifeSpan: " + round(LifeSpan / Creatures.length), windowWidth - 250, 475);
  }
}

function SetUpUI(){
  TimeScaleSlider = createSlider(1, 5, 1, 0.1);
  TimeScaleSlider.position(10, 50);
  TimeScaleSlider.style('width', '150px');
  TimeScaleSlider.hide();

  FoodSpawnSlider = createSlider(0, 1500, 250, 1);
  FoodSpawnSlider.position(10, 80);
  FoodSpawnSlider.style('width', '150px');
  FoodSpawnSlider.hide();

  FieldRadiusSlider = createSlider(100, 6000, 2000, 2);
  FieldRadiusSlider.position(10, 110);
  FieldRadiusSlider.style('width', '150px');
  FieldRadiusSlider.hide();

  GlobalScaleSlider = createSlider(0.1, 2, 1, 0.001);
  GlobalScaleSlider.position(10, 140);
  GlobalScaleSlider.style('width', '150px');
  GlobalScaleSlider.hide();

  CreatureSizeSlider = createSlider(20, 60, 40, 1);
  if (Device == "Laptop") CreatureSizeSlider.position((windowWidth - 5) / 2 - 190, windowHeight - 345);
  else  CreatureSizeSlider.position((windowWidth - 5) / 2 - 185, windowHeight - 345);
  CreatureSizeSlider.style('width', '150px');
  CreatureSizeSlider.hide();

  CreatureLifeSpanSlider = createSlider(50, 100, 75, 1);
  if (Device == "Laptop") CreatureLifeSpanSlider.position((windowWidth - 5) / 2 - 190, windowHeight - 315);
  else CreatureLifeSpanSlider.position((windowWidth - 5) / 2 - 185, windowHeight - 315);
  CreatureLifeSpanSlider.style('width', '150px');
  CreatureLifeSpanSlider.hide();

  let ButtonColor = color(18);

  InterfaceSwitcher = createButton("Show UI");
  InterfaceSwitcher.position(10, 10);
  if (Device == "Laptop") InterfaceSwitcher.size(150, 30);
  else InterfaceSwitcher.size(displayWidth / 4.29, 30);
  InterfaceSwitcher.style('font-size', '18px');
  InterfaceSwitcher.style('background-color', ButtonColor);
  InterfaceSwitcher.style('color', 'white');
  InterfaceSwitcher.mousePressed(SwitchInterface);

  ShowInsidesSwitcher = createButton("Show Insides");
  ShowInsidesSwitcher.position(10, 230);
  ShowInsidesSwitcher.size(150, 30);
  ShowInsidesSwitcher.style('font-size', '18px');
  ShowInsidesSwitcher.style('background-color', ButtonColor);
  ShowInsidesSwitcher.style('color', 'white');
  ShowInsidesSwitcher.mousePressed(SwitchShowInsides);
  ShowInsidesSwitcher.hide();

  if (Device == "Laptop") KillAllButton = createButton("Kill Them All!");
  else KillAllButton = createButton("Kill All");
  if (Device == "Laptop"){
    KillAllButton.size(150, 30);
    KillAllButton.position((windowWidth - 5) / 2 - 75, 10);
  }
  else{
     KillAllButton.size(displayWidth / 4.29, 30);
     KillAllButton.position((windowWidth - 5) / 2 - (displayWidth / 4.29 / 2), 10);
  }
  KillAllButton.style('font-size', '18px');
  KillAllButton.style('background-color', ButtonColor);
  KillAllButton.style('color', 'white');
  KillAllButton.mousePressed(KillThemAll);

  if (Device == "Laptop") MakeBalancedSetButton = createButton("Make Balanced Set");
  else MakeBalancedSetButton = createButton("Balanced");
  if (Device == "Laptop"){
    MakeBalancedSetButton.size(175, 30);
    MakeBalancedSetButton.position((windowWidth - 5) / 2 - 87.5, 10);
  }
  else{
     MakeBalancedSetButton.size(displayWidth / 4.29, 30);
     MakeBalancedSetButton.position((windowWidth - 5) / 2 - (displayWidth / 4.29 / 2), 10);
  }
  MakeBalancedSetButton.style('font-size', '18px');
  MakeBalancedSetButton.style('background-color', ButtonColor);
  MakeBalancedSetButton.style('color', 'white');
  MakeBalancedSetButton.mousePressed(MakeBalancedSet);

  if (Device == "Laptop") MakeRandomSetButton = createButton("Make Random Set");
  else MakeRandomSetButton = createButton("Random");
  if (Device == "Laptop"){
    MakeRandomSetButton.size(175, 30);
    MakeRandomSetButton.position((windowWidth - 5) / 2 - 87.5, 50);
  }
  else{
     MakeRandomSetButton.size(displayWidth / 4.29, 30);
     MakeRandomSetButton.position((windowWidth - 5) / 2 - (displayWidth / 4.29 / 2), 50);
  }
  MakeRandomSetButton.style('font-size', '18px');
  MakeRandomSetButton.style('background-color', ButtonColor);
  MakeRandomSetButton.style('color', 'white');
  MakeRandomSetButton.mousePressed(MakeRandomSet);

  if (Device == "Laptop") StatsSwitcherButton = createButton("Show Stats");
  else StatsSwitcherButton = createButton("Stats");
  if (Device == "Laptop"){
    StatsSwitcherButton.size(150, 30);
    StatsSwitcherButton.position(windowWidth - 165, 10);
  }
  else{
     StatsSwitcherButton.size(displayWidth / 4.29, 30);
     StatsSwitcherButton.position(windowWidth - displayWidth / 4.29 - 15, 10);
  }
  StatsSwitcherButton.style('font-size', '18px');
  StatsSwitcherButton.style('background-color', ButtonColor);
  StatsSwitcherButton.style('color', 'white');
  StatsSwitcherButton.mousePressed(SwitchStats);

  if (Device == "Laptop"){
    InfoButton = createButton("Info");
    if (Device == "Laptop"){
      InfoButton.size(100, 30);
      InfoButton.position(windowWidth - 115, windowHeight - 45);
    }
    else{
       InfoButton.size(displayWidth / 5, 30);
       InfoButton.position(windowWidth - displayWidth / 5 - 15, windowHeight - 45);
    }
    InfoButton.style('font-size', '18px');
    InfoButton.style('background-color', ButtonColor);
    InfoButton.style('color', 'white');
    InfoButton.mousePressed(RenderInfo);
  }

  if (Device == "Laptop") ChangeCreatureButton = createButton("Change Creature");
  else  ChangeCreatureButton = createButton("Change");
  if (Device == "Laptop"){
    ChangeCreatureButton.size(160, 30);
    ChangeCreatureButton.position((windowWidth - 5) / 2 - 80, windowHeight - 45);
  }
  else{
     ChangeCreatureButton.size(displayWidth / 4.29, 30);
     ChangeCreatureButton.position((windowWidth - 5) / 2 - (displayWidth / 4.29 / 2), windowHeight - 45);
  }
  ChangeCreatureButton.style('font-size', '18px');
  ChangeCreatureButton.style('background-color', ButtonColor);
  ChangeCreatureButton.style('color', 'white');
  ChangeCreatureButton.mousePressed(ChangeCreature);

  DieButton = createButton("Die");
  if (Device == "Laptop"){
    DieButton.position((windowWidth - 5) / 2 + 40, windowHeight - 270);
    DieButton.size(150, 30);
  }
  else{
    DieButton.position((windowWidth - 5) / 2 + 40, windowHeight - 270);
    DieButton.size(displayWidth / 4.29, 30);
  }
  DieButton.style('font-size', '18px');
  DieButton.style('background-color', ButtonColor);
  DieButton.style('color', 'white');
  DieButton.mousePressed(KillThisCreature);
  DieButton.hide();

  if (Device == "Laptop") MakeChildrenButton = createButton("Make Chidren");
  else  MakeChildrenButton = createButton("Breed");
  if (Device == "Laptop"){
    DieButton.position((windowWidth - 5) / 2 + 40, windowHeight - 213);
    DieButton.size(150, 30);
  }
  else{
    DieButton.position((windowWidth - 5) / 2 + 40, windowHeight - 213);
    DieButton.size(displayWidth / 4.29, 30);
  }
  MakeChildrenButton.style('font-size', '18px');
  MakeChildrenButton.style('background-color', ButtonColor);
  MakeChildrenButton.style('color', 'white');
  MakeChildrenButton.mousePressed(MakeChildrenOfThisCreature);
  MakeChildrenButton.hide();

  if (Device == "Laptop") ApplyChangesButton = createButton("Apply Changes");
  else ApplyChangesButton = createButton("Apply");
  ApplyChangesButton.position((windowWidth - 5) / 2 - 75, windowHeight - 125);
  ApplyChangesButton.size(150, 30);
  ApplyChangesButton.style('font-size', '18px');
  ApplyChangesButton.style('background-color', ButtonColor);
  ApplyChangesButton.style('color', 'white');
  ApplyChangesButton.mousePressed(ApplyChanges);
  ApplyChangesButton.hide();

  CameraTypeSelector = createSelect();
  CameraTypeSelector.position(10, 180);
  CameraTypeSelector.option("Controllable");
  CameraTypeSelector.option("Following");
  CameraTypeSelector.option("Centered");
  CameraTypeSelector.option("Flying");
  CameraTypeSelector.style('font-size', '18px');
  CameraTypeSelector.style('background-color', ButtonColor);
  CameraTypeSelector.style('color', 'white');
  CameraTypeSelector.size(150, 30);
  CameraTypeSelector.hide();

  CreatureFoodPrefsSelector = createSelect();
  if (Device == "Laptop") CreatureFoodPrefsSelector.position((windowWidth - 5) / 2 - 190, windowHeight - 210);
  else CreatureFoodPrefsSelector.position((windowWidth - 5) / 2 - 180, windowHeight - 210);
  CreatureFoodPrefsSelector.option("Herbivorous");
  CreatureFoodPrefsSelector.option("Predator");
  CreatureFoodPrefsSelector.option("Omnivorous");
  CreatureFoodPrefsSelector.style('font-size', '18px');
  CreatureFoodPrefsSelector.style('background-color', ButtonColor);
  CreatureFoodPrefsSelector.style('color', 'white');
  CreatureFoodPrefsSelector.size(150, 30);
  CreatureFoodPrefsSelector.hide();

  FoodSpawningTypeCheckBox = createCheckbox("FixedFoodAmount", false);
  FoodSpawningTypeCheckBox.position(10, 270);
  FoodSpawningTypeCheckBox.size(220, 40);
  FoodSpawningTypeCheckBox.style('font-size', '24px');
  FoodSpawningTypeCheckBox.style('color', 'white');
  FoodSpawningTypeCheckBox.hide();

  CreatureLazinessCheckBox = createCheckbox("Lazy", false);
  if (Device == "Laptop") CreatureLazinessCheckBox.position((windowWidth - 5) / 2 - 190, windowHeight - 280);
  else CreatureLazinessCheckBox.position((windowWidth - 5) / 2 - 180, windowHeight - 280);
  CreatureLazinessCheckBox.size(220, 40);
  CreatureLazinessCheckBox.style('font-size', '24px');
  CreatureLazinessCheckBox.style('color', 'white');
  CreatureLazinessCheckBox.hide();

  CreatureBraveryCheckBox = createCheckbox("Brave", false);
  if (Device == "Laptop") CreatureBraveryCheckBox.position((windowWidth - 5) / 2 - 190, windowHeight - 250);
  else CreatureBraveryCheckBox.position((windowWidth - 5) / 2 - 180, windowHeight - 250);
  CreatureBraveryCheckBox.size(220, 40);
  CreatureBraveryCheckBox.style('font-size', '24px');
  CreatureBraveryCheckBox.style('color', 'white');
  CreatureBraveryCheckBox.hide();
}

function UpdateUI(){
  TimeScaleSlider.position(10, 50);
  TimeScaleSlider.style('width', '150px');

  FoodSpawnSlider.position(10, 80);
  FoodSpawnSlider.style('width', '150px');

  FieldRadiusSlider.position(10, 110);
  FieldRadiusSlider.style('width', '150px');

  GlobalScaleSlider.position(10, 140);
  GlobalScaleSlider.style('width', '150px');

  CreatureSizeSlider.position((windowWidth - 5) / 2 - 190, windowHeight - 345);
  CreatureSizeSlider.style('width', '150px');
  CreatureSizeSlider.hide();

  CreatureLifeSpanSlider.position((windowWidth - 5) / 2 - 190, windowHeight - 315);
  CreatureLifeSpanSlider.style('width', '150px');
  CreatureLifeSpanSlider.hide();

  let ButtonColor = color(18);

  InterfaceSwitcher.position(10, 10);
  if (Device == "Laptop") InterfaceSwitcher.size(150, 30);
  else InterfaceSwitcher.size(displayWidth / 4.29, 30);
  InterfaceSwitcher.style('font-size', '18px');
  InterfaceSwitcher.style('background-color', ButtonColor);
  InterfaceSwitcher.style('color', 'white');
  InterfaceSwitcher.mousePressed(SwitchInterface);

  ShowInsidesSwitcher.position(10, 230);
  ShowInsidesSwitcher.size(150, 30);
  ShowInsidesSwitcher.style('font-size', '18px');
  ShowInsidesSwitcher.style('background-color', ButtonColor);
  ShowInsidesSwitcher.style('color', 'white');
  ShowInsidesSwitcher.mousePressed(SwitchShowInsides);

  if (Device == "Laptop"){
    KillAllButton.size(150, 30);
    KillAllButton.position((windowWidth - 5) / 2 - 75, 10);
  }
  else{
     KillAllButton.size(displayWidth / 4.29, 30);
     KillAllButton.position((windowWidth - 5) / 2 - (displayWidth / 4.29 / 2), 10);
  }
  KillAllButton.style('font-size', '18px');
  KillAllButton.style('background-color', ButtonColor);
  KillAllButton.style('color', 'white');
  KillAllButton.mousePressed(KillThemAll);

  if (Device == "Laptop"){
    MakeBalancedSetButton.size(175, 30);
    MakeBalancedSetButton.position((windowWidth - 5) / 2 - 87.5, 10);
  }
  else{
     MakeBalancedSetButton.size(displayWidth / 4.29, 30);
     MakeBalancedSetButton.position((windowWidth - 5) / 2 - (displayWidth / 4.29 / 2), 10);
  }
  MakeBalancedSetButton.style('font-size', '18px');
  MakeBalancedSetButton.style('background-color', ButtonColor);
  MakeBalancedSetButton.style('color', 'white');
  MakeBalancedSetButton.mousePressed(MakeBalancedSet);

  if (Device == "Laptop"){
    MakeRandomSetButton.size(175, 30);
    MakeRandomSetButton.position((windowWidth - 5) / 2 - 87.5, 50);
  }
  else{
     MakeRandomSetButton.size(displayWidth / 4.29, 30);
     MakeRandomSetButton.position((windowWidth - 5) / 2 - (displayWidth / 4.29 / 2), 50);
  }
  MakeRandomSetButton.style('font-size', '18px');
  MakeRandomSetButton.style('background-color', ButtonColor);
  MakeRandomSetButton.style('color', 'white');
  MakeRandomSetButton.mousePressed(MakeRandomSet);

  if (Device == "Laptop"){
    StatsSwitcherButton.size(150, 30);
    StatsSwitcherButton.position(windowWidth - 165, 10);
  }
  else{
     StatsSwitcherButton.size(displayWidth / 4.29, 30);
     StatsSwitcherButton.position(windowWidth - displayWidth / 4.29 - 15, 10);
  }
  StatsSwitcherButton.style('font-size', '18px');
  StatsSwitcherButton.style('background-color', ButtonColor);
  StatsSwitcherButton.style('color', 'white');
  StatsSwitcherButton.mousePressed(SwitchStats);

  if (Device == "Laptop"){
    if (Device == "Laptop"){
      InfoButton.size(100, 30);
      InfoButton.position(windowWidth - 115, windowHeight - 45);
    }
    else{
       InfoButton.size(displayWidth / 5, 30);
       InfoButton.position(windowWidth - displayWidth / 5 - 15, windowHeight - 45);
    }
    InfoButton.style('font-size', '18px');
    InfoButton.style('background-color', ButtonColor);
    InfoButton.style('color', 'white');
    InfoButton.mousePressed(RenderInfo);
  }

  if (Device == "Laptop"){
    ChangeCreatureButton.size(160, 30);
    ChangeCreatureButton.position((windowWidth - 5) / 2 - 80, windowHeight - 45);
  }
  else{
     ChangeCreatureButton.size(displayWidth / 4.29, 30);
     ChangeCreatureButton.position((windowWidth - 5) / 2 - (displayWidth / 4.29 / 2), windowHeight - 45);
  }
  ChangeCreatureButton.style('font-size', '18px');
  ChangeCreatureButton.style('background-color', ButtonColor);
  ChangeCreatureButton.style('color', 'white');
  ChangeCreatureButton.mousePressed(ChangeCreature);

  if (Device == "Laptop"){
    DieButton.position((windowWidth - 5) / 2 + 40, windowHeight - 270);
    DieButton.size(150, 30);
  }
  else{
    DieButton.position((windowWidth - 5) / 2 + 40, windowHeight - 270);
    DieButton.size(displayWidth / 4.29, 30);
  }
  DieButton.style('font-size', '18px');
  DieButton.style('background-color', ButtonColor);
  DieButton.style('color', 'white');
  DieButton.mousePressed(KillThisCreature);
  DieButton.hide();

  if (Device == "Laptop"){
    MakeChildrenButton.position((windowWidth - 5) / 2 + 40, windowHeight - 213);
    MakeChildrenButton.size(150, 30);
  }
  else{
    MakeChildrenButton.position((windowWidth - 5) / 2 + 40, windowHeight - 213);
    MakeChildrenButton.size(displayWidth / 4.29, 30);
  }
  MakeChildrenButton.style('font-size', '18px');
  MakeChildrenButton.style('background-color', ButtonColor);
  MakeChildrenButton.style('color', 'white');
  MakeChildrenButton.mousePressed(MakeChildrenOfThisCreature);
  MakeChildrenButton.hide();

  ApplyChangesButton.position((windowWidth - 5) / 2 - 75, windowHeight - 125);
  ApplyChangesButton.size(150, 30);
  ApplyChangesButton.style('font-size', '18px');
  ApplyChangesButton.style('background-color', ButtonColor);
  ApplyChangesButton.style('color', 'white');
  ApplyChangesButton.mousePressed(ApplyChanges);
  ApplyChangesButton.hide();

  CameraTypeSelector.position(10, 180);
  CameraTypeSelector.style('font-size', '18px');
  CameraTypeSelector.style('background-color', ButtonColor);
  CameraTypeSelector.style('color', 'white');
  CameraTypeSelector.size(150, 30);

  if (Device == "Laptop") CreatureFoodPrefsSelector.position((windowWidth - 5) / 2 - 190, windowHeight - 210);
  else CreatureFoodPrefsSelector.position((windowWidth - 5) / 2 - 180, windowHeight - 210);
  CreatureFoodPrefsSelector.style('font-size', '18px');
  CreatureFoodPrefsSelector.style('background-color', ButtonColor);
  CreatureFoodPrefsSelector.style('color', 'white');
  CreatureFoodPrefsSelector.size(150, 30);
  CreatureFoodPrefsSelector.hide();

  FoodSpawningTypeCheckBox.position(10, 270);
  FoodSpawningTypeCheckBox.size(220, 40);
  FoodSpawningTypeCheckBox.style('font-size', '24px');
  FoodSpawningTypeCheckBox.style('color', 'white');

  if (Device == "Laptop") CreatureLazinessCheckBox.position((windowWidth - 5) / 2 - 190, windowHeight - 280);
  else CreatureLazinessCheckBox.position((windowWidth - 5) / 2 - 180, windowHeight - 280);
  CreatureLazinessCheckBox.size(220, 40);
  CreatureLazinessCheckBox.style('font-size', '24px');
  CreatureLazinessCheckBox.style('color', 'white');
  CreatureLazinessCheckBox.hide();

  if (Device == "Laptop") CreatureBraveryCheckBox.position((windowWidth - 5) / 2 - 190, windowHeight - 250);
  else CreatureBraveryCheckBox.position((windowWidth - 5) / 2 - 180, windowHeight - 250);
  CreatureBraveryCheckBox.size(220, 40);
  CreatureBraveryCheckBox.style('font-size', '24px');
  CreatureBraveryCheckBox.style('color', 'white');
  CreatureBraveryCheckBox.hide();
}

function ChangeCreature(){
  if (ShowChangeMenu == true){
    ShowChangeMenu = !ShowChangeMenu;
    if (Device == "Laptop") ChangeCreatureButton.html("Change Creature");
    else ChangeCreatureButton.html("Change");
    CreatureSizeSlider.hide();
    CreatureLifeSpanSlider.hide();
    CreatureLazinessCheckBox.hide();
    CreatureBraveryCheckBox.hide();
    CreatureFoodPrefsSelector.hide();
    DieButton.hide();
    MakeChildrenButton.hide();
    ApplyChangesButton.hide();
  }
  else{
    ShowChangeMenu = !ShowChangeMenu;
    ChangeCreatureButton.html("Close");
    CreatureSizeSlider.show();
    CreatureLifeSpanSlider.show();
    CreatureLazinessCheckBox.show();
    CreatureBraveryCheckBox.show();
    CreatureFoodPrefsSelector.show();
    DieButton.show();
    MakeChildrenButton.show();
    ApplyChangesButton.show();
  }
}

function deviceShaken(){
  if (GlobalCamera.Timer == 0 && GlobalCamera.type == "Following"){
    GlobalCamera.FollowIndex += 1;
    if (GlobalCamera.FollowIndex >= Creatures.length) GlobalCamera.FollowIndex = 0;
    if (GlobalCamera.FollowIndex < 0) GlobalCamera.FollowIndex = Creatures.length - 1;
    GlobalCamera.FollowCreature = Creatures[GlobalCamera.FollowIndex];
    GlobalCamera.Timer = 60;
  }
}

function ApplyChanges(){
  if (Creatures.length > 0){
    GlobalCamera.FollowCreature.EnergyValue = CreatureSizeSlider.value() / 0.4;
    GlobalCamera.FollowCreature.LifeSpan = CreatureLifeSpanSlider.value();
    GlobalCamera.FollowCreature.Bravery = CreatureBraveryCheckBox.value();
    GlobalCamera.FollowCreature.Laziness = CreatureLazinessCheckBox.value();
    if (CreatureFoodPrefsSelector.value() == "Herbivorous") GlobalCamera.FollowCreature.FoodPrefs = 1;
    if (CreatureFoodPrefsSelector.value() == "Predator") GlobalCamera.FollowCreature.FoodPrefs = 2;
    if (CreatureFoodPrefsSelector.value() == "Omnivorous") GlobalCamera.FollowCreature.FoodPrefs = 3;
    GlobalCamera.FollowCreature.Color = color(255, 255, 255);
    GlobalCamera.FollowCreature.Race = "Changed";
    GlobalCamera.FollowCreature.CalculateParameters(FieldRadius);
  }
}

function MakeChildrenOfThisCreature(){
  if (Creatures.length > 0){
    GlobalCamera.FollowCreature.MakeChildren(Creatures, FieldRadius);
  }
}

function KillThisCreature(){
  if (Creatures.length > 0){
    Creatures.splice(GlobalCamera.FollowIndex, 1);
  }
}

function RenderInfo(){
  if (!fullscreen()) fullscreen(true);
  if (ShowInfo == true){
    ShowInfo = !ShowInfo;
    InfoButton.html("Info");
  }
  else{
    ShowInfo = !ShowInfo;
    InfoButton.html("Close");
  }
}

function SwitchStats(){
  if (!fullscreen()) fullscreen(true);
  if (ShowStatistics == true){
    ShowStatistics = !ShowStatistics;
    if (Device == "Laptop") StatsSwitcherButton.html("Show Stats");
    else StatsSwitcherButton.html("Stats");
    if (Device != "Laptop"){
      if (Creatures.length == 0){
        MakeBalancedSetButton.show();
        MakeRandomSetButton.show();
      }
    }
  }
  else if (ShowUI == false){
    ShowStatistics = !ShowStatistics;
    if (Device == "Laptop") StatsSwitcherButton.html("Hide Stats");
    else StatsSwitcherButton.html("Close");
    if (Device != "Laptop"){
      if (Creatures.length == 0){
        MakeBalancedSetButton.hide();
        MakeRandomSetButton.hide();
      }
    }
  }
}

function MakeRandomSet(){
  if (!fullscreen()) fullscreen(true);
  for (let i = 0; i < floor(random(4, 7.99)); ++i){
    NewCreature = new Creature(GlobalCamera);

    let RandomBool = random(0, 100);
    NewCreature.EnergyValue = random(50, 150);
    if (RandomBool > 50) NewCreature.Bravery = false;
    else NewCreature.Bravery = true;
    NewCreature.FoodPrefs = floor(random(1, 3.99));
    NewCreature.LifeSpan = random(50, 100);
    RandomBool = random(0, 100);
    if (RandomBool > 50) NewCreature.Laziness = false;
    else NewCreature.Laziness = true;

    if (i == 0){
      NewCreature.Color = color(255, 0, 0);
      NewCreature.Race = "Red";
    }
    if (i == 1){
      NewCreature.Color = color(255, 165, 0);
      NewCreature.Race = "Orange";
    }
    if (i == 2){
      NewCreature.Color = color(255, 255, 0);
      NewCreature.Race = "Yellow";
    }
    if (i == 3){
      NewCreature.Color = color(0, 255, 0);
      NewCreature.Race = "Green";
    }
    if (i == 4){
      NewCreature.Color = color(0, 191, 255);
      NewCreature.Race = "BrightBlue";
    }
    if (i == 5){
      NewCreature.Color = color(65, 105, 225);
      NewCreature.Race = "Blue";
    }
    if (i == 6){
      NewCreature.Color = color(139, 0, 255);
      NewCreature.Race = "Purple";
    }

    NewCreature.CalculateParameters(FieldRadius);
    Creatures.push(NewCreature);
  }
}

function MakeBalancedSet(){
  if (!fullscreen()) fullscreen(true);
  for (let i = 0; i < 7; ++i){
    NewCreature = new Creature(GlobalCamera);
    if (i == 0){
      NewCreature.EnergyValue = 50;
      NewCreature.Bravery = false;
      NewCreature.FoodPrefs = 1;
      NewCreature.LifeSpan = 50;
      NewCreature.Laziness = false;
      NewCreature.Color = color(255, 0, 0);
      NewCreature.Race = "Red";
    }
    if (i == 1){
      NewCreature.EnergyValue = 150;
      NewCreature.Bravery = true;
      NewCreature.FoodPrefs = 3;
      NewCreature.LifeSpan = 100;
      NewCreature.Laziness = true;
      NewCreature.Color = color(255, 165, 0);
      NewCreature.Race = "Orange";
    }
    if (i == 2){
      NewCreature.EnergyValue = 75;
      NewCreature.Bravery = true;
      NewCreature.FoodPrefs = 2;
      NewCreature.LifeSpan = 60;
      NewCreature.Laziness = false;
      NewCreature.Color = color(255, 255, 0);
      NewCreature.Race = "Yellow";
    }
    if (i == 3){
      NewCreature.EnergyValue = 100;
      NewCreature.Bravery = false;
      NewCreature.FoodPrefs = 3;
      NewCreature.LifeSpan = 75;
      NewCreature.Laziness = true;
      NewCreature.Color = color(0, 255, 0);
      NewCreature.Race = "Green";
    }
    if (i == 4){
      NewCreature.EnergyValue = 120;
      NewCreature.Bravery = false;
      NewCreature.FoodPrefs = 1;
      NewCreature.LifeSpan = 90;
      NewCreature.Laziness = false;
      NewCreature.Color = color(0, 191, 255);
      NewCreature.Race = "BrightBlue";
    }
    if (i == 5){
      NewCreature.EnergyValue = 70;
      NewCreature.Bravery = false;
      NewCreature.FoodPrefs = 3;
      NewCreature.LifeSpan = 100;
      NewCreature.Laziness = false;
      NewCreature.Color = color(65, 105, 225);
      NewCreature.Race = "Blue";
    }
    if (i == 6){
      NewCreature.EnergyValue = 80;
      NewCreature.Bravery = true;
      NewCreature.FoodPrefs = 3;
      NewCreature.LifeSpan = 60;
      NewCreature.Laziness = true;
      NewCreature.Color = color(139, 0, 255);
      NewCreature.Race = "Purple";
    }
    NewCreature.CalculateParameters(FieldRadius);
    Creatures.push(NewCreature);
  }
}

function SwitchShowInsides(){
  if (!fullscreen()) fullscreen(true);
  if (ShowInsides == true){
    ShowInsides = !ShowInsides;
    ShowInsidesSwitcher.html("Show Insides");
  }
  else{
    ShowInsides = !ShowInsides;
    ShowInsidesSwitcher.html("Hide Insides");
  }
}

function KillThemAll(){
  Creatures = [];
}

function SwitchInterface(){
  if (!fullscreen()) fullscreen(true);
  if (ShowUI == false && ShowStatistics == false){
    ShowUI = !ShowUI;
    InterfaceSwitcher.html("Hide UI");
    TimeScaleSlider.show();
    FoodSpawnSlider.show();
    FieldRadiusSlider.show();
    GlobalScaleSlider.show();
    ShowInsidesSwitcher.show();
    CameraTypeSelector.show();
    FoodSpawningTypeCheckBox.show();
    if (Device != "Laptop"){
      if (Creatures.length == 0){
        MakeBalancedSetButton.hide();
        MakeRandomSetButton.hide();
      }
    }
  }
  else if (ShowUI){
    ShowUI = !ShowUI;
    InterfaceSwitcher.html("Show UI");
    TimeScaleSlider.hide();
    FoodSpawnSlider.hide();
    FieldRadiusSlider.hide();
    GlobalScaleSlider.hide();
    ShowInsidesSwitcher.hide();
    CameraTypeSelector.hide();
    FoodSpawningTypeCheckBox.hide();
    if (Device != "Laptop"){
      if (Creatures.length == 0){
        MakeBalancedSetButton.show();
        MakeRandomSetButton.show();
      }
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth - 5, windowHeight - 5);
  UpdateUI();
}

function setup() {
  frameRate(60);
  pixelDensity(displayDensity());
  if (displayWidth / 4.29 > 150) Device = "Laptop";
  else Device = "Phone";
  SetUpUI();

  TimeScale = TimeScaleSlider.value();
  FoodSpawn = FoodSpawnSlider.value();
  GlobalCamera = new Camera;
  FieldRadius = FieldRadiusSlider.value();
  GlobalScale = GlobalScaleSlider.value();

  createCanvas(windowWidth - 5, windowHeight - 5);
}

function draw() {
  background(18);
  fill(255);
  textSize(22);
  text(floor(frameRate()) + "FPS", 10, windowHeight - 20);

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

  if (ShowInfo){
    if(ShowUI){
      ShowUI = !ShowUI;
      InterfaceSwitcher.html("Show UI");
      TimeScaleSlider.hide();
      FoodSpawnSlider.hide();
      FieldRadiusSlider.hide();
      GlobalScaleSlider.hide();
      ShowInsidesSwitcher.hide();
      CameraTypeSelector.hide();
      FoodSpawningTypeCheckBox.hide();
    }
    if (ShowStatistics){
      ShowStatistics = !ShowStatistics;
      StatsSwitcherButton.html("Show Stats");
    }
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
  DrawInfo();
}

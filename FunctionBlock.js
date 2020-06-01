function MakeRandomSet(){
  if (Os != "IOS"){
    if (!fullscreen()) fullscreen(true);
  }
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
  if (Os != "IOS"){
    if (!fullscreen()) fullscreen(true);
  }
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
    if (Device != "Laptop"){
      if (ShowUI) SwitchInterface();
      if (ShowStatistics) SwitchStats();
    }
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

function KillThemAll(){
  Creatures = [];
}

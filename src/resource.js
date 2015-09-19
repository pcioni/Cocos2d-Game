var res = {
    //Sprite Resources
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Player_png: "res/Player.png",
    Car_png: "res/Car.png",
    CarBroke1_png: "res/carbroke1.png",
    Background_png: "res/TestBG1.png",
	Crate_png: "res/Crate.png",

    //Sound Resources
    StageTheme_wav: "res/sound/StageTheme.wav",
    GameOver_wav: "res/sound/GameOver.wav",
    TitleTheme_wav: "res/sound/GameOver.wav",
    PickUp_wav: "res/sound/PickUp.wav",
    SprayPaint_wav: "res/sound/SprayPaint.wav",
    WrongPart_wav: "res/sound/WrongPart.wav"


};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
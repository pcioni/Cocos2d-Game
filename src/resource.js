var res = {
    //Sprite Resources
    Player_png: "res/Player.png",
    Car_png: "res/Car.png",
    CarBroke1_png: "res/carbroke1.png",
    Background_png: "res/Background.png",
	Crate_png: "res/Crate.png",

    //Paint Resources
    paintBlank: "res/paintBlank.png",
    redPaint_png: "res/paintRED.png",
    blackPaint_png: "res/paintBLACK.png",
    whitePaint_png: "res/paintWHITE.png",

    //Item Resources
    blank: "res/blank.png",
    Door_png: "res/door.png",
    Tire_png: "res/tire.png",
    Engine_png: "res/engine.png",

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
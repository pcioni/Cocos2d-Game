var res = {
    //Sprite Resources
    Player_png: "res/Player.png",
    playerRun_png: "res/playerRun.png",
    playerRun_plist: "res/playerRun.plist",


    Car_png: "res/Car.png",
    CarBroke1_png: "res/carbroke1.png",
    Background_png: "res/Background.png",
	Crate_png: "res/Crate.png",
	CarFixedGray_png: "res/carfinishedGRAY.png",
	CarFixedBlack_png: "res/carfinishedBLACK.png",
	CarFixedWhite_png: "res/carfinishedWHITE.png",
	CarFixedRed_png: "res/carfinishedRED.png",
	BoxOfDoors_png: "res/abox_ofdoors.png",
	BoxOfEngines_png: "res/abox_ofengines.png",
	BoxOfSeats_png: "res/abox_ofseats.png",
	BoxOfWheels_png: "res/abox_ofwheels.png",
	BlowTorchSitting_png: "res/blowtorchsitting.png",
	HammerSitting_png: "res/hammersitting.png",
	WrenchSitting_png: "res/wrenchsitting.png",
	Trash_png: "res/Trash.png",
	GameOver_png: "res/gameovah.png",
    ItemBubble_png: "res/Itembubble.png",

    //the rat, lol
    Rat_png: "res/rat.png",
    //Rat_plist: "res/rat.plist",

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
	
	//Menu Resources
	StartScreen_png: "res/titlescreen.png",
	ClickToStart_png: "res/clicktostart_1114x691_2fps_strip2.png",

    //Sound Resources
    StageTheme_wav: "res/sound/StageTheme.wav",
    GameOver_wav: "res/sound/GameOver.wav",
    TitleTheme_wav: "res/sound/TitleTheme.wav",
    PickUp_wav: "res/sound/PickUp.wav",
    SprayPaint_wav: "res/sound/SprayPaint.wav",
    Torch_wav: "res/sound/Torch.wav",
    Wrench_wav: "res/sound/Wrench.wav",
    WrongPart_wav: "res/sound/WrongPart.wav",
    Place_wav: "res/sound/Place.wav"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
class Road extends AdventureScene {
    constructor() {
        super("road", "Road to Coolzville");
    }
    preload()
        {
            this.load.image("sign", "Sprites/sign.png");
            this.load.image("sign glass", "Sprites/Glass.png");
        }

    onEnter() {
        this.add.sprite(1050, 750, "sign")
        this.add.sprite (650, 620, "sign glass");
        let SignGlass = this.add.text(this.w * 0.3, this.w * 0.3, "Sunglasses")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Sunglasses, cool, not yours."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: SignGlass,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let shoe = this.add.text(this.w * 0.5, this.w * 0.1, "shoes")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice pair of shoes.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the shoes.");
                this.gainItem('shoe');
                this.tweens.add({
                    targets: shoe,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => shoe.destroy()
                });
            })

        let sign = this.add.text(this.w * 0.5, this.w * 0.330, "sign")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("shoe")) {
                    this.showMessage("You've got to get shoes before you can leave.");
                } else {
                    this.showMessage("You will need shoes on your journey. Can you find some shoes?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("shoe")) {
                    this.loseItem("shoe");
                    this.showMessage("*crunch*");
                    sign.setText("you can walk the path");
                    this.gotoScene('guard');
                }
            })

    }
}

class Guard extends AdventureScene {
    constructor() {
        super("guard");
    }
    preload(){
        this.load.image("guard", "Sprites/guard.png");
    }

    onEnter() {
    this.add.sprite(950, 650, "guard");
        let guard = this.add.text(this.w * 0.45, this.w * 0.175, "Guard").setFontSize(this.s * 2)
            .on('pointerover', () => {
                if (this.hasItem("glass")){
                    this.showMessage("*Cool sunglasses, Welcome to Coolzville (Click to Enter)")
                    .on('pointerDown', () => {
                        this.loseItem('shoe')
                        this.gotoScene('town');
                    })
                } else {
                    (this.hasItem("shoe"))
                    this.showMessage("Nice shoes but I don't think they will be cool enough")
                    .setInteractive()
                    .on('pointover', () => {
                        this.showMessage("Enter?")
                        .on('pointerdown', () => {
                            this.gotoScene('town');
                            })
                        }) 
                } 
            })
        }
    }

class Town extends AdventureScene{
    constructor() {
        super("town");
    }

    onEnter() {
        if (this.hasItem("shoe")){
            this.add.text(500, 500, "HEY! We don't take too kindly to dry drip having people!")
            this.add.text(500, 550, "*You decide its a good idea to run*")
            this.add.text(500, 600, "*You run and end up tripping over a small cool rock and roll down into the dump*")
            this.showMessage("click to get up")
            .on('pointerdown', () => {
                this.gotoScene('dump');
            })
        } else {
            if (this.hasItem("glass"))
            this.add.text(500, 500, "Hey cool Sunglasses, come sit and hang with us.")
            this.add.text(500, 600, "You are cool")
            this.add.text(500, 600, "*Click to Continue*")
            .on('pointerdown', () => {
                this.gotoScene('Outro');
            })

        }

    }

}

class Dump extends AdventureScene{
    constructor() {
        super("dump");
    }

}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    preload(){
        this.load.image("logo","Sprites/logo.png");
    }
    create() {
        this.add.sprite(800, 50, "logo");
        this.add.text(800, 200, "Inzo Inc.").setFontSize(80);
        this.add.text(50,50, "To Be Cool!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('road'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    preload(){
        this.load.image("Big Glass", "Sprites/Cool Guy.png");
    }
    create() {
        this.add.sprite(300, 200, "Big Glass");
        this.add.text(50, 50, "Thanks for Playing!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Town, Intro, Road, Guard, Dump, Outro,], //remeber to put scene list in correct order at end!
    title: "To Be Cool",
});


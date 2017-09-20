//### GameState: GAME
//#############################################################################
function Game() {
	Phaser.State.call(this)
}

// important values as static fields
Game.TIMER_MAX = 30

// inherits from Phaser.State
Game.prototype = Object.create(Phaser.State)


;(function(p){

//### GameState Funktionen
//#############################################################################
    /**
     * Prepare game state.
     * Executed once on page / game load.
     */
    p.init = function() {
        // add background as lowest layer
        this.background = game.add.image(0, 0, "bg_game")
        
        // create game objects
        this.area = new Area()
        this.startBar = game.add.image(CFG.AREA.border, 100, 'player', 18)
        this.startBar.width = CFG.AREA.width
        this.startBar.anchor.setTo(0, 0.5)
        this.title = new GuiTitle(480, 12)
        this.player = new Player()
        this.bumpers = []
        this.powerups = []
        this.slingshots = []
        
        this.gameover = {
            game: game.add.sprite(0, 0, 'gameover', 0),
            over: game.add.sprite(0, 0, 'gameover', 2)
        }
        
        this.btnSound = game.add.button(
            CFG.WIDTH - 10, CFG.HEIGHT - 10, 'btn_sound',
            () => {
                if(CFG.SOUND.volume > 0) {
                    console.log('button:off')
                    this.btnSound.setFrames(0, 0, 0)
                    CFG.SOUND.volume = 0
                } else {
                    console.log('button:on')
                    this.btnSound.setFrames(1, 1, 1)
                    CFG.SOUND.volume = 0.5
                }
            }, this, 1, 1, 1)
        this.btnSound.anchor.setTo(1, 1)
        if(CFG.SOUND.volume > 0)
            this.btnSound.setFrames(1, 1, 1)
        else
            this.btnSound.setFrames(0, 0, 0)
        
        // create gui
        this.gui = {
            score:    new GuiNumbers("digits", 8, 462, 264, 2),
            time: {
                      min: new GuiNumbers("digits_small", 2, 460, 369),
                      sec: new GuiNumbers("digits_small", 2, 512, 369),
                      update: function(time) {
                          this.min.update(time / 60)
                          this.sec.update(time % 60)
                          if(time <= 10 && time > 0) {
                              this.min.flash(0.5, 0.5)
                              this.sec.flash(0.5, 0.5)
                          }
                      }
            },
            distance: new GuiNumbers("digits_small", 6, 578, 369),
            factor:   new GuiNumbers("digits_small", 2, 735, 369)
        }
        
        // create important variables
        this.isGameStarted = false
        this.timer = Game.TIMER_MAX
        
        StartTimer.init()
        
        console.log("init done")
    },
       
    /**
     * Create game state.
     * Executed everytime the game will be started.
     */
    p.create = function() {
        this.isGameStarted = false
        this.timer = Game.TIMER_MAX
        
        // destroy game object, then remove item
        this.bumpers.forEach(obj => obj.destroy(), this)
        this.bumpers = []
        this.powerups.forEach(obj => obj.destroy(), this)
        this.powerups = []
        this.slingshots.forEach(obj => obj.destroy(), this)
        this.slingshots = []
        
        this.gameover.game.reset(0, 0)
        this.gameover.game.alpha = 0
        this.gameover.over.reset(CFG.AREA.border + CFG.AREA.width - 163, CFG.HEIGHT - 59)
        this.gameover.over.alpha = 0
        this.startBar.visible = true
        
        // setup basic variables
        this.SPEED = -300
        this.player.resetTo(this.area.getCenterX(), 100)
        
        // reset singletons
        Gravitation.reset()
        Spawner.reset()
        Score.reset()
        
        // reset gui
        this.gui.score.update(0)
        this.gui.distance.update(0)
        this.gui.factor.update(1)
        this.gui.time.update(this.timer)
        
        // limit speed
        Gravitation.applyLimitY(this.SPEED)
        
        // start on any key
        game.input.keyboard.onDownCallback = () => {
            if(!StartTimer.isActive && !this.isGameStarted) {
                StartTimer.start(() => {
                    this.isGameStarted = true
                    this.startBar.visible = false
                    this.player.animations.play('fall')
                })
                game.input.keyboard.onDownCallback = null
            }
        }
        
        console.log("create done")
    },
       
    /**
     * Logik neu berechnen.
     */
    p.update = function() {
        // get elapsed time since last update
        deltaTime = game.time.physicsElapsedMS * 0.001
        
        
        //### UPDATE GUI ELEMENTS #############################################
        this.gui.score.update(Score.score)
        this.gui.distance.update(Score.distanceShow)
        this.gui.factor.update(Score.factor)
        this.gui.time.update(this.timer)
        this.title.update()
        
        
        // don't update game if it's not started yet
        if(!this.isGameStarted) return
        
        
        //### UPDATE OBJECTS POSITION #########################################
        let scaledVelocityY = Gravitation.getScaledVelocityY()
        let scaledVelocityX = Gravitation.getScaledVelocityX()
        
        this.player.moveBy(scaledVelocityX)
        this.area.moveBy(scaledVelocityY)
        this.bumpers.forEach(obj => obj.moveBy(scaledVelocityY))
        this.powerups.forEach(obj => obj.moveBy(scaledVelocityY))
        this.slingshots.forEach(obj => obj.moveBy(scaledVelocityY))
        
        
        //### UPDATE SINGLETONS ###############################################
        // update 'physics'
        Gravitation.update()
        
        // update spawner and add objects to game
        let objs = Spawner.spawn(scaledVelocityY)
        if(objs && Array.isArray(objs)) {
            objs.forEach(obj => {
                if(obj.type === 'bumper')
                    this.bumpers.push(obj.obj)
                else if(obj.type === 'powerup')
                    this.powerups.push(obj.obj)
                else if(obj.type === 'shot')
                    this.slingshots.push(obj.obj)
            }, this)
        }
        
        // update score
        Score.changeDistance(-scaledVelocityY)
        
        // update maximum speed influenced by factor
        Gravitation.applyLimitY(this.SPEED + this.SPEED / 10 * Score.factor)
        
        
        //### HANDLE INPUT ####################################################
        // input -> move player
        // moving left or right
        // if not moving, then slow down 'til zero
        if(game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
            Gravitation.applyForce(-5, 0)
        } else if(game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
            Gravitation.applyForce(5, 0)
        } else {
            if(Gravitation.vel.x < 0)
                Gravitation.applyForce(2.5, 0)
            else if(Gravitation.vel.x > 0)
                Gravitation.applyForce(-2.5, 0)
        }
        
        
        //### COLLISIONS ######################################################
        // player -> borders
        if(this.player.x - this.player.radius < this.area.area.x) {
            this.player.resetTo(this.area.area.x + this.player.radius, this.player.y)
            Gravitation.vel.x *= -0.5
        } else if(this.player.x + this.player.radius > this.area.area.right) {
            this.player.resetTo(this.area.area.right - this.player.radius, this.player.y)
            Gravitation.vel.x *= -0.5
        }
        
        // player -> bumper
        this.bumpers.forEach(bump => {
            // collide with bumper if distance between player and bumper is smaller than
            // both radius summed
            // Info: calculate with squared numbers to avoid high cpu usage
            let distanceSquared = Math.pow(bump.x - this.player.x, 2) + Math.pow(bump.y - this.player.y, 2)
            let radiusSquared = Math.pow(bump.radius + this.player.radius, 2)
            
            if(distanceSquared < radiusSquared) {
                /// TODO: animation, sound, show score
                // animate hit
                bump.hit()
                
                // update score
                Score.add(Score.SCORE_BUMPER)
                
                // change factor
                /// tyr decreasing instead of reset
                ///Score.resetFactor()
                Score.changeFactor(-1)
                this.gui.factor.flash()
                
                // let player bump of
                let ply = new Phaser.Point(this.player.x, this.player.y)
                let bmp = new Phaser.Point(bump.x, bump.y)
                let dir = Phaser.Point.subtract(ply, bmp)
                let nrm = Phaser.Point.normalize(dir)
                
                let force = new Phaser.Point()
                force.copyFrom(nrm)
                force.multiply(1000, -1000)
                
                Gravitation.applyForce(force.x, force.y)
            }
        }, this);
        
        // player -> powerup
        this.powerups.forEach(powerup => {
            // collide with powerup if distance between player and powerup is smaller than
            // both radius summed
            // Info: calculate with squared numbers to avoid high cpu usage
            let distanceSquared = Math.pow(powerup.x - this.player.x, 2) + Math.pow(powerup.y - this.player.y, 2)
            let radiusSquared = Math.pow(powerup.radius + this.player.radius, 2)
            
            if(distanceSquared < radiusSquared) {
                /// TODO: animation, sound
                powerup.hit()
                
                // 'execute' powerup
                let {time, speed} = powerup.power
                this.timer += time
                Score.factor += speed
                
                // after use -> remove
                powerup.isDead = true
            }
        }, this)
        
        // player -> slingshot
        this.slingshots.forEach(slingshot => {
            // check if player is near the slingshot
            if(slingshot.possibleCollisionWithPlayer(this.player)) {
                
                // check if player collides with shooting area
                let nrm = slingshot.collideWithShot(this.player)
                if(nrm) {
                    Gravitation.applyForce(nrm.x * 1000, nrm.y * 1000)
                    return
                }
                
                // check if player collides with slingshot nodes
                nrm = slingshot.collideWithNodes(this.player)
                if(nrm) {
                    Gravitation.vel.x *= -0.5
                    Gravitation.vel.y *= -0.5
                }
            }
        }, this)
        
        
        //### UPDATE TIMER ####################################################
        if(this.timer <= 0) {
            /// TODO: game ends
            this.isGameStarted = false
            this.timer = 0
            this.gameIsOver()
        } else {
            this.timer -= deltaTime
        }
        
        
        //### REMOVE DEAD OBJECTS #############################################
        // destroy game object, then remove item
        this.bumpers.forEach(obj => {if(obj.isDead) obj.destroy()}, this)
        this.bumpers = this.bumpers.filter(obj => !obj.isDead)
        
        this.powerups.forEach(obj => {if(obj.isDead) obj.destroy()}, this)
        this.powerups = this.powerups.filter(obj => !obj.isDead)
        
        this.slingshots.forEach(obj => {if(obj.isDead) obj.destroy()}, this)
        this.slingshots = this.slingshots.filter(obj => !obj.isDead)
    },

    // change game state
    p.gameIsOver = function() {
        // stop player animation
        this.player.animations.stop()
        
        // let fly in 'game' and 'over'
        // then flash screen
        let twGame = game.tweens.create(this.gameover.game)
        let twOver = game.tweens.create(this.gameover.over)
        
        let tweenTime = 250
        let flashTime = 250
        
        twGame.to({
            x: CFG.AREA.border + (CFG.AREA.width - 202)/2,
            y: CFG.AREA.border + (CFG.AREA.height - 59)/2 - 33,
            alpha: 1
        }, tweenTime)
        twOver.to({
            x: CFG.AREA.border + (CFG.AREA.width - 202)/2,
            y: CFG.AREA.border + (CFG.AREA.height - 59)/2 + 33,
            alpha: 1
        }, tweenTime)
        
        
        // after animation a key press will lead to menu screen
        game.camera.onFlashComplete.addOnce(() => {
            // delay user input after game over (to avoid screen 'jumping')
            setTimeout(function() {
                // show 'press a key'
                this.presskey = game.add.image(0, 0, 'presskey')
                this.presskey.reset(
                    CFG.AREA.border + (CFG.AREA.width - this.presskey.width) / 2,
                    538
                )
                let tween = game.tweens.create(this.presskey)
                tween.to({alpha: 0}, 700, Phaser.Easing.Exponential.In, true, 0, -1)
                tween.yoyo(true)
                
                // handle keypress
                game.input.keyboard.onDownCallback = () => {
                    game.input.keyboard.onDownCallback = null
                    game.state.start("Menu")
                }
            }, 1000)
        }, this)
        
        // after tweening 'game' and 'over' the screen will flash
        twOver.onComplete.add(() => {
            game.camera.flash(0xffffff, flashTime)
        }, this)
        
        
        // game over should show over all other sprites
        this.gameover.game.bringToTop()
        this.gameover.over.bringToTop()
        
        twGame.start()
        twOver.start()
    }
    
}(Game.prototype))
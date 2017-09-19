// Spawner may use these functions to create game objects
var SpawnFn = {
    
    /*                 *
     *     B           *
     *                 *
     *          B      *
     *                 *
     * B               */
    threeBumpers: function(left = true) {
        // calculate bumper positions
        let p1 = {
            x: CFG.AREA.border + (left ? CFG.AREA.width / 4 : CFG.AREA.width * 3 / 4),
            y: CFG.HEIGHT + 100
        }
        let p2 = {
            x: CFG.AREA.border + (left ? CFG.AREA.width / 6 : CFG.AREA.width * 5 / 6),
            y: CFG.HEIGHT + 300
        }
        let p3 = {
            x: CFG.AREA.width / 2 + CFG.AREA.border,
            y: CFG.HEIGHT + 200
        }
        
        // setup and add bumpers to game
        let [b1, b2, b3] = [new Bumper(), new Bumper(), new Bumper()]
        b1.resetTo(p1.x, p1.y)
        b2.resetTo(p2.x, p2.y)
        b3.resetTo(p3.x, p3.y)
        
        // pack objects
        let objects = [
            {type: 'bumper', obj: b1},
            {type: 'bumper', obj: b2},
            {type: 'bumper', obj: b3}
        ]
        
        // on chance: add power up/down
        if(Phaser.Utils.chanceRoll(10)) {
            let power = {
                type: 'powerup',
                obj: new PowerUp({time: 5, speed: 0}) // or via PowerUp.TYPE
            }
            power.obj.resetTo(p1.x, p3.y)
            
            objects.push(power)
        }
        
        height = 400
        
        return {objects, height}
    },
    
    /*                 *
     *    B       B    *
     *                 *
     *        B        *
     *                 *
     * B             B */
    fiveBumpers: function() {
        // calculate bumper positions
        let p1 = {
            x: CFG.AREA.border + CFG.AREA.width / 4,
            y: CFG.HEIGHT + 100
        }
        let p2 = {
            x: CFG.AREA.border + CFG.AREA.width / 6,
            y: CFG.HEIGHT + 300
        }
        let p3 = {
            x: CFG.AREA.width / 2 + CFG.AREA.border,
            y: CFG.HEIGHT + 200
        }
        let p4 = {
            x: CFG.AREA.border + CFG.AREA.width * 3 / 4,
            y: CFG.HEIGHT + 100
        }
        let p5 = {
            x: CFG.AREA.border + CFG.AREA.width * 5 / 6,
            y: CFG.HEIGHT + 300
        }
        
        // setup and add bumpers to game
        let [b1, b2, b3, b4, b5] = [new Bumper(), new Bumper(),
                                    new Bumper(), new Bumper(),
                                    new Bumper()]
        b1.resetTo(p1.x, p1.y)
        b2.resetTo(p2.x, p2.y)
        b3.resetTo(p3.x, p3.y)
        b4.resetTo(p4.x, p4.y)
        b5.resetTo(p5.x, p5.y)
        
        // pack objects
        let objects = [
            {type: 'bumper', obj: b1},
            {type: 'bumper', obj: b2},
            {type: 'bumper', obj: b3},
            {type: 'bumper', obj: b4},
            {type: 'bumper', obj: b5}
        ]
        
        height = 400
        
        return {objects, height}
    },
    
    /*                 *
     *    B       B    *
     *                 *
     *                 *
     *                 *
     * B             B */
    fourBumpers: function() {
        // calculate bumper positions
        let p1 = {
            x: CFG.AREA.border + CFG.AREA.width / 4,
            y: CFG.HEIGHT + 100
        }
        let p2 = {
            x: CFG.AREA.border + CFG.AREA.width / 6,
            y: CFG.HEIGHT + 300
        }
        let p4 = {
            x: CFG.AREA.border + CFG.AREA.width * 3 / 4,
            y: CFG.HEIGHT + 100
        }
        let p5 = {
            x: CFG.AREA.border + CFG.AREA.width * 5 / 6,
            y: CFG.HEIGHT + 300
        }
        
        // setup and add bumpers to game
        let [b1, b2, b4, b5] = [new Bumper(), new Bumper(),
                                new Bumper(), new Bumper()]
        b1.resetTo(p1.x, p1.y)
        b2.resetTo(p2.x, p2.y)
        b4.resetTo(p4.x, p4.y)
        b5.resetTo(p5.x, p5.y)
        
        // pack objects
        let objects = [
            {type: 'bumper', obj: b1},
            {type: 'bumper', obj: b2},
            {type: 'bumper', obj: b4},
            {type: 'bumper', obj: b5}
        ]
        
        height = 500
        
        return {objects, height}
    },
    
    /*                 *
     *                 *
     *                 *
     * B      B      B *
     *                 *
     *                 */
    threeBumpersLine: function() {
        // calculate bumper positions
        let p1 = {
            x: CFG.AREA.border + CFG.BUMPER.width,
            y: CFG.HEIGHT + 100
        }
        let p2 = {
            x: CFG.AREA.border + CFG.AREA.width / 2,
            y: CFG.HEIGHT + 100
        }
        let p3 = {
            x: CFG.AREA.border + CFG.AREA.width - CFG.BUMPER.width,
            y: CFG.HEIGHT + 100
        }
        
        // setup and add bumpers to game
        let [b1, b2, b3] = [new Bumper(), new Bumper(), new Bumper()]
        b1.resetTo(p1.x, p1.y)
        b2.resetTo(p2.x, p2.y)
        b3.resetTo(p3.x, p3.y)
        
        // pack objects
        let objects = [
            {type: 'bumper', obj: b1},
            {type: 'bumper', obj: b2},
            {type: 'bumper', obj: b3}
        ]
        
        height = 300
        
        return {objects, height}
    },
    
    /*                 *
     *                 *
     *                 *
     * B      B      B *
     *                 *
     *                 */
    twoBumpersLine: function() {
        // calculate bumper positions
        let p1 = {
            x: CFG.AREA.border + CFG.AREA.width / 4,
            y: CFG.HEIGHT + 100
        }
        let p2 = {
            x: CFG.AREA.border + CFG.AREA.width * 3 / 4,
            y: CFG.HEIGHT + 100
        }
        
        // setup and add bumpers to game
        let [b1, b2] = [new Bumper(), new Bumper()]
        b1.resetTo(p1.x, p1.y)
        b2.resetTo(p2.x, p2.y)
        
        // pack objects
        let objects = [
            {type: 'bumper', obj: b1},
            {type: 'bumper', obj: b2}
        ]
        
        height = 300
        
        return {objects, height}
    },
    
    /*                 *
     *                 *
     *                 *
     * B      B      B *
     *                 *
     *                 */
    twoBumpersNearCenter: function() {
        // calculate bumper positions
        let p1 = {
            x: CFG.AREA.border + CFG.AREA.width / 2 - CFG.BUMPER.width / 2,
            y: CFG.HEIGHT + 100
        }
        let p2 = {
            x: CFG.AREA.border + CFG.AREA.width / 2 + CFG.BUMPER.width / 2,
            y: CFG.HEIGHT + 100
        }
        
        // setup and add bumpers to game
        let [b1, b2] = [new Bumper(), new Bumper()]
        b1.resetTo(p1.x, p1.y)
        b2.resetTo(p2.x, p2.y)
        
        // pack objects
        let objects = [
            {type: 'bumper', obj: b1},
            {type: 'bumper', obj: b2}
        ]
        
        height = 300
        
        return {objects, height}
    },
    
    /*                 *
     *                 *
     *                 *
     *        B        *
     *                 *
     *                 */
    oneBumper: function() {
        // calculate bumper positions
        let p1 = {
            x: CFG.AREA.border + CFG.AREA.width / 2,
            y: CFG.HEIGHT + 100
        }
        
        // setup and add bumpers to game
        let b1 = new Bumper()
        b1.resetTo(p1.x, p1.y)
        
        // pack objects
        let objects = [
            {type: 'bumper', obj: b1}
        ]
        
        height = 300
        
        return {objects, height}
    },
    
    /* S               *
     * SS              *
     * SSS             *
     * SSSS            *
     *  SSSS           *
     *    SSS          */
    slingshot: function(left = true) {
        /// TODO: collision with right slingshots doesn't work currently
        left = true
        
        // calculate slingshot position
        let p = {
            x: CFG.AREA.border + (left ? 0 : CFG.AREA.width - 128),
            y: CFG.HEIGHT + 100
        }
        
        // create slingshot
        let shot = new Slingshot(left)
        shot.resetTo(p.x, p.y)
        
        // pack objects
        let objects = [
            {type: 'shot', obj: shot}
        ]
        
        return objects
    },
    
    /* S               *
     * SS              *
     * SSS             *
     * SSSS        B   *
     *  SSSS           *
     *    SSS          */
    slingshotBumper: function() {
        // calculate positions
        let sling = {
            x: CFG.AREA.border,
            y: CFG.HEIGHT + 100
        }
        let bump = {
            x: CFG.AREA.border + CFG.AREA.width * 3 / 4,
            y: CFG.HEIGHT + 200
        }
        
        
        // create objects
        let shot = new Slingshot(true)
        shot.resetTo(sling.x, sling.y)
        
        let per = new Bumper()
        per.resetTo(bump.x, bump.y)
        
        
        // pack objects
        let objects = [
            {type: 'shot', obj: shot},
            {type: 'bumper', obj: per}
        ]
        
        return objects
    },
    
    powerupTime: function(value) {
        let power = {
            type: 'powerup',
            obj: new PowerUp({time: value, speed: 0}) // or via PowerUp.TYPE
        }
        power.obj.resetTo(CFG.AREA.width * Math.random() + CFG.AREA.border, CFG.HEIGHT + 100)
        
        return [power]
    }
}
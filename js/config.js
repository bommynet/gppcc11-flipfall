// Konfiguration
var CFG = {
    WIDTH: 800,
    HEIGHT: 700,
    
    AREA: {
        width: 384,
        height: 700,
        border: 24
    },
    
    PLAYER: {
//        file: 'player_kati.png',
//        radius: 33 / 2,
//        width: 75,
//        height: 75,
//        frames: [0,1,2,3]
        file: 'player3d_kati.png',
        radius: 64 / 2,
        width: 108,
        height: 108,
        animations: {
            fall: [0,1,2,3],
            prepare: [8,9,10,11,12,13,14,15,16,17],
            up: [4,5,6,7]
        }
    },
    
    BUMPER: {
        file: 'bumper_kati.png',
        radius: 40 / 2,
        width: 70,
        height: 70,
        animations: {
            idle: [8],
            hit: [9,10,11]
        }
    },
    
    RADIUS: {
        bumper: 40 / 2,
        powerup: 40 / 4
    },
    
    SOUND: {
        volume: 0.5
    },
    
    TITLE: {
        id: 'pinfall',
        file: 'assets/title_ingame.png',
        width: 282,
        height: 195,
        anim: [
            {id: 'on', frames: [8]},
            {id: 'off', frames: [0]},
            {id: 'single_on', frames: [0,1,2,3,4,5,6,7], fps: 3},
            {id: 'single_off', frames: [8,9,10,11,12,13,14,15], fps: 3},
            {id: 'opposite_on', frames: [16,17,18], fps: 2},
            {id: 'opposite_off', frames: [19,20,21], fps: 2},
            {id: 'toggle', frames: [22,23,22,23,22,23,22,23], fps: 2},
            {id: 'toggle_words', frames: [53,54,53,54,53,54], fps: 2},
            {id: 'fillup', frames: [24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52], fps: 10}
        ]
    }
}
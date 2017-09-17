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
    }
}
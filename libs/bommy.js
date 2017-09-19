;(function(root){
    
    //#########################################################################
    //### Random Elements #####################################################
    //#########################################################################
    let Random = {
        
        // select a random element from all choice elements (even distributed)
        randomElement: function(...choices) {
            // no choices -> no elements
            if(!choices || choices.length < 1) return null
            
            let elements = choices
            
            // choices could be an array
            if(choices.length === 1 && Array.isArray(choices[0])) {
                elements = choices[0]
            }
            
            // get a random index and return the selected element
            let selectedIndex = Math.floor(Math.random() * elements.length)
            return elements[selectedIndex]
        }
    }
    
    
    //#########################################################################
    //### Collisions ##########################################################
    //#########################################################################
    let Collision = {
        
        // check for collision between a line and a circle
        lineCircle: function(start, end, circle, radius) {
            
            // calculate with squared values to avoid squareroots
            let radiusSq = Math.pow(radius, 2)
            
            // calculate vector (start - circle) and it's squared length
            let sSubC = {
                x: start.x - circle.x,
                y: start.y - circle.y
            }
            let sSubCSq = Math.pow(sSubC.x, 2) + Math.pow(sSubC.y, 2)
            
            // check wether start lies within circle
            if(sSubCSq <= radiusSq)
                return true
            
            // calculate line direction and it's squared length
            let lineDir = {
                x: start.x - end.x,
                y: start.y - end.y
            }
            let lineDirSq = Math.pow(lineDir.x, 2) + Math.pow(lineDir.y, 2)
            
            // calculate dot product of direction and translated start
            let dotDS = lineDir.x * sSubC.x + lineDir.y * sSubC.y
            
            // calculate discriminant
            let disc = Math.pow(dotDS, 2) - lineDirSq * (sSubCSq - radiusSq)
            
            /* 1. negative disc -> no collision
             * 2. positive disc -> check wether (-dotDS - sqrt(disc)) / lineDirSq is in [0,1]
             */
            if(disc < 0)
                return false
            else {
                let intersection = (-dotDS - Math.sqrt(disc)) / lineDirSq
                
                if(intersection < 0 || intersection > 1)
                    return false
                else
                    return true
            }
        }
        
    }
    
    
    root.Bommy = {
        Random,
        Collision
    }
    
})(window)
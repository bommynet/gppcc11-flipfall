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
            
            // 1. translate all vectors by -start (move origin)
            // 2. translate end and circle by alpha (end is perpendicular to x-axis)
            // 3. determine point L with x=0 and y=C.y
            // 4. check if circles L'=(L, 0) and C'=(C,radius) collide
            
            
            // 1.) translate vectors: -start
            /// let S = (0,0) // 'cause S = start - start
            let E = new Bommy.Vector2(end.x - start.x, end.y - start.y)
            let C = new Bommy.Vector2(circle.x - start.x, circle.y - start.y)
            
            
            // 2.) translate E and C by alpha
            // 2.i) create helper vector H to calculate angle
            let H = new Bommy.Vector2(0, E.y)
            
            // 2.ii) calculate alpha from H and E
            let dotEH = E.x * H.x + E.y * H.y
            let lenE = Math.sqrt(Math.pow(E.x,2) + Math.pow(E.y,2))
            let lenH = Math.sqrt(Math.pow(H.x,2) + Math.pow(H.y,2))
            
            let cosAlpha = dotEH / (lenE * lenH)
            let alpha = Math.acos(cosAlpha)
            let sinAlpha = Math.sin(alpha)
            
            
            // 2.iii) rotate E and C
            let x_ = cosAlpha * E.x - sinAlpha * E.y
            let y_ = sinAlpha * E.x + cosAlpha * E.y
            let E_ = new Bommy.Vector2(x_, y_)
            
            x_ = cosAlpha * C.x - sinAlpha * C.y
            y_ = sinAlpha * C.x + cosAlpha * C.y
            let C_ = new Bommy.Vector2(x_, y_)
            
            
            // 3.) determine L
            let L = new Bommy.Vector2(0, C_.y) // 0 because S=(0,0) is the origin
            console.table({E_, C_, L})
            
            // check if L is near E_ -> else there can't be a collision
            if(L.y < -radius || L.y > E_.y + radius)
                return false
            
            
            // 4.) check if circles collide
            let distanceSq = Math.pow(L.x - C_.x, 2) + Math.pow(L.y - C_.y, 2)
            let radiusSq = Math.pow(radius, 2)
            
            if(distanceSq <= radiusSq)
                return true
            
            return false
        }
        
    }
    
    
    let Vector2 = function(x, y) {
        
        this.x = x
        this.y = y
            
        this.add = function(vec1, vec2) {
            return new Vector2(
                this.x + vec2.x,
                this.y + vec2.y
            )
        }
        
    }
    
    
    root.Bommy = {
        Random,
        Vector2,
        Collision
    }
    
})(window)
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
    
    
    root.Bommy = {
        Random
    }
    
})(window)
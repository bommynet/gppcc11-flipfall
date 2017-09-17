;(function(root){
    
    //#########################################################################
    //### Random Elements #####################################################
    //#########################################################################
    let Random = {
        
        // select a random element from all choice elements (even distributed)
        randomElement: function(...choices) {
            // no choices -> no elements
            if(!choices || choices.length < 1) return null
            
            // one choice -> one element
            if(choices.length === 1) return choices[0]
            
            // get a random index and return the selected element
            let selectedIndex = Math.floor(Math.random() * choices.length)
            return choices[selectedIndex]
        }
    }
    
    
    root.Bommy = {
        Random
    }
    
})(window)
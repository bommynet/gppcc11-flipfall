//#############################################################################
//### GUI Element: LED Numbers
//#############################################################################
function GuiNumbers(imagekey, count = 2, x = 0, y = 0, gap = 0) {
    this.image = []
    this.isFlashing = false
    this.timerFlashing = 0
    this.isFlashingDelay = false
    this.timerFlashingDelay = 0
    
    // create digits
    for(let i=0; i<count; i++) {
        this.image[i] = game.add.image(0, 0, imagekey, 0)
    }
    
    // positioning digits
    let width = this.image[0].width
    this.image.forEach((digit, index) => {
        digit.reset(x + index * (width + gap), y)
    })
}

GuiNumbers.prototype.update = function(value) {
    // get digits from score
    let num = Math.floor(value)
    let digits = []
    while (num > 0) {
        digits[digits.length] = num % 10
        num = Math.floor(num / 10)
    }
    digits.reverse()
    
    // update images for digits
    this.image.forEach((digit, index) => {
        let current = index - (this.image.length - digits.length)
        
        if(current >= 0)
            digit.frame = digits[current] + (this.isFlashing ? 11 : 0)
        else
            digit.frame = 0 + (this.isFlashing ? 11 : 0)
    })
    
    // update flash timer
    if(this.isFlashing) {
        this.timerFlashing -= deltaTime
        if(this.timerFlashing < 0) {
            this.isFlashing = false
            this.isFlashingDelay = true
        }
    } else if(this.isFlashingDelay) {
        this.timerFlashingDelay -= deltaTime
        if(this.timerFlashingDelay < 0) {
            this.isFlashingDelay = false
        }
    }
}

GuiNumbers.prototype.flash = function(time = 0.5, delay = 0.0) {
    if(this.isFlashing || this.isFlashingDelay) return
    this.isFlashing = true
    this.timerFlashing = time
    this.timerFlashingDelay = time
}
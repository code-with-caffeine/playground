class Viewport{
    constructor(canvas){
        this.canvas = canvas
        this.srt = canvas.getContext('2d')
        this.zoom = 1
        this.center = new Point(canvas.width/2, canvas.height/2)
        this.offset = scale(this.center, -1)
        this.drag = {
            start: new Point(0,0),
            end: new Point(0,0),
            offset: new Point(0,0),
            active: false
        }
        this.#attachListeners()
    }
    reset(){
        this.srt.restore()
        this.srt.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.srt.save()
        this.srt.translate(this.center.x ,this.center.y)
        this.srt.scale(1/this.zoom, 1/this.zoom)
        var offset = this.getOffset()
        this.srt.translate(offset.x,offset.y)
    }
    getMouse(e, SubDrgOff = false){
        const p = new Point(
            (e.offsetX-this.center.x)*this.zoom - this.offset.x,
            (e.offsetY-this.center.y)*this.zoom - this.offset.y
        )
        return SubDrgOff? subtract(p, this.drag.offset): p
    }
    getOffset(){
        return add(this.offset, this.drag.offset)
    }
    #attachListeners(){
        this.canvas.addEventListener('mousewheel', this.#handleMouseWheel.bind(this))
        this.canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this))
        this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))
        this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))
    }
    #handleMouseDown(e){
        if(e.button == 1){
            e.preventDefault()
            this.drag.start = this.getMouse(e)
            this.drag.active = true
        }
    }
    #handleMouseUp(e){
        if(this.drag.active){
            this.offset = add(this.offset, this.drag.offset)
            this.drag = {
                start: new Point(0,0),
                end: new Point(0,0),
                offset: new Point(0,0),
                active: false
            }
        }
    }
    #handleMouseMove(e){
        if(this.drag.active){
            this.drag.end = this.getMouse(e)
            this.drag.offset = subtract(this.drag.end, this.drag.start)
        }
    }

    #handleMouseWheel(e){
        const dir = Math.sign(e.deltaY)
        const step = 0.1
        this.zoom += dir*step
        this.zoom = Math.max(1, Math.min(5, this.zoom))
    }
}
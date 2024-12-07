class Editor{
    constructor(viewport, graph) {
        this.viewport = viewport
        this.canvas = viewport.canvas
        this.graph = graph
        this.srt = this.canvas.getContext('2d')
        this.#attachListeners()
        this.mouse = null
        //states
        this.selected = null
        this.hovered = null
        this.dragging = false
    }
    dispose(){
        this.graph.dispose()
        this.selected = null
        this.hovered = null
    }
    #attachListeners(){
        this.canvas.addEventListener('mousedown', (e) =>{
            if(e.button==2){
                if(this.hovered)
                    this.#removePoint(this.hovered)
                else{
                    this.selected = null
                }
            }
            if(e.button==0){
                if(this.hovered){
                    if(this.selected){
                        this.graph.addSegment(
                            new Segment(this.selected, this.hovered)
                        )
                    }
                    this.selected = this.hovered
                    this.dragging = true
                    return
                }
                this.graph.addPoint(this.mousePoint)

                this.selected = this.mousePoint
                this.hovered = this.mousePoint
                
            }
        })
        this.canvas.addEventListener('mousemove', (e) =>{
            this.mousePoint = this.viewport.getMouse(e, true)
            this.hovered = getNearestPoint(this.mousePoint, this.graph.points, 10*this.viewport.zoom)
            if(this.dragging){
                this.selected.x = this.mousePoint.x
                this.selected.y = this.mousePoint.y
            }
            // if(this.selected){
            //     this.graph.addSegment(
            //         new Segment(this.selected, this.mousePoint)
            //     )
            // }
            //secret 3d recipie 😉
            // if(this.hovered){
            //     this.graph.addSegment(
            //         new Segment(this.selected, this.mousePoint)
            //     )
            // }
        })
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })
        this.canvas.addEventListener('mouseup', () => {
            this.dragging = false
        })
    }
    #removePoint(point){
        this.graph.removePoint(point)
        this.hovered = null
        if(this.selected == point)
            this.selected = null
    }
    display(){
        // this.srt.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.graph.draw(this.srt)
        if(this.selected){
            const intent = this.hovered?this.hovered:this.mousePoint
            new Segment(this.selected, intent).draw(srt, {dash: [3,3]})
            this.selected.draw(this.srt, {outline: true})
        }
        if(this.hovered){
            this.hovered.draw(this.srt, {fill: true})
        }
    }
}
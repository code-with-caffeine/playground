class Graph{
    constructor(points = [], segments = []){
        this.segments = segments
        this.points = points
    }
    static load(info){
        const points = info.points.map((i) => new Point(i.x, i.y))
        const segments = info.segments.map((i) => new Segment(
            points.find((p) => p.equals(i.p1)),
            points.find((p) => p.equals(i.p2))

        ))
        return new Graph(points, segments)
    }
    dispose(){
        this.segments = []
        this.points = []
    }
    addPoint(point){
        if(!this.containsPoint(point)){
            this.points.push(point)
        }
    }
    removePoint(point){
        this.segments.forEach(seg => {
            if(seg.p1 == point || seg.p2 == point)
                this.segments.splice(this.segments.indexOf(seg), 1)
        })
        if(this.containsPoint(point)){
            this.points.splice(this.points.indexOf(point), 1)
        }
    }
    containsSegment(segment){
        return this.segments.find((s) => s.equals(segment))
    }
    addSegment(segment){
        if (!this.containsSegment(segment)) {
            this.segments.push(segment)
            return true
        } else {
            return false            
        }
    }
    containsPoint(point){
        return this.points.find((p) => p.equals(point))
    }

    draw(srt){
        this.segments.forEach(seg =>{
            if(seg) seg.draw(srt)
        })
        this.points.forEach(point => {
            if(point) point.draw(srt)
        })
    }
}
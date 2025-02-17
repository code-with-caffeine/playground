class Segment{
    constructor(p1,p2){
        this.p1 = p1
        this.p2 = p2
    }
    equals(segment){
        return this.includes(segment.p1) && this.includes(segment.p2)
    }
    includes(point){
        return this.p1.equals(point) || this.p2.equals(point)
    }
    draw(srt, {width = 2, color = 'black', dash = []} = {}){
        srt.beginPath()
        srt.strokeStyle = color
        srt.lineWidth = width
        srt.setLineDash(dash)
        srt.moveTo(this.p1.x, this.p1.y)
        srt.lineTo(this.p2.x, this.p2.y)
        srt.stroke()
        srt.setLineDash([])
    }
}
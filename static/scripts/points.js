class Point{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    equals(point){
        return (this.x == point.x && this.y == point.y)
    }
    draw(srt,  {rad = 10, color = 'black', outline = false, fill=false} = {}){
        srt.beginPath()
        srt.arc(this.x, this.y, rad, 0, 2*Math.PI)
        srt.fillStyle = color
        srt.fill()
        if(outline){
            srt.beginPath()
            srt.lineWidth = 3.5
            srt.strokeStyle = 'Yellow'
            srt.arc(this.x, this.y, rad*0.6, 0, 2*Math.PI)
            srt.stroke()
        }
        if(fill){
            srt.beginPath()
            srt.fillStyle = 'Yellow'
            srt.arc(this.x, this.y, rad*0.6, 0, 2*Math.PI)
            srt.fill()
        }
    }
}
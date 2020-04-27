var canvas = document.querySelector('canvas')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

var c = canvas.getContext('2d')

// Rectangle
// c.fillStyle = "rgba(255, 0, 0, 0.5)"
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = "rgba(0, 0, 255, 0.5)"
// c.fillRect(500, 100, 100, 100)
// c.fillStyle = "rgba(0, 255, 0, 0.5)"
// c.fillRect(300, 300, 100, 100)

// // Line
// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(300, 50)
// c.lineTo(400, 100)
// c.lineTo(500, 400)
// c.strokeStyle = "rgba(255, 0, 100, 0.4)"
// c.stroke()

// // Arc/Circle
// let a = []
// for(var i = 0; i < 100; i++) {
// 	// Randomize location
// 	let x 	 = Math.random() * window.innerWidth
// 	let y 	 = Math.random() * window.innerHeight
// 	c.beginPath()
// 	c.arc(x, y, 30, Math.PI * 2, false)
// 	// Randomize color
// 	let red = Math.random() * 255
// 	let green = Math.random() * 255
// 	let blue = Math.random() * 255
// 	c.strokeStyle = 'rgba('+red+', '+blue+', '+green+')'
// 	c.stroke()
// 	// Save to array
// 	let o = {'red': red, 'blue': blue, 'green': green}
// 	a.push(o)
// }

// console.log(a)
function Circle(x, y, dx, dy, size) {
	this.x 		= x		// X coordinate
	this.y 		= y		// Y coordinate
	this.dx 	= dx	// X velocity
	this.dy 	= dy	// Y velocity
	this.size 	= size	// Radius

	// Draws 
	this.draw = () => {
		c.beginPath()
		c.arc(this.x, this.y, size, Math.PI * 2, false)
		c.strokeStyle = 'blue'
		c.stroke()
	}

	// Changes circles place by its velocity
	this.update = () => {
		if(this.x+this.size > canvas.width || this.x-this.size < 0) {
			this.dx = -this.dx
		}
		if(this.y+this.size > canvas.height || this.y-this.size < 0) {
			this.dy = -this.dy
		} 
		this.x += this.dx
		this.y += this.dy
		
		this.draw()
	}

	
}

// Array for circles
var circles = []

// Create 100 circles with random velocities and coordinates
for(let i = 0; i < 100; i++) {
	let size = 30
	let x = Math.random() * (canvas.width-size*2)+size
	let y = Math.random() * (canvas.height-size*2)+size
	let dx = (Math.random() - 0.5) * 10
	let dy = (Math.random() - 0.5) * 10

	circles.push(new Circle(x, y, dx, dy, size))
}
//console.log(circles)

function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)
	for(var i = 0; i < circles.length; i++) {
		circles[i].update()
	}
	
}
animate()
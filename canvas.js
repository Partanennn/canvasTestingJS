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


var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', (e) => {
	mouse.x = e.x
	mouse.y = e.y
	//console.log(mouse)
})
function Circle(x, y, dx, dy, radius) {
	this.x 		= x		// X coordinate
	this.y 		= y		// Y coordinate
	this.dx 	= dx	// X velocity
	this.dy 	= dy	// Y velocity
	this.radius = radius	// Radius

	// Draws 
	this.draw = () => {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
		c.strokeStyle = 'blue'
		c.stroke()
		c.fill()
	}

	// Changes circles place by its velocity
	this.update = () => {
		// Change x velocity of circle if it hits x edge of the canvas
		if(this.x+this.radius > canvas.width || this.x-this.radius < 0) {
			this.dx = -this.dx
		}
		// Change y velocity of circle if it hits y edge of the canvas
		if(this.y+this.radius > canvas.height || this.y-this.radius < 0) {
			this.dy = -this.dy
		}
		// Velocity "logic"
		this.x += this.dx
		this.y += this.dy
		
		// If circle is closer than 50 pixels of mouse then
		// grow its radius by 1 pixel to max of 100
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
		   mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if(this.radius < 100) {
				this.radius += 1
			}
		} 
		// If circle goes farther than 50 pixels from mouse
		// then shrink it by 1 pixel back to 30 pixel radius
		else {
			if(this.radius > 30) {
				this.radius -= 1
			}
		}
		
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
	let dx = (Math.random() - 0.5) * 5
	let dy = (Math.random() - 0.5) * 5

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
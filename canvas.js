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

window.addEventListener('mousemove', (e) => {
	mouse.x = e.x
	mouse.y = e.y
	//console.log(mouse)
})

window.addEventListener('resize', (e) => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
})

var mouse = {
	x: undefined,
	y: undefined
}

// Settings/conf for circles
let circlesAmount = 1000
let maxRadius 	  = 60
let minRadius 	  = 5
let size 		  = 10
let speed 		  = 3
let growSpeed     =	5 // How fast circles change size

// Color array for circles
var colorArray = [
	'#9C4AFF',
	'#8C43E6',
	'#7638C2',
	'#5E2C99',
	'#492378'
]

function Circle(x, y, dx, dy, radius) {
	this.x 			= x			// X coordinate
	this.y 			= y			// Y coordinate
	this.dx 		= dx		// X velocity
	this.dy 		= dy		// Y velocity
	this.radius 	= radius	// Radius
	this.minRadius 	= radius	// Minimum radius, the size it has been created with
	this.color  	= colorArray[Math.floor(Math.random() * colorArray.length)]

	// Draws 
	this.draw = () => {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
		c.fillStyle = this.color
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
			// If radius size is not going to be more than maxRadius,
			// then add growSpeed value to radius.
			// Else set radius to maxRadius
			if(this.radius+growSpeed < maxRadius) {
				this.radius += growSpeed
			} else {
				this.radius = maxRadius
			}
		} 
		// If circle goes farther than 50 pixels from mouse
		// then shrink it by 1 pixel back to 30 pixel radius
		else {
			// If radius size is not going to be less than minRadius,
			// then reduse radius by growSpeed value.
			// Else set radius to be the original radius
			if(this.radius-growSpeed > this.minRadius) {
				this.radius -= growSpeed
			} else {
				this.radius = this.minRadius
			}
		}
		
		this.draw()
	}

	
}

// Array for circles
var circles = []

// Create 100 circles with random velocities and coordinates
for(let i = 0; i < circlesAmount; i++) {
	let x 		= Math.random() * (canvas.width-size*2)+size
	let y 		= Math.random() * (canvas.height-size*2)+size
	let dx 		= (Math.random() - 0.5) * speed
	let dy 		= (Math.random() - 0.5) * speed
	let rndSize = Math.random() * size + minRadius

	circles.push(new Circle(x, y, dx, dy, rndSize))
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
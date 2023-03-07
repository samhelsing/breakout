    const grid = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const blockWidth = 100
    const blockHeight = 20
    class Block{
        constructor(xAxis, Yaxis){
            this.bottomLeft = [xAxis, Yaxis],
            this.bottomRight = [xAxis + blockWidth, Yaxis],
            this.topLeft = [xAxis, Yaxis+blockHeight]
            this.topRight = [xAxis+blockWidth, Yaxis+blockHeight]
        }
    }


    const blocks =[
        new Block(10, 270),
        new Block(120, 270),
        new Block(230, 270),
        new Block(340, 270),
        new Block(450, 270),

        new Block(10, 240),
        new Block(120, 240),
        new Block(230, 240),
        new Block(340, 240),
        new Block(450, 240),

        new Block(10, 210),
        new Block(120, 210),
        new Block(230, 210),
        new Block(340, 210),
        new Block(450, 210),
    ]

    const userStart = [230, 10]
    let currentPosition = userStart
    const boardWidth = 560
    const boardHeight = 300
    const ballCurrentPosition = [270, 40]
    let ballStart = ballCurrentPosition
    let timerId
    const ballDiameter = 20
    let xDirection = 2
    let yDirection =2
    let score = 0

    //add blocks
    function addBlocks(){
        for(let i=0; i<blocks.length; i++){
            const block = document.createElement('div')
            block.classList.add('block')
            block.style.left = blocks[i].bottomLeft[0] + 'px'
            block.style.bottom = blocks[i].bottomLeft[1] + 'px'
            grid.appendChild(block)
    }}
    addBlocks()

   
    const user = document.createElement('div')
    user.classList.add('user')
    drawuser()
    grid.appendChild(user)


    //draw user block
    function drawuser(){
        user.style.left = currentPosition[0] + 'px'
        user.style.bottom = currentPosition[1] + 'px'
        }
        //drawball
        function drawBall(){
            ball.style.left = ballStart[0] + 'px'
            ball.style.bottom = ballStart[1] + 'px'
        }
        //move user
    function userMove(e){
        switch(e.key){
            case 'ArrowRight' :
                if(currentPosition[0] < boardWidth - blockWidth){
                    currentPosition[0] += 10
                    drawuser()
                    
                }
                break;
            case 'ArrowLeft' :
                if(currentPosition[0] > 0){
                    currentPosition[0] -= 10
                    drawuser()

                }
                break;



        }
    }

    document.addEventListener('keydown', userMove)


    const ball = document.createElement('div')
    ball.classList.add('ball')
    drawBall()
    grid.appendChild(ball)

    //move ball
    function moveBall(){
       ballCurrentPosition[0] += xDirection
       ballCurrentPosition[1] +=yDirection
       drawBall()
       checkCollision()
    }
     timerId = setInterval(moveBall, 20)

    //check collision
    function checkCollision(){

         //check for block collision
         for (let i = 0; i < blocks.length; i++){
            if
            (
                (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
                ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
            ){
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[i].classList.remove('block')
                blocks.splice(i, 1)
                changeDirection()
                score++
                scoreDisplay.innerHTML = score
                if(blocks.length == 0){
                    scoreDisplay.innerHTML = 'you win'
                    clearInterval(timerId)
                    document.removeEventListener('keydown', userMove)
                }
                        
                    }
    }
    //check for wall hits
        if(
            ballCurrentPosition[0] >= (boardWidth-ballDiameter) ||
            ballCurrentPosition[1] >=(boardHeight-ballDiameter) ||
            ballCurrentPosition[0] <= 0            
            ){
            changeDirection()

        }
        

       
    //check user collision

    if
    (
       (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1]> currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        )
        {
         changeDirection()
    }
    
    //check for gamerover
        if(ballCurrentPosition[1] <=0){
            clearInterval(timerId, userMove)
            scoreDisplay.innerHTML = 'gamerover'
        }
}

    // changeDirectio

    function changeDirection(){
        if(xDirection === 2 && yDirection === 2){
            yDirection = -2
            return
        }

        if(xDirection === 2 && yDirection === -2){
            xDirection = -2
            return
        }

        if(xDirection === -2 && yDirection === -2){
            yDirection = 2
            return
        }

        if(xDirection === -2 && yDirection === 2){
            xDirection = 2
            return
        }
    }
    

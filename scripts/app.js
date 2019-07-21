// Function loads the game when the window is open
function init() {

  // Playing grid variables
  const instructions = document.querySelectorAll('p, h3')
  const grid = document.querySelector('.grid')
  const width = 7
  let squares = []
  let circles = []
  let columnZero = []
  let columnOne = []
  let columnTwo = []
  let columnThree = []
  let columnFour = []
  let columnFive = []
  let columnSix = []
  let columns = [columnZero, columnOne, columnTwo, columnThree, columnFour, columnFive, columnSix ]
  let playedCircles = []

  // 1 or 2 player mode variables
  const onePlayer = document.querySelector('#one-player')
  const twoPlayer = document.querySelector('#two-player')
  let onePlayerMode = false
  let playSquidward = true
  let playerSpongebob = true

  // Variables that control the score
  const scoreBoard = document.querySelector('#score-board')
  const spanSpongebob = document.querySelector('#spongebob-score')
  const spanSquidward = document.querySelector('#squidward-score')
  let scoreSpongebob = 0
  let scoreSquidward = 0

  // Reset bottons selectors
  const resetButton = document.querySelector('#reset-one-player')
  const resetButtonTwo = document.querySelector('#reset-two-player')

  // Function that pushes each circle into the right column array
  function createCol(circle, circleIndex) {
    for(let i = 0; i <= columns.length; i++) {
      const column = columns[i]
      if(circleIndex % width === i) {
        column.push(circle)
      }
    }
  }

  // Function that highlights a column's circles yellow when you hover over the top circle
  function highlightCol(circleChosen) {
    for(let i = 0; i < columns.length; i++) {
      const column = columns[i]
      if(column.includes(circleChosen)) {
        column.forEach(gridCircle => {
          gridCircle.classList.add('grid-circle-highlighted')
        })
      }
    }
  }

  // Function that removes the highlights on columns when cursor moves away
  function removeHighlightCol() {
    let i = 0
    while(i < columns.length) {
      columns[i].forEach(gridCircle => {
        gridCircle.classList.remove('grid-circle-highlighted')
      })
      i++
    }
  }

  // Event listeners on the top circles for when you hover over them
  function hoverChoices(circlesChoice) {
    // adding event listeners to the top row
    circlesChoice.forEach(circleChosen => circleChosen.addEventListener('mouseenter', () => {
      circleChosen.classList.add('spongebob')
      highlightCol(circleChosen)
    }))
    circlesChoice.forEach(circleChosen => circleChosen.addEventListener('mouseleave', () => {
      removeHighlightCol()
      circleChosen.classList.remove('spongebob')
    }))
  }

  // Event listeners on the top circles for when you hover over them (for the two player mode)
  function hoverChoicesTwo(circlesChoice) {
    // adding event listeners to the top row
    circlesChoice.forEach(circleChosen => circleChosen.addEventListener('mouseenter', () => {
      circleChosen.classList.add('two-player-hover')
      highlightCol(circleChosen)
    }))
    circlesChoice.forEach(circleChosen => circleChosen.addEventListener('mouseleave', () => {
      removeHighlightCol()
      circleChosen.classList.remove('two-player-hover')
    }))
  }

  // Function that hides the hoverable top row when player wins or looses so that they are forced to restart the game
  function stopHoverChoices() {
    const circlesChoice = document.querySelectorAll('.grid-choice-circle')
    circlesChoice.forEach(circleChosen => circleChosen.style.visibility = 'hidden')
  }

  // Function that increases Spongebob's score
  function addSpongebob() {
    scoreSpongebob =  scoreSpongebob + 1
    spanSpongebob.innerHTML = scoreSpongebob
  }

  // Function that increases Squidward's score
  function addSquidward() {
    scoreSquidward = scoreSquidward + 1
    spanSquidward.innerHTML = scoreSquidward
  }

  // Function evoked every time the spongebob plays, to check if the player has 4 in a line)
  function checkForWin(player) {

    const inCheckCircle = playedCircles[0]
    const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'))
    const lCircle = circles[pickedIndex - 1]
    const llCircle = circles[pickedIndex - 2]
    const lllCircle = circles[pickedIndex - 3]
    const rCircle = circles[pickedIndex + 1]
    const rrCircle = circles[pickedIndex + 2]
    const rrrCircle = circles[pickedIndex + 3]
    const bCircle = circles[pickedIndex + width]
    const bbCircle = circles[pickedIndex + width * 2]
    const bbbCircle = circles[pickedIndex + width * 3]
    const blCircle = circles[pickedIndex - 1 + width]
    const blblCircle = circles[pickedIndex - 2 + width * 2]
    const blblblCircle = circles[pickedIndex - 3 + width * 3]
    const brCircle = circles[pickedIndex + 1 + width]
    const brbrCircle = circles[pickedIndex + 2 + width * 2]
    const brbrbrCircle = circles[pickedIndex + 3 + width * 3]
    const leftArray = [lCircle, llCircle, lllCircle]
    const rightArray = [rCircle, rrCircle, rrrCircle]
    const bottomArray = [bCircle, bbCircle, bbbCircle]
    const bottomRightArray = [brCircle, brbrCircle, brbrbrCircle]
    const bottomLeftArray = [blCircle, blblCircle, blblblCircle]
    const arrays = [leftArray, rightArray, bottomArray, bottomRightArray, bottomLeftArray]

    let winningClass = ''
    if (player === 'spongebob') {
      winningClass = 'winning-circles'
    } else {
      winningClass = 'loosing-circles'
    }

    for (let i=0; i < arrays.length; i++) {
      if(arrays[i][0] !== undefined && arrays[i][0].classList.contains(player)) {
        if(arrays[i][1] !== undefined && arrays[i][1].classList.contains(player)) {
          if (arrays[i][2] !== undefined && arrays[i][2].classList.contains(player)) {
            inCheckCircle.classList.add(winningClass)
            arrays[i][0].classList.add(winningClass)
            arrays[i][1].classList.add(winningClass)
            arrays[i][2].classList.add(winningClass)
            if (player === 'spongebob') {
              playSquidward = false
              addSpongebob()
            } else {
              addSquidward()
            }
            stopHoverChoices()
          }
        }
      }
    }
  }

  // Event listener on the top circles for when you click on them and spongebob appears at the bottom on the lowest available circle in playerx1 mode
  function playChoice(circle, circleIndex) {
    circle.addEventListener('click', () => {

      let availableZero = columnZero.length - 1
      let availableOne = columnOne.length - 1
      let availableTwo = columnTwo.length - 1
      let availableThree = columnThree.length - 1
      let availableFour = columnFour.length - 1
      let availableFive = columnFive.length - 1
      let availableSix = columnSix.length - 1

      // Functions that place Squidward in the indicated column
      function playColumn(n) {
        const availableArray = [availableZero, availableOne, availableTwo, availableThree, availableFour, availableFive, availableSix]

        const column = columns[n]
        const available = availableArray[n]
        column[available].classList.add('squidward')
        playedCircles.unshift(column[available])
        checkForWin('squidward')
        column.pop()
        availableArray[n] = column.length - 1
      }

      // Functions that define the hierarchy of choice as to where squidward should be placed based on spongebob's last move
      function check(hierarchyArray) {
        const availableArray = [availableZero, availableOne, availableTwo, availableThree, availableFour, availableFive, availableSix]
        let optionsLeft = 6
        for (let i = 0; i < hierarchyArray; i++) {
          if (availableArray[i] > 0) {
            playColumn(i)
          } else {
            optionsLeft -= 1
          }
        }
        if (optionsLeft === 0) {
          addSquidward()
          addSpongebob()
          stopHoverChoices()
        }
      }
      function checkFromColumnZero() {
        const hierarchyArray = [1,2,3,4,5,6]
        check(hierarchyArray)
      }
      function checkFromColumnOne() {
        const hierarchyArray = [0,2,3,4,5,6]
        check(hierarchyArray)
      }
      function checkFromColumnTwo() {
        const hierarchyArray = [1,3,0,4,5,6]
        check(hierarchyArray)
      }
      function checkFromColumnThree() {
        const hierarchyArray = [2,4,1,5,0,6]
        check(hierarchyArray)
      }
      function checkFromColumnFour() {
        const hierarchyArray = [3,5,2,6,1,0]
        check(hierarchyArray)
      }
      function checkFromColumnFive() {
        const hierarchyArray = [6,4,3,2,1,0]
        check(hierarchyArray)
      }
      function checkFromColumnSix() {
        const hierarchyArray = [5,4,3,2,1,0]
        check(hierarchyArray)
      }

      function defendThreeV(inCheckCircle, array, n) {
        if (array[0] !== undefined && array[0].classList.contains('spongebob')) {
          if (array[1] !== undefined && array[1].classList.contains('spongebob')) {
            playColumn(n)
            inCheckCircle.classList.add('connect-three')
            array[0].classList.add('connect-three')
            array[1].classList.add('connect-three')
            playSquidward = false
          }
        } else {
          playSquidward = true
        }
      }

      function defendTwoV(circle, n) {
        if (playSquidward) {
          if (circle !== undefined && circle.classList.contains('spongebob')) {
            playColumn(n)
            playSquidward = false
          } else {
            playSquidward = true
          }
        }
      }

      // Functions that defend each column horizontally and vertically
      function defendColumnZero() {
        const inCheckCircle = playedCircles[0]
        const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'))
        const bCircle = circles[pickedIndex + width]
        const bbCircle = circles[pickedIndex + width * 2]

        //  Defende vertically if 3 in a column
        defendThreeV(inCheckCircle, [bCircle, bbCircle], 0)

        //  Defende vertically if 2 in a column
        defendTwoV(bCircle, 0)
      }

      function defendColumnOne() {
        const inCheckCircle = playedCircles[0]
        const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'))
        const lCircle = circles[pickedIndex - 1]
        const rCircle = circles[pickedIndex + 1]
        const rrCircle = circles[pickedIndex + 2]
        const bCircle = circles[pickedIndex + width]
        const bbCircle = circles[pickedIndex + width * 2]
        const blCircle = circles[pickedIndex + width - 1]
        const brCircle = circles[pickedIndex + width + 1]
        const brbrCircle = circles[pickedIndex + width * 2 + 2]
        const tlCircle = circles[pickedIndex - width - 1]

        // Defend if there 3 in a row on the right hand side (horizontally)
        if(!lCircle.classList.contains('spongebob') || !lCircle.classList.contains('squidward')) {
          if(blCircle === undefined || blCircle.classList.contains('spongebob') || blCircle.classList.contains('squidward')) {
            if (rCircle.classList.contains('spongebob') && rrCircle.classList.contains('spongebob')) {
              playColumn(0)
              inCheckCircle.classList.add('connect-three')
              rCircle.classList.add('connect-three')
              rrCircle.classList.add('connect-three')
              playSquidward = false
            }
          }
        } else {
          playSquidward = true
        }

        // Defend if 3 in a column vertically
        defendThreeV(inCheckCircle, [bCircle, bbCircle], 1)

        // Defend if 3 in a row diagonally (bottom right)
        if (playSquidward) {
          if (brCircle && brbrCircle) {
            if (!tlCircle.classList.contains('spongebob') || !tlCircle.classList.contains('squidward')) {
              if (lCircle.classList.contains('spongebob') || lCircle.classList.contains('squidward')) {
                if (brCircle.classList.contains('spongebob') && brbrCircle.classList.contains('spongebob')) {
                  playColumn(0)
                  inCheckCircle.classList.add('connect-three')
                  bCircle.classList.add('connect-three')
                  bbCircle.classList.add('connect-three')
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 2 in a row on the right hand side (horizontally)
        if(playSquidward) {
          if(!lCircle.classList.contains('spongebob') || !lCircle.classList.contains('squidward')) {
            if(blCircle === undefined || blCircle.classList.contains('spongebob') || blCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob')) {
                playColumn(0)
                playSquidward = false
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if 2 in a column vertically
        defendTwoV(bCircle, 1)
      }

      function defendColumnTwo() {
        const inCheckCircle = playedCircles[0]
        const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'))
        const lCircle = circles[pickedIndex - 1]
        const llCircle = circles[pickedIndex - 2]
        const rCircle = circles[pickedIndex + 1]
        const rrCircle = circles[pickedIndex + 2]
        const bCircle = circles[pickedIndex + width]
        const bbCircle = circles[pickedIndex + width * 2]
        const blCircle = circles[pickedIndex - 1 + width]
        const blblCircle = circles[pickedIndex - 2 + width * 2]
        const brCircle = circles[pickedIndex + 1 + width]
        const brbrCircle = circles[pickedIndex + width * 2 + 2]
        const tlCircle = circles[pickedIndex - width - 1]
        const trCircle = circles[pickedIndex - width + 1]

        // Defend if there 3 in a row on the left hand side (horizontally)
        if (rCircle && brCircle) {
          if(!rCircle.classList.contains('spongebob') || !rCircle.classList.contains('squidward')) {
            if(brCircle === undefined || brCircle.classList.contains('spongebob') || brCircle.classList.contains('squidward')) {
              if (lCircle.classList.contains('spongebob') && llCircle.classList.contains('spongebob')) {
                playColumn(3)
                inCheckCircle.classList.add('connect-three')
                lCircle.classList.add('connect-three')
                llCircle.classList.add('connect-three')
                playSquidward = false
              }
            }
          }
        } else {
          playSquidward = true
        }

        // Defend if there 3 in a row on the right hand side (horizontally)
        if (playSquidward) {
          if(!lCircle.classList.contains('spongebob, squidward') || !lCircle.classList.contains('squidward')) {
            if(blCircle === undefined || blCircle.classList.contains('spongebob') || blCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob') && rrCircle.classList.contains('spongebob')) {
                playColumn(1)
                inCheckCircle.classList.add('connect-three')
                rCircle.classList.add('connect-three')
                rrCircle.classList.add('connect-three')
                playSquidward = false
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend vertically if 3 in a column
        defendThreeV(inCheckCircle, [bCircle, bbCircle], 2)

        // Defend if 3 in a row diagonally (bottom right)
        if (playSquidward) {
          if (brCircle && brbrCircle) {
            if (!tlCircle.classList.contains('spongebob') || !tlCircle.classList.contains('squidward')) {
              if (lCircle.classList.contains('spongebob') || lCircle.classList.contains('squidward')) {
                if (brCircle.classList.contains('spongebob') && brbrCircle.classList.contains('spongebob')) {
                  playColumn(1)
                  inCheckCircle.classList.add('connect-three')
                  bCircle.classList.add('connect-three')
                  bbCircle.classList.add('connect-three')
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if 3 in a row diagonally (bottom left)
        if (playSquidward) {
          if (blCircle && blblCircle) {
            if (!trCircle.classList.contains('spongebob') || !trCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob') || rCircle.classList.contains('squidward')) {
                if (blCircle.classList.contains('spongebob') && blblCircle.classList.contains('spongebob')) {
                  playColumn(3)
                  inCheckCircle.classList.add('connect-three')
                  bCircle.classList.add('connect-three')
                  bbCircle.classList.add('connect-three')
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 2 in a row on the left hand side (horizontally)
        if (playSquidward) {
          if (rCircle && brCircle) {
            if(!rCircle.classList.contains('spongebob') || !rCircle.classList.contains('squidward')) {
              if(brCircle === undefined || brCircle.classList.contains('spongebob') || brCircle.classList.contains('squidward')) {
                if (lCircle.classList.contains('spongebob')) {
                  playColumn(3)
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 2 in a row on the right hand side (horizontally)
        if (playSquidward) {
          if(!lCircle.classList.contains('spongebob, squidward') || !lCircle.classList.contains('squidward')) {
            if(blCircle === undefined || blCircle.classList.contains('spongebob') || blCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob')) {
                playColumn(1)
                playSquidward = false
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend vertically if 2 in a column
        defendTwoV(bCircle, 2)
      }

      function defendColumnThree() {
        const inCheckCircle = playedCircles[0]
        const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'))
        const lCircle = circles[pickedIndex - 1]
        const llCircle = circles[pickedIndex - 2]
        const rCircle = circles[pickedIndex + 1]
        const rrCircle = circles[pickedIndex + 2]
        const bCircle = circles[pickedIndex + width]
        const bbCircle = circles[pickedIndex + width * 2]
        const blCircle = circles[pickedIndex - 1 + width]
        const brCircle = circles[pickedIndex + 1 + width]
        const brbrCircle = circles[pickedIndex + width * 2 + 2]
        const tlCircle = circles[pickedIndex - width - 1]
        const trCircle = circles[pickedIndex - width + 1]
        const blblCircle = circles[pickedIndex - 2 + width * 2]

        // Defend if there 3 in a row on the left hand side (horizontally)
        if (rCircle !== undefined && brCircle !== undefined) {
          if(!rCircle.classList.contains('spongebob') || !rCircle.classList.contains('squidward')) {
            if(brCircle === undefined || brCircle.classList.contains('spongebob') || brCircle.classList.contains('squidward')) {
              if (lCircle.classList.contains('spongebob') && llCircle.classList.contains('spongebob')) {
                playColumn(4)
                inCheckCircle.classList.add('connect-three')
                lCircle.classList.add('connect-three')
                llCircle.classList.add('connect-three')
                playSquidward = false
              }
            }
          }
        } else {
          playSquidward = true
        }

        // Defend if there 3 in a row on the right hand side (horizontally)
        if (playSquidward) {
          if(!lCircle.classList.contains('spongebob, squidward') || !lCircle.classList.contains('squidward')) {
            if(blCircle === undefined || blCircle.classList.contains('spongebob') || blCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob') && rrCircle.classList.contains('spongebob')) {
                playColumn(2)
                inCheckCircle.classList.add('connect-three')
                rCircle.classList.add('connect-three')
                rrCircle.classList.add('connect-three')
                playSquidward = false
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend vertically if 3 in a column
        defendThreeV(inCheckCircle, [bCircle, bbCircle], 3)

        // Defend if 3 in a row diagonally (bottom right)
        if (playSquidward) {
          if (brCircle && brbrCircle) {
            if (!tlCircle.classList.contains('spongebob') || !tlCircle.classList.contains('squidward')) {
              if (lCircle.classList.contains('spongebob') || lCircle.classList.contains('squidward')) {
                if (brCircle.classList.contains('spongebob') && brbrCircle.classList.contains('spongebob')) {
                  playColumn(2)
                  inCheckCircle.classList.add('connect-three')
                  bCircle.classList.add('connect-three')
                  bbCircle.classList.add('connect-three')
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if 3 in a row diagonally (bottom left)
        if (playSquidward) {
          if (blCircle && blblCircle) {
            if (!trCircle.classList.contains('spongebob') || !trCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob') || rCircle.classList.contains('squidward')) {
                if (blCircle.classList.contains('spongebob') && blblCircle.classList.contains('spongebob')) {
                  playColumn(4)
                  inCheckCircle.classList.add('connect-three')
                  bCircle.classList.add('connect-three')
                  bbCircle.classList.add('connect-three')
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 2 in a row on the left hand side (horizontally)
        if (playSquidward) {
          if (rCircle !== undefined && brCircle !== undefined) {
            if(!rCircle.classList.contains('spongebob') || !rCircle.classList.contains('squidward')) {
              if(brCircle === undefined || brCircle.classList.contains('spongebob') || brCircle.classList.contains('squidward')) {
                if (lCircle.classList.contains('spongebob')) {
                  playColumn(4)
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 2 in a row on the right hand side (horizontally)
        if (playSquidward) {
          if(!lCircle.classList.contains('spongebob, squidward') || !lCircle.classList.contains('squidward')) {
            if(blCircle === undefined || blCircle.classList.contains('spongebob') || blCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob')) {
                playColumn(2)
                playSquidward = false
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend vertically if 2 in a column
        defendTwoV(bCircle, 3)
      }

      function defendColumnFour() {
        const inCheckCircle = playedCircles[0]
        const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'))
        const lCircle = circles[pickedIndex - 1]
        const llCircle = circles[pickedIndex - 2]
        const rCircle = circles[pickedIndex + 1]
        const rrCircle = circles[pickedIndex + 2]
        const bCircle = circles[pickedIndex + width]
        const bbCircle = circles[pickedIndex + width * 2]
        const blCircle = circles[pickedIndex - 1 + width]
        const brCircle = circles[pickedIndex + 1 + width]
        const brbrCircle = circles[pickedIndex + width * 2 + 2]
        const tlCircle = circles[pickedIndex - width - 1]
        const trCircle = circles[pickedIndex - width + 1]
        const blblCircle = circles[pickedIndex - 2 + width * 2]

        // Defend if there 3 in a row on the left hand side (horizontally)
        if(!rCircle.classList.contains('spongebob, squidward') || !rCircle.classList.contains('squidward')) {
          if(brCircle === undefined || brCircle.classList.contains('spongebob') || brCircle.classList.contains('squidward')) {
            if (lCircle.classList.contains('spongebob') && llCircle.classList.contains('spongebob')) {
              playColumn(5)
              inCheckCircle.classList.add('connect-three')
              lCircle.classList.add('connect-three')
              llCircle.classList.add('connect-three')
              playSquidward = false
            }
          }
        } else {
          playSquidward = true
        }

        // Defend if there 3 in a row on the right hand side (horizontally)
        if (playSquidward) {
          if(!lCircle.classList.contains('spongebob, squidward') || !lCircle.classList.contains('squidward')) {
            if(blCircle === undefined || blCircle.classList.contains('spongebob') || blCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob') && rrCircle.classList.contains('spongebob')) {
                playColumn(3)
                inCheckCircle.classList.add('connect-three')
                rCircle.classList.add('connect-three')
                rrCircle.classList.add('connect-three')
                playSquidward = false
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 3 in a column vertically
        defendThreeV(inCheckCircle, [bCircle, bbCircle], 4)

        // Defend if 3 in a row diagonally (bottom right)
        if (playSquidward) {
          if (brCircle && brbrCircle) {
            if (!tlCircle.classList.contains('spongebob') || !tlCircle.classList.contains('squidward')) {
              if (lCircle.classList.contains('spongebob') || lCircle.classList.contains('squidward')) {
                if (brCircle.classList.contains('spongebob') && brbrCircle.classList.contains('spongebob')) {
                  playColumn(3)
                  inCheckCircle.classList.add('connect-three')
                  bCircle.classList.add('connect-three')
                  bbCircle.classList.add('connect-three')
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if 3 in a row diagonally (bottom left)
        if (playSquidward) {
          if (blCircle && blblCircle) {
            if (!trCircle.classList.contains('spongebob') || !trCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob') || rCircle.classList.contains('squidward')) {
                if (blCircle.classList.contains('spongebob') && blblCircle.classList.contains('spongebob')) {
                  playColumn(5)
                  inCheckCircle.classList.add('connect-three')
                  bCircle.classList.add('connect-three')
                  bbCircle.classList.add('connect-three')
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 2 in a row on the left hand side (horizontally)
        if (playSquidward) {
          if(!rCircle.classList.contains('spongebob, squidward') || !rCircle.classList.contains('squidward')) {
            if(brCircle === undefined || brCircle.classList.contains('spongebob') || brCircle.classList.contains('squidward')) {
              if (lCircle.classList.contains('spongebob')) {
                playColumn(5)
                playSquidward = false
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 2 in a row on the right hand side (horizontally)
        if (playSquidward) {
          if(!lCircle.classList.contains('spongebob, squidward') || !lCircle.classList.contains('squidward')) {
            if(blCircle === undefined || blCircle.classList.contains('spongebob') || blCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob')) {
                playColumn(3)
                playSquidward = false
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 2 in a column vertically
        defendTwoV(bCircle, 4)
      }

      function defendColumnFive() {
        const inCheckCircle = playedCircles[0]
        const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'))
        const lCircle = circles[pickedIndex - 1]
        const llCircle = circles[pickedIndex - 2]
        const rCircle = circles[pickedIndex + 1]
        const bCircle = circles[pickedIndex + width]
        const bbCircle = circles[pickedIndex + width * 2]
        const brCircle = circles[pickedIndex + 1 + width]
        const trCircle = circles[pickedIndex - width + 1]
        const blCircle = circles[pickedIndex - 1 + width]
        const blblCircle = circles[pickedIndex - 2 + width * 2]

        // Defend if there 3 in a row on the left hand side (horizontally)
        if (rCircle !== undefined && brCircle !== undefined) {
          if(!rCircle.classList.contains('spongebob') || !rCircle.classList.contains('squidward')) {
            if(brCircle === undefined || brCircle.classList.contains('spongebob') || brCircle.classList.contains('squidward')) {
              if (lCircle.classList.contains('spongebob') && llCircle.classList.contains('spongebob')) {
                playColumn(6)
                inCheckCircle.classList.add('connect-three')
                lCircle.classList.add('connect-three')
                llCircle.classList.add('connect-three')
                playSquidward = false
              }
            }
          }
        } else {
          playSquidward = true
        }

        // Defend if there's three in a column vertically
        defendThreeV(inCheckCircle, [bCircle, bbCircle], 5)

        // Defend if 3 in a row diagonally (bottom left)
        if (playSquidward) {
          if (blCircle && blblCircle) {
            if (!trCircle.classList.contains('spongebob') || !trCircle.classList.contains('squidward')) {
              if (rCircle.classList.contains('spongebob') || rCircle.classList.contains('squidward')) {
                if (blCircle.classList.contains('spongebob') && blblCircle.classList.contains('spongebob')) {
                  playColumn(6)
                  inCheckCircle.classList.add('connect-three')
                  bCircle.classList.add('connect-three')
                  bbCircle.classList.add('connect-three')
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there 2 in a row on the left hand side (horizontally)
        if (playSquidward) {
          if (rCircle !== undefined && brCircle !== undefined) {
            if(!rCircle.classList.contains('spongebob') || !rCircle.classList.contains('squidward')) {
              if(brCircle === undefined || brCircle.classList.contains('spongebob') || brCircle.classList.contains('squidward')) {
                if (lCircle.classList.contains('spongebob')) {
                  playColumn(6)
                  playSquidward = false
                }
              }
            }
          } else {
            playSquidward = true
          }
        }

        // Defend if there's 2 in a column vertically
        defendTwoV(bCircle, 5)
      }

      function defendColumnSix() {
        const inCheckCircle = playedCircles[0]
        const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'))
        const bCircle = circles[pickedIndex + width]
        const bbCircle = circles[pickedIndex + width * 2]

        // Defend if there's three in a column
        defendThreeV(inCheckCircle, [bCircle, bbCircle], 6)

        // Defend if there's 2 in a column
        defendTwoV(bCircle, 6)
      }

      // if statements that control where spongebob and squidward are placed at every turn

      if (circleIndex === 0) {
        playSquidward = true
        const randomIndex = Math.round(Math.random())
        columnZero[availableZero].classList.add('spongebob')
        playedCircles.unshift(columnZero[availableZero])
        checkForWin('spongebob')
        columnZero.pop()
        availableZero = columnZero.length - 1

        if (playSquidward) {
          if (availableZero > 0) {
            defendColumnZero()
            if(playSquidward) {
              switch(randomIndex) {
                case 0:
                  playColumn(0)
                  break
                case 1:
                  if (availableOne > 0) {
                    playColumn(1)
                  } else {
                    checkFromColumnOne()
                  }
                  break
              }
            }
          } else {
            checkFromColumnZero()
          }
        }

      }

      if (circleIndex === 1) {
        playSquidward = true
        const randomIndex = Math.floor(Math.random() * 3)
        columnOne[availableOne].classList.add('spongebob')
        playedCircles.unshift(columnOne[availableOne])
        checkForWin('spongebob')
        columnOne.pop()
        availableOne = columnOne.length - 1

        if (playSquidward) {
          if (availableOne > 0) {
            defendColumnOne()
            if(playSquidward) {
              switch(randomIndex) {
                case 0:
                  if (availableZero > 0) {
                    playColumn(0)
                  } else {
                    checkFromColumnZero()
                  }
                  break
                case 1:
                  playColumn(1)
                  break
                case 2:
                  if (availableTwo > 0) {
                    playColumn(2)
                  } else {
                    checkFromColumnTwo()
                  }
                  break
              }
            }
          } else {
            checkFromColumnOne()
          }
        }

      }

      if (circleIndex === 2) {
        playSquidward = true
        const randomIndex = Math.floor(Math.random() * 3)
        columnTwo[availableTwo].classList.add('spongebob')
        playedCircles.unshift(columnTwo[availableTwo])
        checkForWin('spongebob')
        columnTwo.pop()
        availableTwo = columnTwo.length - 1

        if(playSquidward) {
          if (availableTwo > 0) {
            defendColumnTwo()
            if(playSquidward) {
              switch(randomIndex) {
                case 0:
                  if (availableOne > 0) {
                    playColumn(1)
                  } else {
                    checkFromColumnOne()
                  }
                  break
                case 1:
                  playColumn(2)
                  break
                case 2:
                  if (availableThree > 0) {
                    playColumn(3)
                  } else {
                    checkFromColumnThree()
                  }
                  break
              }
            }
          } else {
            checkFromColumnTwo()
          }
        }

      }

      if (circleIndex === 3) {
        playSquidward = true
        const randomIndex = Math.floor(Math.random() * 3)
        columnThree[availableThree].classList.add('spongebob')
        playedCircles.unshift(columnThree[availableThree])
        checkForWin('spongebob')
        columnThree.pop()
        availableThree = columnThree.length - 1

        if (playSquidward) {
          if (availableThree > 0) {
            defendColumnThree()
            if(playSquidward) {
              switch(randomIndex) {
                case 0:
                  if (availableTwo > 0) {
                    playColumn(2)
                  } else {
                    checkFromColumnTwo()
                  }
                  break
                case 1:
                  playColumn(3)
                  break
                case 2:
                  if (availableFour > 0) {
                    playColumn(4)
                  } else {
                    checkFromColumnFour()
                  }
                  break
              }
            }
          } else {
            checkFromColumnThree()
          }
        }

      }

      if (circleIndex === 4) {
        playSquidward = true
        const randomIndex = Math.floor(Math.random() * 3)
        columnFour[availableFour].classList.add('spongebob')
        playedCircles.unshift(columnFour[availableFour])
        checkForWin('spongebob')
        columnFour.pop()
        availableFour = columnFour.length - 1

        if(playSquidward) {
          if (availableFour > 0) {
            defendColumnFour()
            if(playSquidward) {
              switch(randomIndex) {
                case 0:
                  if (availableThree > 0) {
                    playColumn(3)
                  } else {
                    checkFromColumnThree()
                  }
                  break
                case 1:
                  playColumn(4)
                  break
                case 2:
                  if (availableFive > 0) {
                    playColumn(5)
                  } else {
                    checkFromColumnFive()
                  }
                  break
              }
            }
          } else {
            checkFromColumnFour()
          }
        }

      }

      if (circleIndex === 5) {
        playSquidward = true
        const randomIndex = Math.floor(Math.random() * 3)
        columnFive[availableFive].classList.add('spongebob')
        playedCircles.unshift(columnFive[availableFive])
        checkForWin('spongebob')
        columnFive.pop()
        availableFive = columnFive.length - 1

        if(playSquidward) {
          if (availableFive > 0) {
            defendColumnFive()
            if(playSquidward) {
              switch(randomIndex) {
                case 0:
                  if (columnFour > 0) {
                    playColumn(4)
                  } else {
                    checkFromColumnFour()
                  }
                  break
                case 1:
                  playColumn(5)
                  break
                case 2:
                  if (columnSix > 0) {
                    playColumn(6)
                  } else {
                    checkFromColumnSix()
                  }
                  break
              }
            }
          } else {
            checkFromColumnFive()
          }
        }

      }

      if (circleIndex === 6) {
        playSquidward = true
        const randomIndex = Math.round(Math.random())
        columnSix[availableSix].classList.add('spongebob')
        playedCircles.unshift(columnSix[availableSix])
        checkForWin('spongebob')
        columnSix.pop()
        availableSix = columnSix.length - 1

        if(playSquidward) {
          if (availableSix > 0) {
            defendColumnSix()
            if(playSquidward) {
              switch(randomIndex) {
                case 0:
                  if (availableFive > 0) {
                    playColumn(5)
                  } else {
                    checkFromColumnFive()
                  }
                  break
                case 1:
                  playColumn(6)
                  break
              }
            }
          } else {
            checkFromColumnSix()
          }
        }
      }
    })
  }

  // Event listener on the top circles for when you click on them and spongebob appears at the bottom on the lowest available circle in playerx2 mode
  function playChoiceTwo(circle, circleIndex) {
    circle.addEventListener('click', () => {
      const availableZero = columnZero.length - 1
      const availableOne = columnOne.length - 1
      const availableTwo = columnTwo.length - 1
      const availableThree = columnThree.length - 1
      const availableFour = columnFour.length - 1
      const availableFive = columnFive.length - 1
      const availableSix = columnSix.length - 1
      const availableArray = [availableZero, availableOne, availableTwo, availableThree, availableFour, availableFive, availableSix]
      playerSpongebob = !playerSpongebob

      for (let i = 0; i < availableArray.length; i++) {
        const column = columns[i]
        let available = availableArray[i]
        if(circleIndex === i) {
          if(playerSpongebob) {
            column[available].classList.add('spongebob')
            playedCircles.unshift(column[available])
            checkForWin('spongebob')
          } else {
            column[available].classList.add('squidward')
            playedCircles.unshift(column[available])
            checkForWin('squidward')
          }
          column.pop()
          available = column.length - 1
        }
      }
    })
  }

  // Function that creates the hoverable top row to make choices (the if statement checks which mode the play is in and creates a different row accordingly)
  function createTopRow(circle, circleIndex) {
    if (circleIndex < width) {
      circle.classList.remove('grid-circle')
      circle.classList.add('grid-choice-circle')
      const circlesChoice = document.querySelectorAll('.grid-choice-circle')
      if (onePlayerMode) {
        hoverChoices(circlesChoice)
        playChoice(circle, circleIndex)
      } else {
        hoverChoicesTwo(circlesChoice)
        playChoiceTwo(circle, circleIndex)
      }
    }
  }

  // Function that initiates the playing board: the FOR LOOP is used to build each square as many times as the width
  function createBoard() {
    for (var i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      const circle = document.createElement('div')
      square.classList.add('grid-square')
      square.style.display = 'block'
      circle.classList.add('grid-circle')
      circle.style.display = 'block'
      circle.setAttribute('data-id', i)
      const circleIndex = parseInt(circle.getAttribute('data-id'))
      squares.push(square)
      circles.push(circle)
      grid.appendChild(square)
      square.appendChild(circle)
      createCol(circle, circleIndex)
      createTopRow(circle, circleIndex)
    }
  }

  // Function that clears the board, used when the game is reset
  function clearBoard() {
    playedCircles.forEach(playedCircle => {
      playedCircle.classList.remove('spongebob')
      playedCircle.classList.remove('squidward')
      playedCircle.classList.remove('winning-circles')
      playedCircle.classList.remove('loosing-circles')
    })
    squares = []
    circles = []
    columnZero = []
    columnOne = []
    columnTwo = []
    columnThree = []
    columnFour = []
    columnFive = []
    columnSix = []
    columns = [columnZero, columnOne, columnTwo, columnThree, columnFour, columnFive, columnSix ]
    playedCircles = []
    grid.innerHTML = ''
    createBoard()
  }

  // Functions that clears the instructions screen
  function clearInstructions() {
    onePlayer.style.display = 'none'
    twoPlayer.style.display = 'none'
    instructions.forEach(instruction => instruction.style.display = 'none')
    scoreBoard.style.visibility = 'visible'
    resetButton.style.visibility = 'visible'
    resetButtonTwo.style.visibility = 'visible'
    const sound = document.querySelector('audio')
    sound.play()
    createBoard()
  }

  // Event listener that creates the board, used when the game is started with one player vs computer
  onePlayer.addEventListener('click', () => {
    onePlayerMode = true
    clearInstructions()
  })

  // Event listener that creates the board, used when the game is started with two players
  twoPlayer.addEventListener('click', () => {
    onePlayerMode = false
    clearInstructions()
  })

  // Event listener on the reset bottom which clears the board and creates a new game (score is kept the same, it does not refresh everytime)
  resetButton.addEventListener('click', () => {
    onePlayerMode = true
    clearBoard()
  })

  // Event listener on the reset bottom which clears the board and creates a new game (score is kept the same, it does not refresh everytime)
  resetButtonTwo.addEventListener('click', () => {
    onePlayerMode = false
    clearBoard()
  })

}

window.addEventListener('DOMContentLoaded', init)

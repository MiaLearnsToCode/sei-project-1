// player = !player

const width = 7
const squares = []
const circles = []


function init() {
  const startButton = document.querySelector('#start-button')
  const instructions = document.querySelectorAll('p, h3')
  const grid = document.querySelector('.grid')

  let columnZero = []
  let columnOne = []
  let columnTwo = []
  let columnThree = []
  let columnFour = []
  let columnFive = []
  let columnSix = []
  const playedCircles = []

  // Create the 7 columns
  function createCol(circle, circleIndex) {
    if (circleIndex % width === 0) {
      columnZero.push(circle)
    } else if ((circleIndex - 1) % width === 0) {
      columnOne.push(circle)
    } else if ((circleIndex - 2) % width === 0) {
      columnTwo.push(circle)
    } else if ((circleIndex - 3) % width === 0) {
      columnThree.push(circle)
    } else if ((circleIndex - 4) % width === 0) {
      columnFour.push(circle)
    } else if ((circleIndex - 5) % width === 0) {
      columnFive.push(circle)
    } else if ((circleIndex - 6) % width === 0) {
      columnSix.push(circle)
    }
  }

  // Function that highlights columns yellow when you hover over the top circle
  function highlightCol(circleChosen) {
    if (columnZero.includes(circleChosen)) {
      columnZero.forEach(columnZeroItem => {
        columnZeroItem.classList.add('grid-circle-highlighted')
      })
    } else if (columnOne.includes(circleChosen)) {
      columnOne.forEach(columnOneItem => {
        columnOneItem.classList.add('grid-circle-highlighted')
      })
    } else if (columnTwo.includes(circleChosen)) {
      columnTwo.forEach(columnTwoItem => {
        columnTwoItem.classList.add('grid-circle-highlighted')
      })
    } else if (columnThree.includes(circleChosen)) {
      columnThree.forEach(columnThreeItem => {
        columnThreeItem.classList.add('grid-circle-highlighted')
      })
    } else if (columnFour.includes(circleChosen)) {
      columnFour.forEach(columnFourItem => {
        columnFourItem.classList.add('grid-circle-highlighted')
      })
    } else if (columnFive.includes(circleChosen)) {
      columnFive.forEach(columnFiveItem => {
        columnFiveItem.classList.add('grid-circle-highlighted')
      })
    } else if (columnSix.includes(circleChosen)) {
      columnSix.forEach(columnSixItem => {
        columnSixItem.classList.add('grid-circle-highlighted')
      })
    }
  }
  // Function that removes the highlights on columns when cursor moves away
  function removeHighlightCol() {
    columnZero.forEach(columnZeroItem => {
      columnZeroItem.classList.remove('grid-circle-highlighted')
    })
    columnOne.forEach(columnOneItem => {
      columnOneItem.classList.remove('grid-circle-highlighted')
    })
    columnTwo.forEach(columnTwoItem => {
      columnTwoItem.classList.remove('grid-circle-highlighted')
    })
    columnThree.forEach(columnThreeItem => {
      columnThreeItem.classList.remove('grid-circle-highlighted')
    })
    columnFour.forEach(columnFourItem => {
      columnFourItem.classList.remove('grid-circle-highlighted')
    })
    columnFive.forEach(columnFiveItem => {
      columnFiveItem.classList.remove('grid-circle-highlighted')
    })
    columnSix.forEach(columnSixItem => {
      columnSixItem.classList.remove('grid-circle-highlighted')
    })
  }
  // Event listeners on the top circles for when you hover over them
  function hoverChoices(circlesChoice) {
    // adding event listeners to the top row
    circlesChoice.forEach(circleChosen => circleChosen.addEventListener('mouseenter', () => {
      circleChosen.classList.add('spongebob')
      highlightCol(circleChosen)
    }))
    circlesChoice.forEach(circleChosen => circleChosen.addEventListener('mouseleave', () => {
      removeHighlightCol(circleChosen)
      circleChosen.classList.remove('spongebob')
    }))
  }

  // function computerDefendThree() {
  //   const inCheckCircle = playedCircles[0]
  //   const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'))
  //   const lCircle = circles[pickedIndex - 1]
  //   const llCircle = circles[pickedIndex - 2]
  //   const lllCircle = circles[pickedIndex - 3]
  //   console.log(pickedIndex)
  //   const rCircle = circles[pickedIndex + 1]
  //   const rrCircle = circles[pickedIndex + 2]
  //   const rrrCircle = circles[pickedIndex + 3]
  //   const bCircle = circles[pickedIndex + width]
  //   const bbCircle = circles[pickedIndex + width * 2]
  //   const bbbCircle = circles[pickedIndex + width * 3]
  //   const blCircle = circles[pickedIndex - 1 + width]
  //   const blblCircle = circles[pickedIndex - 2 + width * 2]
  //   const blblblCircle = circles[pickedIndex - 3 + width * 3]
  //   const brCircle = circles[pickedIndex - 1 - width]
  //   const brbrCircle = circles[pickedIndex - 2 - width * 2]
  //   const brbrbrCircle = circles[pickedIndex - 3 - width * 3]
  //
  //   if (lllCircle === undefined && lCircle !== undefined && llCircle !== undefined) {
  //     if (lCircle.classList.contains('spongebob')) {
  //       if (llCircle.classList.contains('spongebob')) {
  //         lllCircle.classList.add('squidward')
  //         console.log('L')
  //         console.log(lllCircle)
  //       }
  //     }
  //   }
  //
  //   if (rrrCircle === undefined && rCircle !== undefined && rrCircle !== undefined) {
  //     if (rCircle.classList.contains('spongebob')) {
  //       if (rrCircle.classList.contains('spongebob')) {
  //         rrrCircle.classList.add('squidward')
  //         console.log('R')
  //         console.log(rrrCircle)
  //       }
  //     }
  //   }
  //
  //   if (bbbCircle === undefined && bCircle !== undefined && bbCircle !== undefined) {
  //     if (bCircle.classList.contains('spongebob')) {
  //       if (bbCircle.classList.contains('spongebob')) {
  //         bbbCircle.classList.add('squidward')
  //         console.log('B')
  //         console.log(bbbCircle)
  //       }
  //     }
  //   }
  //
  //   if (blblblCircle === undefined && blCircle !== undefined && blblCircle !== undefined) {
  //     if (blCircle.classList.contains('spongebob')) {
  //       if (blblCircle.classList.contains('spongebob')) {
  //         blblblCircle.classList.add('squidward')
  //         console.log('B')
  //         console.log(blblblCircle)
  //       }
  //     }
  //   }
  //
  //   if (brbrbrCircle === undefined && brCircle !== undefined && brbrCircle !== undefined) {
  //     if (brCircle.classList.contains('spongebob')) {
  //       if (brbrCircle.classList.contains('spongebob')) {
  //         brbrbrCircle.classList.add('squidward')
  //         console.log('B')
  //         console.log(brbrbrCircle)
  //       }
  //     }
  //   }
  // }



  function checkForWin() {
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
    console.log(brCircle)
    if (lCircle !== undefined && lCircle.classList.contains('spongebob')) {
      if (llCircle !== undefined && llCircle.classList.contains('spongebob')) {
        if (lllCircle !== undefined && lllCircle.classList.contains('spongebob')) {
          console.log('You win!')
          inCheckCircle.classList.add('winning-circles')
          lCircle.classList.add('winning-circles')
          llCircle.classList.add('winning-circles')
          lllCircle.classList.add('winning-circles')
        }
      }
    }

    if (bCircle !== undefined && bCircle.classList.contains('spongebob')) {
      if (bbCircle !== undefined && bbCircle.classList.contains('spongebob')) {
        if (bbbCircle !== undefined && bbbCircle.classList.contains('spongebob')) {
          console.log('You win!')
          inCheckCircle.classList.add('winning-circles')
          bCircle.classList.add('winning-circles')
          bbCircle.classList.add('winning-circles')
          bbbCircle.classList.add('winning-circles')
        }
      }
    }

    if (rCircle !== undefined && rCircle.classList.contains('spongebob')) {
      if (rrCircle !== undefined && rrCircle.classList.contains('spongebob')) {
        if (rrrCircle !== undefined && rrrCircle.classList.contains('spongebob')) {
          console.log('You win!')
          inCheckCircle.classList.add('winning-circles')
          rCircle.classList.add('winning-circles')
          rrCircle.classList.add('winning-circles')
          rrrCircle.classList.add('winning-circles')
        }
      }
    }

    if (brCircle !== undefined && brCircle.classList.contains('spongebob')) {
      if (brbrCircle !== undefined && brbrCircle.classList.contains('spongebob')) {
        if (brbrbrCircle !== undefined && brbrbrCircle.classList.contains('spongebob')) {
          console.log('You win!')
          inCheckCircle.classList.add('winning-circles')
          brCircle.classList.add('winning-circles')
          brbrCircle.classList.add('winning-circles')
          brbrbrCircle.classList.add('winning-circles')
          console.log(brCircle)
          console.log(brbrCircle)
          console.log(brbrbrCircle)
        }
      }
    }
    if (blCircle !== undefined && blCircle.classList.contains('spongebob')) {
      if (blblCircle !== undefined && blblCircle.classList.contains('spongebob')) {
        if (blblblCircle !== undefined && blblblCircle.classList.contains('spongebob')) {
          console.log('You win!')
          inCheckCircle.classList.add('winning-circles')
          blCircle.classList.add('winning-circles')
          blblCircle.classList.add('winning-circles')
          blblblCircle.classList.add('winning-circles')
        }
      }
    }
  }


  function checkForLost() {
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

    if (lCircle !== undefined && lCircle.classList.contains('squidward')) {
      if (llCircle !== undefined && llCircle.classList.contains('squidward')) {
        if (lllCircle !== undefined && lllCircle.classList.contains('squidward')) {
          console.log('You lost!')
          inCheckCircle.classList.add('loosing-circles')
          lCircle.classList.add('loosing-circles')
          llCircle.classList.add('loosing-circles')
          lllCircle.classList.add('loosing-circles')
        }
      }
    }

    if (bCircle !== undefined && bCircle.classList.contains('squidward')) {
      if (bbCircle !== undefined && bbCircle.classList.contains('squidward')) {
        if (bbbCircle !== undefined && bbbCircle.classList.contains('squidward')) {
          console.log('You lost!')
          inCheckCircle.classList.add('loosing-circles')
          bCircle.classList.add('loosing-circles')
          bbCircle.classList.add('loosing-circles')
          bbbCircle.classList.add('loosing-circles')
        }
      }
    }


    if (rCircle !== undefined && rCircle.classList.contains('squidward')) {
      if (rrCircle !== undefined && rrCircle.classList.contains('squidward')) {
        if (rrrCircle !== undefined && rrrCircle.classList.contains('squidward')) {
          console.log('You lost!')
          inCheckCircle.classList.add('loosing-circles')
          rCircle.classList.add('loosing-circles')
          rrCircle.classList.add('loosing-circles')
          rrrCircle.classList.add('loosing-circles')
        }
      }
    }

    if (brCircle !== undefined && brCircle.classList.contains('squidward')) {
      if (brbrCircle !== undefined && brbrCircle.classList.contains('squidward')) {
        if (brbrbrCircle !== undefined && brbrbrCircle.classList.contains('squidward')) {
          console.log('You lost!')
          inCheckCircle.classList.add('loosing-circles')
          brCircle.classList.add('loosing-circles')
          brbrCircle.classList.add('loosing-circles')
          brbrbrCircle.classList.add('loosing-circles')
        }
      }
    }
    if (blCircle !== undefined && blCircle.classList.contains('squidward')) {
      if (blblCircle !== undefined && blblCircle.classList.contains('squidward')) {
        if (blblblCircle !== undefined && blblblCircle.classList.contains('squidward')) {
          console.log('You lost!')
          inCheckCircle.classList.add('loosing-circles')
          blCircle.classList.add('loosing-circles')
          blblCircle.classList.add('loosing-circles')
          blblblCircle.classList.add('loosing-circles')
        }
      }
    }
  }

  // Event listener on the top circles for when you click on them and spongebob appears at the bottom on the lowest available circle
  function playChoice(circle, circleIndex) {
    circle.addEventListener('click', () => {
      let availableZero = columnZero.length - 1
      let availableOne = columnOne.length - 1
      let availableTwo = columnTwo.length - 1
      let availableThree = columnThree.length - 1
      let availableFour = columnFour.length - 1
      let availableFive = columnFive.length - 1
      let availableSix = columnSix.length - 1

      function playColumnZero() {
        columnZero[availableZero].classList.add('squidward')
        playedCircles.unshift(columnZero[availableZero])
        checkForLost()
        columnZero.pop()
      }

      function playColumnOne() {
        columnZero[availableZero].classList.add('squidward')
        playedCircles.unshift(columnZero[availableZero])
        checkForLost()
        columnOne.pop()
      }

      function playColumnTwo() {
        columnTwo[availableTwo].classList.add('squidward')
        playedCircles.unshift(columnTwo[availableTwo])
        checkForLost()
        columnTwo.pop()
      }

      function playColumnThree() {
        columnThree[availableThree].classList.add('squidward')
        playedCircles.unshift(columnThree[availableThree])
        checkForLost()
        columnThree.pop()
      }

      function playColumnFour() {
        columnFour[availableFour].classList.add('squidward')
        playedCircles.unshift(columnFour[availableFour])
        checkForLost()
        columnFour.pop()
      }

      function playColumnFive() {
        columnFive[availableFive].classList.add('squidward')
        playedCircles.unshift(columnFive[availableFive])
        checkForLost()
        columnFive.pop()
      }

      function playColumnSix() {
        columnSix[availableSix].classList.add('squidward')
        playedCircles.unshift(columnSix[availableSix])
        checkForLost()
        columnSix.pop()
      }

      function checkFromColumnZero() {
        if (availableOne > 0) {
          playColumnOne()
        } else if (availableTwo > 0) {
          playColumnTwo()
        } else if (availableThree > 0) {
          playColumnThree()
        } else if (availableFour > 0) {
          playColumnFour()
        } else if (availableFive > 0) {
          playColumnFive()
        } else if (availableSix > 0) {
          playColumnSix()
        } else {
          console.log('You draw!')
        }
      }

      function checkFromColumnOne() {
        if (availableZero > 0) {
          playColumnZero()
        } else if (availableTwo > 0) {
          playColumnTwo()
        } else if (availableThree > 0) {
          playColumnThree()
        } else if (availableFour > 0) {
          playColumnFour()
        } else if (availableFive > 0) {
          playColumnFive()
        } else if (availableSix > 0) {
          playColumnSix()
        } else {
          console.log('You draw!')
        }
      }

      function checkFromColumnTwo() {
        if (availableOne > 0) {
          playColumnOne()
        } else if (availableThree > 0) {
          playColumnThree()
        } else if (availableZero > 0) {
          playColumnZero()
        }  else if (availableFour > 0) {
          playColumnFour()
          columnZero = []
        } else if (availableFive > 0) {
          playColumnFive()
        } else if (availableSix > 0) {
          playColumnSix()
        } else {
          console.log('You draw!')
        }
      }

      function checkFromColumnThree() {
        if (availableTwo > 0) {
          playColumnTwo()
        } else if (availableFour > 0) {
          playColumnFour()
        } else if (availableOne > 0) {
          playColumnOne()
        }  else if (availableFive > 0) {
          playColumnFive()
        } else if (availableZero > 0) {
          playColumnZero()
        } else if (availableSix > 0) {
          playColumnSix()
        } else {
          console.log('You draw!')
        }
      }

      function checkFromColumnFour() {
        if (availableThree > 0) {
          playColumnThree()
        } else if (availableFive > 0) {
          playColumnFive()
        } else if (availableTwo > 0) {
          playColumnTwo()
        }  else if (availableSix > 0) {
          playColumnSix()
        } else if (availableOne > 0) {
          playColumnOne()
        } else if (availableZero > 0) {
          playColumnZero()
        } else {
          console.log('You draw!')
        }
      }

      function checkFromColumnFive() {
        if (availableSix > 0) {
          playColumnSix()
        } else if (availableFour > 0) {
          playColumnFour()
        } else if (availableThree > 0) {
          playColumnThree()
        }  else if (availableTwo > 0) {
          playColumnTwo()
        } else if (availableOne > 0) {
          playColumnOne()
        } else if (availableZero > 0) {
          playColumnZero()
        } else {
          console.log('You draw!')
        }
      }

      function checkFromColumnSix() {
        if (availableFive > 0) {
          playColumnFive()
        } else if (availableFour > 0) {
          playColumnFour()
        }  else if (availableThree > 0) {
          playColumnThree()
        } else if (availableTwo > 0) {
          playColumnTwo()
        } else if (availableOne > 0) {
          playColumnOne()
        } else if (availableZero > 0) {
          playColumnZero()
        } else {
          console.log('You draw!')
        }
      }

      if (circleIndex === 0) {
        const randomIndex = Math.round(Math.random())
        columnZero[availableZero].classList.add('spongebob')
        playedCircles.unshift(columnZero[availableZero])
        checkForWin()
        columnZero.pop()
        availableZero = columnZero.length - 1
        if (availableZero === 0) {
          columnZero = []
          checkFromColumnZero()
        } else {
          switch(randomIndex) {
            case 0:
              columnZero[availableZero].classList.add('squidward')
              playedCircles.unshift(columnZero[availableZero])
              checkForLost()
              columnZero.pop()
              break
            case 1:
              if (availableOne > 0) {
                columnOne[availableOne].classList.add('squidward')
                playedCircles.unshift(columnOne[availableOne])
                checkForLost()
                columnOne.pop()
              } else {
                checkFromColumnZero()
              }
              break
          }
        }
      }

      if (circleIndex === 1) {
        const randomIndex = Math.floor(Math.random() * 3)
        columnOne[availableOne].classList.add('spongebob')
        playedCircles.unshift(columnOne[availableOne])
        checkForWin()
        columnOne.pop()
        availableOne = columnOne.length - 1
        if (availableOne === 0) {
          columnOne = []
          checkFromColumnOne()
        } else {
          switch(randomIndex) {
            case 0:
              if (availableZero > 0) {
                columnZero[availableZero].classList.add('squidward')
                playedCircles.unshift(columnZero[availableZero])
                checkForLost()
                columnZero.pop()
              } else {
                checkFromColumnOne()
              }
              break
            case 1:
              columnOne[availableOne].classList.add('squidward')
              playedCircles.unshift(columnOne[availableOne])
              checkForLost()
              columnOne.pop()
              break
            case 2:
              if (availableTwo > 0) {
                columnTwo[availableTwo].classList.add('squidward')
                playedCircles.unshift(columnTwo[availableTwo])
                checkForLost()
                columnTwo.pop()
              } else {
                checkFromColumnOne()
              }
              break
          }
        }
      }
      if (circleIndex === 2) {
        const randomIndex = Math.floor(Math.random() * 3)
        columnTwo[availableTwo].classList.add('spongebob')
        playedCircles.unshift(columnTwo[availableTwo])
        checkForWin()
        columnTwo.pop()
        availableTwo = columnTwo.length - 1
        if (availableTwo === 0) {
          columnTwo = []
          checkFromColumnTwo()
        } else {
          switch(randomIndex) {
            case 0:
              if (availableOne > 0) {
                columnOne[availableOne].classList.add('squidward')
                playedCircles.unshift(columnOne[availableOne])
                checkForLost()
                columnOne.pop()
              } else {
                checkFromColumnTwo()
              }
              break
            case 1:
              columnTwo[availableTwo].classList.add('squidward')
              playedCircles.unshift(columnTwo[availableTwo])
              checkForLost()
              columnTwo.pop()
              break
            case 2:
              if (availableThree > 0) {
                columnThree[availableThree].classList.add('squidward')
                playedCircles.unshift(columnThree[availableThree])
                checkForLost()
                columnThree.pop()
              } else {
                checkFromColumnTwo()
              }
              break
          }
        }
      }
      if (circleIndex === 3) {
        const randomIndex = Math.floor(Math.random() * 3)
        columnThree[availableThree].classList.add('spongebob')
        playedCircles.unshift(columnThree[availableThree])
        checkForWin()
        columnThree.pop()
        availableThree = columnThree.length - 1
        if (availableThree === 0) {
          columnThree = []
          checkFromColumnThree()
        } else {
          switch(randomIndex) {
            case 0:
              if (availableTwo > 0) {
                columnTwo[availableTwo].classList.add('squidward')
                playedCircles.unshift(columnTwo[availableTwo])
                checkForLost()
                columnTwo.pop()
              } else {
                checkFromColumnThree()
              }
              break
            case 1:
              columnThree[availableThree].classList.add('squidward')
              playedCircles.unshift(columnThree[availableThree])
              checkForLost()
              columnThree.pop()
              break
            case 2:
              if (availableFour > 0) {
                columnFour[availableFour].classList.add('squidward')
                playedCircles.unshift(columnFour[availableFour])
                checkForLost()
                columnFour.pop()
              } else {
                checkFromColumnThree()
              }
              break
          }
        }
      }
      if (circleIndex === 4) {
        const randomIndex = Math.floor(Math.random() * 3)
        columnFour[availableFour].classList.add('spongebob')
        playedCircles.unshift(columnFour[availableFour])
        checkForWin()
        columnFour.pop()
        availableFour = columnFour.length - 1
        if (availableFour === 0) {
          columnFour = []
          checkFromColumnFour()
        } else {
          switch(randomIndex) {
            case 0:
              if (availableThree > 0) {
                columnThree[availableThree].classList.add('squidward')
                playedCircles.unshift(columnThree[availableThree])
                checkForLost()
                columnThree.pop()
              } else {
                checkFromColumnFour()
              }
              break
            case 1:
              columnFour[availableFour].classList.add('squidward')
              playedCircles.unshift(columnFour[availableFour])
              checkForLost()
              columnFour.pop()
              break
            case 2:
              if (availableFive > 0) {
                columnFive[availableFive].classList.add('squidward')
                playedCircles.unshift(columnFive[availableFive])
                checkForLost()
                columnFive.pop()
              } else {
                checkFromColumnFour()
              }
              break
          }
        }
      }
      if (circleIndex === 5) {
        const randomIndex = Math.floor(Math.random() * 3)
        columnFive[availableFive].classList.add('spongebob')
        playedCircles.unshift(columnFive[availableFive])
        checkForWin()
        columnFive.pop()
        availableFive = columnFive.length - 1
        if (availableFive === 0) {
          columnFive = []
          checkFromColumnFive()
        } else {
          switch(randomIndex) {
            case 0:
              if (columnFour > 0) {
                columnFour[availableFour].classList.add('squidward')
                playedCircles.unshift(columnFour[availableFour])
                checkForLost()
                columnFour.pop()
              } else {
                checkFromColumnFive()
              }
              break
            case 1:
              columnFive[availableFive].classList.add('squidward')
              playedCircles.unshift(columnFive[availableFive])
              checkForLost()
              columnFive.pop()
              break
            case 2:
              if (columnSix > 0) {
                columnSix[availableSix].classList.add('squidward')
                playedCircles.unshift(columnSix[availableSix])
                checkForLost()
                columnSix.pop()
              } else {
                checkFromColumnFive()
              }
              break
          }
        }
      }

      if (circleIndex === 6) {
        const randomIndex = Math.round(Math.random())
        columnSix[availableSix].classList.add('spongebob')
        playedCircles.unshift(columnSix[availableSix])
        checkForWin()
        columnSix.pop()
        availableSix = columnSix.length - 1
        if (availableSix === 0) {
          columnSix = []
          checkFromColumnSix()
        } else {
          switch(randomIndex) {
            case 0:
              if (availableFive > 0) {
                columnFive[availableFive].classList.add('squidward')
                playedCircles.unshift(columnFive[availableFive])
                checkForLost()
                columnFive.pop()
              } else {
                checkFromColumnSix()
              }
              break
            case 1:
              columnSix[availableSix].classList.add('squidward')
              playedCircles.unshift(columnSix[availableSix])
              checkForLost()
              columnSix.pop()
              break
          }
        }
      }
    })
  }


  function createTopRow(circle, circleIndex) {
    if (circleIndex < width) {
      circle.classList.remove('grid-circle')
      circle.classList.add('grid-choice-circle')
      const circlesChoice = document.querySelectorAll('.grid-choice-circle')
      hoverChoices(circlesChoice)
      playChoice(circle, circleIndex)
    }
  }

  // FOR LOOP to build each square as many times as the width
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

  startButton.addEventListener('click', () => {
    startButton.style.display = 'none'
    instructions.forEach(instruction => instruction.style.display = 'none')
    createBoard()
  })
}

window.addEventListener('DOMContentLoaded', init)

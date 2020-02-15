module AngularMovement.Asteroids exposing (main)

import Playground exposing (..)
import Set

main =
  game view update
    { angle =
      0
    , position =
      (0, 0)
    , speed =
      5
    }


view computer { angle, position } =
  let
    (x, y) =
      position
  in
  [ group
    [ polygon darkGrey [ (-20, -30), (20, -30), (0, 30) ]
    , rectangle darkGrey 10 10
      |> moveDown 30
      |> moveLeft 10
    , rectangle darkGrey 10 10
      |> moveDown 30
      |> moveRight 10
    ]
    |> rotate angle
    |> move x y
  ]

update computer model =
  let
    speed =
      if Set.member "z" computer.keyboard.keys then
        model.speed * 1.5
      else
        model.speed
    theta =
      degrees (model.angle + 90)
    (x, y) =
      model.position
    dx =
      speed * cos theta
    dy =
      speed * sin theta
    r =
      30
    newX =
      if x < computer.screen.left - r then
        computer.screen.right + r
      else if x > computer.screen.right + r then
        computer.screen.left - r
      else
        x + dx
    newY =
      if y < computer.screen.bottom - r then
        computer.screen.top + r
      else if y > computer.screen.top + r then
        computer.screen.bottom - r
      else
        y + dy
    
  in
  { model |
    angle =
      if computer.keyboard.left then
        model.angle + 2
      else if computer.keyboard.right then
        model.angle - 2
      else
        model.angle
    , position =
      ( newX, newY )
  }

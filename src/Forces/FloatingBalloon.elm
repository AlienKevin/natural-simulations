module Forces.FloatingBalloon exposing (..)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import Time
import Math.Vector2 as Vector2 exposing (Vec2)

type alias Model =
  { mass : Float
  , position : Vec2
  , velocity : Vec2
  , acceleration : Vec2
  , width : Float
  , height : Float
  }

type Msg
  = Move Time.Posix

width : Float
width =
  600


height : Float
height =
  600


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


init : () -> (Model, Cmd Msg)
init _ =
  ( { mass = 1
  , position = Vector2.vec2 (width / 2) (height - 100)
  , velocity = Vector2.vec2 0 0
  , acceleration = Vector2.vec2 0 0
  , width = 70
  , height = 100
  }
  , Cmd.none
  )
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    [ border
    , balloon model.width model.height model.position
    ]


border =
  Svg.rect
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.noFill
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


balloon : Float -> Float -> Vec2 -> Svg Msg
balloon w h p =
  let
    {x, y} =
      Vector2.toRecord p
  in
  Svg.g []
  [ Svg.ellipse
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.rx (px <| w / 2)
    , Attributes.ry (px <| h / 2)
    , Attributes.fill <| Fill Color.red
    ]
    []
  , Svg.line
    [ Attributes.x1 (px <| x)
    , Attributes.y1 (px <| y + h / 2)
    , Attributes.x2 (px <| x)
    , Attributes.y2 (px <| y + h / 2 + 100)
    , Attributes.stroke Color.black
    , Attributes.strokeWidth <| px 2
    ]
    []
  ]


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 10 Move


applyForce : Vec2 -> Float -> Vec2 -> Vec2
applyForce force mass acceleration =
  Vector2.add acceleration <| Vector2.scale (1 / mass) force


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  let
    r =
      model.height / 2
    windForce =
      Vector2.vec2 0 -0.01
    newAcceleration =
      applyForce windForce model.mass <|
        Vector2.vec2 0 0
    newVelocity =
      Vector2.toRecord <| Vector2.add model.velocity newAcceleration
    newPosition =
      Vector2.toRecord <| Vector2.add model.position <| Vector2.fromRecord newVelocity
    newX =
      if newPosition.x < r then
        r
      else if newPosition.x > width - r then
        width - r
      else
        newPosition.x
    
    newY =
      if newPosition.y < r then
        r
      else if newPosition.y > height - r then
        height - r
      else
        newPosition.y

    newXVelocity =
      if newPosition.x < r || newPosition.x > width - r then
        -1 * newVelocity.x
      else
        newVelocity.x
    
    newYVelocity =
      if newPosition.y < r || newPosition.y > height - r then
        -1 * newVelocity.y
      else
        newVelocity.y
  in
  case msg of
    Move _ ->
      ({ model |
        velocity =
          Vector2.vec2 newXVelocity newYVelocity
        , position =
          Vector2.vec2 newX newY
      }
      , Cmd.none
      )

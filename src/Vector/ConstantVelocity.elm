module Vector.ConstantVelocity exposing (..)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import Time
import Math.Vector2 as Vector2 exposing (Vec2)
import Random

type alias Model =
  { position : Vec2
  , velocity : Vec2
  , ballRadius : Float
  }

type Msg
  = Move Time.Posix
  | GetVelocity (Float, Float)

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


defaultPosition : Vec2
defaultPosition =
  Vector2.vec2 300 300


init : () -> (Model, Cmd Msg)
init _ =
  ( { position = defaultPosition
  , velocity = Vector2.vec2 0 0
  , ballRadius = 20
  }
  , randomVelocity
  )
  

randomVelocity =
  let
    randomComponent =
      Random.float -2 2
  in
  
  Random.generate GetVelocity <| Random.pair randomComponent randomComponent


view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    [ border
    , point model.ballRadius model.position
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


point : Float -> Vec2 -> Svg Msg
point radius position =
  let
    {x, y} =
      Vector2.toRecord position
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px radius)
    , Attributes.fill <| Fill Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 10 Move

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  let
    r =
      model.ballRadius
    newPosition =
      Vector2.toRecord <| Vector2.add model.position model.velocity
    newX =
      if newPosition.x <= -r then
        width + r
      else if newPosition.x >= width + r then
        -r
      else
        newPosition.x
    
    newY =
      if newPosition.y <= -r then
        height + r
      else if newPosition.y >= height + r then
        -r
      else
        newPosition.y
  in
  case msg of
    Move _ ->
      ({ model |
        position =
          Vector2.vec2 newX newY
      }
      , Cmd.none
      )
    GetVelocity (vx, vy) ->
      ({ model |
        velocity =
          Vector2.vec2 vx vy
      }
      , Cmd.none)

module AngularMovement.AccelerateTowardsMouse exposing (..)

import Browser
import Browser.Events
import Json.Decode as Decode
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), Transform(..), px)
import Time
import Math.Vector2 as Vector2 exposing (Vec2)
import Basics.Extra

type alias Model =
  { position : Vec2
  , velocity : Vec2
  , angle : Float
  , mousePosition : Vec2
  , barWidth : Float
  , barHeight : Float
  }

type Msg
  = Move Time.Posix
  | GetMouseLocation Int Int

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
  , angle = 0
  , mousePosition = Vector2.vec2 0 0
  , barWidth = 20
  , barHeight = 10
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
    [ viewBorder
    , viewBar model.barWidth model.barHeight model.position model.angle
    ]


viewBorder : Svg Msg
viewBorder =
  Svg.rect
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.noFill
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


viewBar : Float -> Float -> Vec2 -> Float -> Svg Msg
viewBar w h position angle =
  let
    {x, y} =
      Vector2.toRecord position
  in
  Svg.rect
    [ Attributes.x (px 0)
    , Attributes.y (px 0)
    , Attributes.width (px w)
    , Attributes.height (px h)
    , Attributes.fill <| Fill Color.black
    , Attributes.transform
      [ Translate (x - w / 2) (y - h / 2)
      , Rotate (Basics.Extra.inDegrees angle) 0 0
      ]
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.batch
    [ Browser.Events.onAnimationFrame Move
    , Browser.Events.onMouseMove
      ( Decode.map2 GetMouseLocation
        (Decode.field "pageX" Decode.int)
        (Decode.field "pageY" Decode.int)
      )
    ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      let
        w =
          model.barWidth
        h =
          model.barHeight
        newDirection =
          Vector2.normalize <| Vector2.sub model.mousePosition model.position
        newAcceleration =
          Vector2.scale 0.5 newDirection
        newVelocity =
          limit 5 <| Vector2.add model.velocity newAcceleration
        newPosition =
          Vector2.toRecord <| Vector2.add model.position newVelocity
        newX =
          if newPosition.x <= -w then
            width + w
          else if newPosition.x >= width + w then
            -w
          else
            newPosition.x
        
        newY =
          if newPosition.y <= -h then
            height + h
          else if newPosition.y >= height + h then
            -h
          else
            newPosition.y
        newAngle =
          let
            vx =
              Vector2.getX newVelocity
            vy =
              Vector2.getY newVelocity
          in
          atan2 vy vx
      in
      ({ model |
        velocity =
          newVelocity
        , position =
          Vector2.vec2 newX newY
        , angle =
          newAngle
      }
      , Cmd.none
      )
    GetMouseLocation mx my ->
      ({ model |
        mousePosition =
          Vector2.vec2 (toFloat mx) (toFloat my)
      }
      , Cmd.none
      )


limit : Float -> Vec2 -> Vec2
limit maxMagnitude v =
  let
    magnitude =
      Vector2.length v 
  in
  if magnitude > maxMagnitude then
    Vector2.scale (maxMagnitude / magnitude) v
  else
    v


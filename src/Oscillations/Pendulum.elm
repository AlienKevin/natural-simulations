module Oscillations.Pendulum exposing (main)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), Transform(..), px)
import Time
import Math.Vector2 as Vector2 exposing (Vec2)

type alias Model =
  { position : Vec2
  , angle : Float
  , omega : Float
  , armLength : Float
  , bobRadius : Float
  , friction : Float
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
  ( { position = Vector2.vec2 0 0
  , angle = pi / 3
  , omega = 0
  , armLength = 200
  , bobRadius = 20
  , friction = 0.999
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
    , viewPendulum model
    ]


viewPendulum : Model -> Svg Msg
viewPendulum model =
  Svg.g
    [  Attributes.transform
      [ Translate (width / 2) 0
      ]
    ]
    [ viewString model.position
    , viewBall model.bobRadius model.position
    ]


border : Svg Msg
border =
  Svg.rect
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.noFill
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


viewString : Vec2 -> Svg Msg
viewString bobPosition =
  Svg.line
    [ Attributes.x1 (px 0)
    , Attributes.y1 (px 0)
    , Attributes.x2 (px <| Vector2.getX bobPosition)
    , Attributes.y2 (px <| Vector2.getY bobPosition)
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 2)
    ]
    []


viewBall : Float -> Vec2 -> Svg Msg
viewBall bobRadius bobPosition =
  Svg.circle
    [ Attributes.cx (px <| Vector2.getX bobPosition)
    , Attributes.cy (px <| Vector2.getY bobPosition)
    , Attributes.r (px bobRadius)
    , Attributes.fill <| Fill Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 10 Move

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  let
    gravity =
      0.25
    newAlpha =
      -gravity * sin model.angle / model.armLength
    newOmega =
      (model.omega + newAlpha) * model.friction
    newAngle =
      model.angle + newOmega
    newPosition =
      Vector2.vec2
        (model.armLength * sin newAngle)
        (model.armLength * cos newAngle)
  in
  case msg of
    Move _ ->
      ({ model |
        position =
          newPosition
        , angle =
          newAngle
        , omega =
          newOmega
      }
      , Cmd.none
      )

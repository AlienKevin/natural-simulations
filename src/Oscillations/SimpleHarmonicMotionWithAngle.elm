module Oscillations.SimpleHarmonicMotionWithAngle exposing (..)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), Transform(..), px)
import Time

type alias Model =
  { position : Float
  , angle : Float
  , omega : Float
  , amplitude : Float
  , ballRadius : Float
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
  ( { position = 0
  , angle = 0
  , omega = 2 * pi / 300 -- period of 300 frames or about 3 seconds on 100 fps
  , amplitude = 200
  , ballRadius = 20
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
    , viewString model.position
    , viewBall model.ballRadius model.position
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


viewString : Float -> Svg Msg
viewString ballPosition =
  Svg.line
    [ Attributes.transform
      [ Translate (width / 2) (height / 2)
      ]
    , Attributes.x1 (px 0)
    , Attributes.y1 (px 0)
    , Attributes.x2 (px ballPosition)
    , Attributes.y2 (px 0)
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 2)
    ]
    []


viewBall : Float -> Float -> Svg Msg
viewBall ballRadius ballPosition =
  Svg.circle
    [ Attributes.transform
      [ Translate (width / 2) (height / 2)
      ]
    , Attributes.cx (px ballPosition)
    , Attributes.cy (px 0)
    , Attributes.r (px ballRadius)
    , Attributes.fill <| Fill Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 10 Move

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  let
    newPosition =
      model.amplitude * sin model.angle
  in
  case msg of
    Move _ ->
      ({ model |
        position =
          newPosition
        , angle =
          model.angle + model.omega
      }
      , Cmd.none
      )

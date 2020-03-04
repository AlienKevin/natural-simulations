module Oscillations.RainbowSlinky exposing (..)

import Browser
import Browser.Events
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), Transform(..), px)
import Time
import Utils
import Chroma.Colors.Sinebow as Sinebow

type alias Model =
  { position : Float
  , time : Float
  , period : Float
  , minPosition : Float
  , amplitude : Float
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
  , time = 0
  , period = 150
  , minPosition = 80
  , amplitude = 400
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
    , viewSlinky model.position
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


viewSlinky : Float -> Svg Msg
viewSlinky endY =
  let
    ellipseCount =
      30
    spacing =
      1.6
    ellipseHeight =
      endY / ellipseCount / spacing
  in
  Svg.g
    []
    (List.map
      (\index ->
        Svg.ellipse
          [ Attributes.transform
            [ Translate (width / 2) 0
            ]
          , Attributes.cx (px 0)
          , Attributes.cy (px <| toFloat index * ellipseHeight * spacing)
          , Attributes.rx (px 30)
          , Attributes.ry (px ellipseHeight)
          , Attributes.noFill
          , Attributes.stroke <| Sinebow.getColor <| Utils.lerp 0 30 0 1 (toFloat index)
          , Attributes.strokeWidth <| px 2
          ]
          []
      )
      (List.range 0 ellipseCount)
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
  Browser.Events.onAnimationFrame Move

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  let
    newPosition =
      Utils.lerp -1 1 model.minPosition model.amplitude <| sin ( 2 * pi * model.time / model.period)
  in
  case msg of
    Move _ ->
      ({ model |
        position =
          newPosition
        , time =
          model.time + 1
      }
      , Cmd.none
      )

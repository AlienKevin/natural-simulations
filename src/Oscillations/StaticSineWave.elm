module Oscillations.StaticSineWave exposing (main)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), Transform(..), px)
import Time
import Math.Vector2 as Vector2 exposing (Vec2)
import List.Extra

type alias Model =
  { firstAngle : Float
  , positions : List Vec2
  , omega : Float
  , amplitude : Float
  , delta : Float
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
  ( { firstAngle = 0
  , positions = []
  -- 0.02 : slow
  -- 0.04 : medium
  -- 0.08 : fast
  , omega = 0.02
  , amplitude = 200
  , delta = 0.5
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
    border
    :: List.indexedMap
      (\index currPosition ->
        let
          nextPosition =
            List.Extra.getAt (index + 1) model.positions
        in
        case nextPosition of
          Nothing ->
            Svg.g [] []
          Just position ->
            viewLine currPosition position
      )
      model.positions


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


viewLine : Vec2 -> Vec2 -> Svg Msg
viewLine currPosition nextPosition =
  Svg.line
    [ Attributes.transform
      [ Translate 0 (height / 2)
      ]
    , Attributes.x1 (px <| Vector2.getX currPosition)
    , Attributes.y1 (px <| Vector2.getY currPosition)
    , Attributes.x2 (px <| Vector2.getX nextPosition)
    , Attributes.y2 (px <| Vector2.getY nextPosition)
    , Attributes.strokeWidth (px <| 2)
    , Attributes.stroke Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 10 Move

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      let
        numberOfBalls =
          width / model.delta
      in
      ( { model |
        positions =
          List.map
            (\ballIndex ->
              let
                newBallAngle =
                  model.firstAngle + toFloat ballIndex * model.omega
                newPosition =
                  Vector2.vec2
                    (toFloat ballIndex / numberOfBalls * width)
                    (model.amplitude * sin newBallAngle)
              in
              newPosition
            )
            (List.range 0 (round numberOfBalls - 1))
        }
      , Cmd.none
      )
    
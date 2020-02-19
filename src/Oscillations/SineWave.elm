module Oscillations.SineWave exposing (main)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), Transform(..), px)
import Time
import Math.Vector2 as Vector2 exposing (Vec2)
import Random

type alias Model =
  { firstAngle : Float
  , positions : List Vec2
  , omega : Float
  , amplitude : Float
  , ballRadius : Float
  , numberOfBalls : Int
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
  let
    numberOfBalls =
      24
  in
  ( { firstAngle = 0
  , positions = []
  -- 0.02 : slow
  -- 0.04 : medium
  -- 0.08 : fast
  , omega = 0.04
  , amplitude = 200
  , ballRadius = 30
  , numberOfBalls =
    numberOfBalls
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
    :: List.map
      (\position ->
        viewBall model.ballRadius position
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


viewBall : Float -> Vec2 -> Svg Msg
viewBall ballRadius ballPosition =
  Svg.circle
    [ Attributes.transform
      [ Translate 0 (height / 2)
      ]
    , Attributes.cx (px <| Vector2.getX ballPosition)
    , Attributes.cy (px <| Vector2.getY ballPosition)
    , Attributes.r (px ballRadius)
    , Attributes.fill <| Fill Color.black
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
        newFirstAngle =
          model.firstAngle + model.omega
      in
      ( { model |
        firstAngle =
          newFirstAngle
        , positions =
          List.map
            (\ballIndex ->
              let
                newBallAngle =
                  newFirstAngle + toFloat ballIndex * model.omega
                newPosition =
                  Vector2.vec2
                    (toFloat ballIndex / toFloat model.numberOfBalls * width)
                    (model.amplitude * sin newBallAngle)
              in
              newPosition
            )
            (List.range 0 (model.numberOfBalls - 1))
        }
      , Cmd.none
      )
    
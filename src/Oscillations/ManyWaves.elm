module Oscillations.ManyWaves exposing (main)

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
  { waves : List Wave
  }

type alias Wave =
  { firstAngle : Float
  , positions : List Vec2
  , omega : Float
  , amplitude : Float
  , ballRadius : Float
  , numberOfBalls : Int
  , animationSpeed : Float
  , color : Color.Color
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
  ( { waves =
    [{ firstAngle = 0
    , positions = []
    , omega = 0.08
    , amplitude = 200
    , ballRadius = 5
    , numberOfBalls = 30
    , animationSpeed = 0.070
    , color = rgb255a 49 222 153 0.5
    }
    , { firstAngle = 10
    , positions = []
    , omega = 0.075
    , amplitude = 175
    , ballRadius = 7
    , numberOfBalls = 25
    , animationSpeed = 0.055
    , color = rgb255a 222 190 49 0.5
    }
    , { firstAngle = 20
    , positions = []
    , omega = 0.07
    , amplitude = 150
    , ballRadius = 10
    , numberOfBalls = 20
    , animationSpeed = 0.045
    , color = rgb255a 222 190 49 0.5
    }
    ]
  }
  , Cmd.none
  )


rgb255a : Int -> Int -> Int -> Float -> Color.Color
rgb255a r g b a = 
  Color.rgba (toFloat r / 255) (toFloat g / 255) (toFloat b / 255) a
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    border
    :: List.map
      viewWave
      model.waves


viewWave : Wave -> Svg Msg
viewWave wave =
  Svg.g [] <|
    List.map
      (\position ->
        viewBall wave.ballRadius wave.color position
      )
      wave.positions


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


viewBall : Float -> Color.Color -> Vec2 -> Svg Msg
viewBall ballRadius ballColor ballPosition =
  Svg.circle
    [ Attributes.transform
      [ Translate 0 (height / 2)
      ]
    , Attributes.cx (px <| Vector2.getX ballPosition)
    , Attributes.cy (px <| Vector2.getY ballPosition)
    , Attributes.r (px ballRadius)
    , Attributes.fill <| Fill ballColor
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 20 Move


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      ({ model |
        waves =
          List.map
            updateWave
            model.waves
      }
      , Cmd.none
      )


updateWave : Wave -> Wave
updateWave wave =
  let
    newFirstAngle =
      wave.firstAngle + wave.animationSpeed
  in
  { wave |
    firstAngle =
      newFirstAngle
    , positions =
      List.map
        (\ballIndex ->
          let
            newBallAngle =
              newFirstAngle + toFloat ballIndex * wave.omega
            newPosition =
              Vector2.vec2
                (toFloat ballIndex / toFloat wave.numberOfBalls * width)
                (wave.amplitude * sin newBallAngle)
          in
          newPosition
        )
        (List.range 0 (wave.numberOfBalls - 1))
    }

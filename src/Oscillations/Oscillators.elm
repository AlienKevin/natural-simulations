module Oscillations.Oscillators exposing (main)

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
  { oscillators : List Oscillator
  }

type alias Oscillator =
  { position : Vec2
  , angle : Vec2
  , omega : Vec2
  , amplitude : Vec2
  , ballRadius : Float
  }

type Msg
  = Move Time.Posix
  | GetOscillators (List Oscillator)

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
  ( { oscillators = []
  }
  , Random.generate GetOscillators <|
    Random.list
      10
      ( Random.map3
        (\angle omega amplitude ->
          { position = zeroVector
          , angle = angle
          , omega = omega
          , amplitude = amplitude
          , ballRadius = 30
          }
        )
        (Random.map2 Vector2.vec2
          (Random.float 0 <| 2 * pi)
          (Random.float 0 <| 2 * pi)
        )
        (Random.map2 Vector2.vec2
          (Random.float -0.05 0.05)
          (Random.float -0.05 0.05)
        )
        (Random.map2 Vector2.vec2
          (Random.float 20 <| width / 2)
          (Random.float 20 <| width / 2)
        )
      )
  )
  

zeroVector : Vec2
zeroVector =
  Vector2.vec2 0 0


view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    border
    :: List.map
      (\o ->
        Svg.g []
          [ viewString o.position
          , viewBall o.ballRadius o.position
          ]
      )
      model.oscillators


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
viewString ballPosition =
  Svg.line
    [ Attributes.transform
      [ Translate (width / 2) (height / 2)
      ]
    , Attributes.x1 (px 0)
    , Attributes.y1 (px 0)
    , Attributes.x2 (px <| Vector2.getX ballPosition)
    , Attributes.y2 (px <| Vector2.getY ballPosition)
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 2)
    ]
    []


viewBall : Float -> Vec2 -> Svg Msg
viewBall ballRadius ballPosition =
  Svg.circle
    [ Attributes.transform
      [ Translate (width / 2) (height / 2)
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
      ( { model |
        oscillators =
          List.map
            (\o ->
              let
                newPosition =
                  Vector2.vec2
                    (Vector2.getX o.amplitude * sin (Vector2.getX o.angle))
                    (Vector2.getY o.amplitude * sin (Vector2.getY o.angle))
              in
              { o |
                position =
                  newPosition
                , angle =
                  Vector2.add o.angle o.omega
              }
            )
            model.oscillators
        }
      , Cmd.none
      )
    
    GetOscillators oscillators ->
      ({ model |
        oscillators =
          oscillators
      }
      , Cmd.none
      )

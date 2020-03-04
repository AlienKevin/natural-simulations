module AngularMovement.SpinningBaton exposing (..)

import Browser
import Browser.Events
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), Transform(..), px)
import Time

type alias Model =
  { angle : Float
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
  ( { angle = 0
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
    , viewBaton model.angle
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


viewBaton : Float -> Svg Msg
viewBaton angle =
  let
    batonRadius =
      50
    batonLength =
      batonRadius * 2
    batonThickness =
      5
    ballRadius =
      10
    centerX =
      width / 2
    centerY =
      height / 2
    leftBall =
      Svg.circle
        [ Attributes.cx (px -batonRadius)
        , Attributes.cy (px <| 0)
        , Attributes.r (px ballRadius)
        , Attributes.fill <| Fill Color.black
        ]
        []
    rightBall =
      Svg.circle
        [ Attributes.cx (px batonRadius)
        , Attributes.cy (px <| 0)
        , Attributes.r (px ballRadius)
        , Attributes.fill <| Fill Color.black
        ]
        []
    bar =
      Svg.rect
        [ Attributes.x (px -batonRadius)
        , Attributes.y (px <| -batonThickness / 2)
        , Attributes.width (px batonLength)
        , Attributes.height (px batonThickness)
        ]
        []
  in
  Svg.g
    [ Attributes.transform
      [ Translate centerX centerY
      , Rotate angle 0 0
      ]
    ]
    [ bar
    , leftBall
    , rightBall
    ]


subscriptions : Model -> Sub Msg
subscriptions _ =
  Browser.Events.onAnimationFrame Move


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      ({ model |
        angle =
          model.angle + 2
      }
      , Cmd.none
      )

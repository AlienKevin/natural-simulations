module AngularMovement.PolarSwing exposing (main)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), Transform(..), px)
import Time

-- Polar Coordinate
-- (r, theta)
type alias Polar =
  (Float, Float)

type alias Model =
  { position : Polar
  , swingRadius : Float
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


defaultPosition : Polar
defaultPosition =
  (100, 0)


init : () -> (Model, Cmd Msg)
init _ =
  ( { position = defaultPosition
  , swingRadius = 100
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


viewString : Polar -> Svg Msg
viewString ballPosition =
  let
    (r, theta) =
      ballPosition
    x =
      r * cos theta
    y =
      r * sin theta
  in
  Svg.line
    [ Attributes.transform
      [ Translate (width / 2) (height / 2)
      ]
    , Attributes.x1 (px 0)
    , Attributes.y1 (px 0)
    , Attributes.x2 (px x)
    , Attributes.y2 (px y)
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 2)
    ]
    []


viewBall : Float -> Polar -> Svg Msg
viewBall ballRadius ballPosition =
  let
    (r, theta) =
      ballPosition
    x =
      r * cos theta
    y =
      r * sin theta
  in
  Svg.circle
    [ Attributes.transform
      [ Translate (width / 2) (height / 2)
      ]
    , Attributes.cx (px x)
    , Attributes.cy (px y)
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
    (r, theta) =
      model.position
  in
  case msg of
    Move _ ->
      ({ model |
        position =
          (r, theta + 0.03)
      }
      , Cmd.none
      )

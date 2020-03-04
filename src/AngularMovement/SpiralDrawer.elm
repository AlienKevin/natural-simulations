module AngularMovement.SpiralDrawer exposing (..)

import Browser
import Browser.Events
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
  , path : List Polar
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
  (0, 0)


init : () -> (Model, Cmd Msg)
init _ =
  ( { position = defaultPosition
  , path = []
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
    , viewPath model.path
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


viewPath : List Polar -> Svg Msg
viewPath path =
  let
    positions =
      List.map
        (\position ->
          let
            (r, theta) =
              position
            x =
              r * cos theta
            y =
              r * sin theta
          in
          (x, y)
        )
        path
  in
  Svg.polyline
    [ shiftToCenter
    , Attributes.fill FillNone
    , Attributes.stroke Color.black
    , Attributes.points positions
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
    [ shiftToCenter
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
    [ shiftToCenter
    , Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px ballRadius)
    , Attributes.fill <| Fill Color.black
    ]
    []


shiftToCenter : TypedSvg.Core.Attribute msg
shiftToCenter =
   Attributes.transform
      [ Translate (width / 2) (height / 2)
      ]


subscriptions : Model -> Sub Msg
subscriptions _ =
  Browser.Events.onAnimationFrame Move

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  let
    (r, theta) =
      model.position
    newPosition =
      (r + 0.3, theta + 0.03)
  in
  case msg of
    Move _ ->
      ({ model |
        position =
          newPosition
        , path =
          newPosition :: model.path
      }
      , Cmd.none
      )

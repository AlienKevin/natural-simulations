module Vector.BouncingBall exposing (..)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import Time

type alias Position =
  (Float, Float)

type alias Model =
  { position : Position
  , xSpeed : Float
  , ySpeed : Float
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


defaultPosition : Position
defaultPosition =
  (300, 300)


init : () -> (Model, Cmd Msg)
init _ =
  ( { position = defaultPosition
  , xSpeed = 3
  , ySpeed = -1
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
    , point model.ballRadius model.position
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


point : Float -> Position -> Svg Msg
point radius position =
  let
    (x, y) =
      position
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px radius)
    , Attributes.fill <| Fill Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 10 Move

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  let
    (x, y) =
      model.position
    r = 
      model.ballRadius
    xSpeed =
      model.xSpeed
    newX =
      x + xSpeed
    newXSpeed =
      if newX <= r || newX >= width - r then
        -1 * xSpeed
      else
        xSpeed
    ySpeed =
      model.ySpeed
    newY =
      y + ySpeed
    newYSpeed =
      if newY <= r || newY >= height - r then
        -1 * ySpeed
      else
        ySpeed
  in
  case msg of
    Move _ ->
      ({ model |
        xSpeed =
          newXSpeed
        , ySpeed =
          newYSpeed
        , position =
          (newX, newY)
      }
      , Cmd.none
      )

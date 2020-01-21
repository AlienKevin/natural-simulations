module RandomWalks.Basic.Main exposing (..)

import Browser
import Color
import Html exposing (Html)
import Random
import Time
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)

type alias Position =
  (Float, Float)

type alias Model =
  { positions : List Position
  }

type Step
  = Up
  | Down
  | Left
  | Right

type Msg
  = GetStep Time.Posix
  | NewStep Step

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


stepCmd : Cmd Msg
stepCmd =
  Random.generate NewStep <| Random.uniform Up [ Down, Left, Right ]


init : () -> (Model, Cmd Msg)
init _ =
  ( { positions = [defaultPosition]
  }
  , stepCmd
  )
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px 600)
    , Attributes.height (px 600)
    , Attributes.viewBox 0 0 600 600
    ] <|
    List.map
      point
      model.positions


point : Position -> Svg Msg
point position =
  let
    (x, y) =
      position
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px 3)
    , Attributes.fill <| Fill Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 10 GetStep

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    GetStep _ ->
      ( model
      , stepCmd
      )
    NewStep step ->
      let
        (x, y) =
          Maybe.withDefault defaultPosition <| List.head model.positions
        delta =
          6
        newPosition =
          case step of
            Up ->
              (x, y + delta)
            Down ->
              (x, y - delta)
            Left ->
              (x - delta, y)
            Right ->
              (x + delta, y)
      in
      ({ model |
        positions =
          newPosition :: model.positions
      }
      , Cmd.none
      )

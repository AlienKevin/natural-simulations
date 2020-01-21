module RandomWalks.Directed.Main exposing (..)

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
  = Left
  | Middle
  | Right

type Msg
  = GetStep Time.Posix
  | NewStep (Step, Step)

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


{-| Directed to the right 
-}
stepCmd : Cmd Msg
stepCmd =
  let
    xStepGenerator =
      Random.weighted (20, Left) [ (20, Middle), (40, Right) ]
    yStepGenerator =
      Random.weighted (20, Left) [ (40, Middle), (20, Right) ]
  in
  Random.generate NewStep <| Random.pair xStepGenerator yStepGenerator


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
    NewStep (xStep, yStep) ->
      let
        (x, y) =
          Maybe.withDefault defaultPosition <| List.head model.positions
        delta =
          6
        newPosition step pos =
          case step of
            Left ->
              pos - delta
            Middle ->
              pos
            Right ->
              pos + delta
      in
      ({ model |
        positions =
          (newPosition xStep x, newPosition yStep y) :: model.positions
      }
      , Cmd.none
      )

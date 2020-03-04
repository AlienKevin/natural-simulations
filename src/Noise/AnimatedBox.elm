module Noise.AnimatedBox exposing (..)

import Browser
import Browser.Events
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import Time
import Random
import Noise.SimplexNoise as Noise

type alias Model =
  { shades : List (Position, Float)
  , time : Float
  }

type alias Position =
  (Int, Int)

type Msg
  = NextStep Time.Posix

width : Int
width =
  100

height : Int
height =
  100

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
  ( { shades = getShades 0
  , time = 0
  }
  , Cmd.none
  )

permutationTable =
  Tuple.first <| Noise.permutationTable (Random.initialSeed 42)


getShades : Float -> List (Position, Float)
getShades time =
  List.foldl
    (\row shades ->
      shades
        ++ ( List.foldl
        (\col shadesRow ->
          shadesRow ++ [ ((row, col), Noise.noise3d permutationTable (toFloat row * 0.01) (toFloat col * 0.01) time) ]
        )
        []
        <| List.range 0 width
        )
    )
    []
    <| List.range 0 height
  

view : Model -> Html msg
view model =
  Svg.svg
    [ Attributes.width (px 600)
    , Attributes.height (px 600)
    , Attributes.viewBox 0 0 600 600
    ] <|
    List.map
      point
      model.shades


point : (Position, Float) -> Svg msg
point shade =
  let
    (x, y) =
      Tuple.first shade
    s =
      Tuple.second shade
  in
  Svg.circle
    [ Attributes.cx (px <| toFloat x)
    , Attributes.cy (px <| toFloat y)
    , Attributes.r (px 1)
    , Attributes.fill <| Fill <| Color.rgb s s s
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 10 NextStep


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    NextStep _ ->
      let
        newTime =
          model.time + 0.06
      in
      ( { model |
        shades = getShades newTime
        , time = newTime
      }
      , Cmd.none
      )
  

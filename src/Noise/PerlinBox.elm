module Noise.PerlinBox exposing (..)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import Random
import Noise.SimplexNoise as Noise

type alias Model =
  { shades : List (Position, Float)
  }

type alias Position =
  (Int, Int)

width : Int
width =
  100

height : Int
height =
  100

type Msg =
  NoOp

main : Program () Model msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


init : () -> (Model, Cmd msg)
init _ =
  ( { shades = initShades
  }
  , Cmd.none
  )

permutationTable =
  Tuple.first <| Noise.permutationTable (Random.initialSeed 42)


initShades : List (Position, Float)
initShades =
  List.foldl
    (\row shades ->
      shades
        ++ ( List.foldl
        (\col shadesRow ->
          shadesRow ++ [ ((row, col), Noise.noise2d permutationTable (toFloat row * 0.01) (toFloat col * 0.01)) ]
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

subscriptions : Model -> Sub msg
subscriptions _ =
  Sub.none

update : msg -> Model -> ( Model, Cmd msg )
update msg model =
  ( model, Cmd.none)
  

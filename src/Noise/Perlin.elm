module Noise.Perlin exposing (..)

import Browser
import Color
import Html exposing (Html)
import Time
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import Random
import Noise.SimplexNoise as Noise
import Utils

type alias Model =
  { lengths : List Length
  , time : Float
  }

type alias Length =
  (Float, Float)

type Msg
  = NewLength Time.Posix

main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


permutationTable =
  Tuple.first <| Noise.permutationTable (Random.initialSeed 42)


newLength time =
  Utils.lerp -1 1 300 600 <| Noise.noise1d permutationTable time


init : () -> (Model, Cmd Msg)
init _ =
  ( { lengths = []
  , time = 0
  }
  , Cmd.none
  )
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px 600)
    , Attributes.height (px 600)
    , Attributes.viewBox 0 0 600 600
    ] <|
    List.map
      bar
      model.lengths


bar : (Float, Float) -> Svg Msg
bar (time, length) =
  Svg.rect
    [ Attributes.x (px 0)
    , Attributes.y (px <| time * 100)
    , Attributes.width (px <| length)
    , Attributes.height (px 1)
    , Attributes.fill <| Fill Color.black
    ]
    []

subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.batch
    [ Time.every 10 NewLength
    ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    NewLength _ ->
      let
        newTime =
          model.time + 0.01
      in
      ( { model |
        time = newTime
        , lengths =
          (newTime, newLength newTime) :: model.lengths
      }
      , Cmd.none
      )

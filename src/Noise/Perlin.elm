port module Noise.Perlin exposing (..)

import Browser
import Color
import Html exposing (Html)
import Time
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)

port perlin1d : Float -> Cmd msg
port getPerlin : (Float -> msg) -> Sub msg

type alias Model =
  { lengths : List Length
  , time : Float
  }

type alias Length =
  (Float, Float)

type Msg
  = GetPerlin Float
  | NewLength Time.Posix

main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


lerp : Float -> Float -> Float -> Float -> Float -> Float
lerp min1 max1 min2 max2 num =
  let
    ratio =
      abs <| num / (max1 - min1)
  in
  min2 + ratio * (max2 - min2)

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
    , getPerlin GetPerlin
    ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    GetPerlin n ->
      ({ model |
        lengths =
          (model.time, lerp 0 1 0 600 n) :: model.lengths
      }
      , Cmd.none
      )
    NewLength _ ->
      let
        newTime =
          model.time + 0.01
      in
      ( { model |
        time = newTime
      }
      , perlin1d newTime
      )

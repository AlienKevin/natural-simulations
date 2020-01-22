module Noise.PerlinWalker exposing (..)

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

type alias Model =
  { positions : List Position
  , time : (Float, Float)
  }

type alias Position =
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


newPosition (tx, ty) =
  let
    generatePosition time =
      lerp -1 1 150 450 <| Noise.noise1d permutationTable time
  in
  (generatePosition tx, generatePosition ty)

lerp : Float -> Float -> Float -> Float -> Float -> Float
lerp min1 max1 min2 max2 num =
  let
    ratio =
      abs <| (num - min1) / (max1 - min1)
  in
  min2 + ratio * (max2 - min2)

init : () -> (Model, Cmd Msg)
init _ =
  ( { positions = []
  , time = (0, 1000)
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
    , Attributes.r (px 1)
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
        (tx, ty) =
          model.time
        newTime =
          (tx + 0.01, ty + 0.01)
      in
      ( { model |
        time = newTime
        , positions =
          newPosition newTime :: model.positions
      }
      , Cmd.none
      )

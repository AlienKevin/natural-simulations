module Noise.MountainRange exposing (..)

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
import List.Extra as List

type alias Model =
  { heights : List (List (Float, Color.Color))
  }

type Msg
  = NewLength Time.Posix

width : Float
width =
  600


height : Float
height =
  600


numberOfMountains : Int
numberOfMountains =
  5


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

newHeight : Float -> Float
newHeight time =
  lerp -1 1 300 600 <| Noise.noise1d permutationTable time

lerp : Float -> Float -> Float -> Float -> Float -> Float
lerp min1 max1 min2 max2 num =
  let
    ratio =
      abs <| (num - min1) / (max1 - min1)
  in
  min2 + ratio * (max2 - min2)


createMountains : Int -> List (List (Float, Color.Color))
createMountains numberOfMtns =
  createMountainsHelper numberOfMtns 0 (round width)


createMountainsHelper : Int -> Int -> Int -> List (List (Float, Color.Color))
createMountainsHelper numberOfMtns startTime endTime =
  if numberOfMtns == 0 then
    []
  else
    let
      s =
        lerp 0 (toFloat numberOfMountains) 0 1 (toFloat numberOfMtns)
    in
    (List.map
      (\time ->
        ( newHeight (toFloat time / 100)
        , Color.rgb s s s
        )
      )
    <| List.range startTime endTime
    ) :: createMountainsHelper (numberOfMtns - 1) endTime (endTime + round width)


init : () -> (Model, Cmd Msg)
init _ =
  ( { heights = createMountains numberOfMountains
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
    background ::
    mountains model


background : Svg Msg
background =
  Svg.rect
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.fill <| Fill Color.lightBlue
    ]
    []


mountains : Model -> List (Svg Msg)
mountains model =
  List.indexedFoldl
    (\number heights mtns ->
      List.indexedMap
        (bar number)
      heights ++ mtns
    )
    []
    model.heights


bar : Int -> Int -> (Float, Color.Color) -> Svg Msg
bar mtnNumber x (length, color) =
  Svg.rect
    [ Attributes.x (px <| toFloat x)
    , Attributes.y (px <| length - toFloat mtnNumber * 50)
    , Attributes.width (px 1)
    , Attributes.height (px length)
    , Attributes.fill <| Fill color
    ]
    []

subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  (model, Cmd.none)
module Noise.RandomBox exposing (..)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import Random

type alias Model =
  { shades : List Float
  }

type Msg
  = GetRowOfShades (List Float)

width : Float
width =
  100

height : Float
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
  ( { shades = []
  }
  , getRowOfShades
  )

getRowOfShades : Cmd Msg
getRowOfShades =
  Random.generate GetRowOfShades <| Random.list (round <| width) (Random.float 0 1)
  

view : Model -> Html msg
view model =
  Svg.svg
    [ Attributes.width (px 600)
    , Attributes.height (px 600)
    , Attributes.viewBox 0 0 600 600
    ] <|
    List.indexedMap
      point
      model.shades


point : Int -> Float -> Svg msg
point position shade =
  let
    x =
      toFloat <| modBy (round width) position
    y =
      toFloat <| round <| toFloat position / width
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px 1)
    , Attributes.fill <| Fill <| Color.rgb shade shade shade
    ]
    []

subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    GetRowOfShades row ->
      let
        newShades =
          model.shades ++ row
      in
      ( { model |
        shades = newShades
        }
        , if List.length newShades >= (round <| width * height) then
          Cmd.none
        else
          getRowOfShades
      )
  

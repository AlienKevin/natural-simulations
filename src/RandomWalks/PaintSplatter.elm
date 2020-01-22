module RandomWalks.PaintSplatter exposing (..)

import Browser
import Color
import Html exposing (Html)
import Random
import Random.Float
import Time
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)

type alias Position =
  (Float, Float)

type alias Point =
  (Position, Color.Color)

type alias Model =
  { points : List Point
  }

type Msg
  = GetPoint Time.Posix
  | NewPoint (Position, List Float)

main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


defaultPoint : Point
defaultPoint =
  ((300, 300), Color.rgba 0 0 0 0)


newPointCmd : Cmd Msg
newPointCmd =
  let
    positionGenerator =
        Random.Float.normal 300 50
    colorGenerator =
        Random.list 4 (Random.float 0 1)
  in
  Random.generate NewPoint <| Random.pair (Random.pair positionGenerator positionGenerator) colorGenerator


init : () -> (Model, Cmd Msg)
init _ =
  ( { points = []
  }
  , newPointCmd
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
      model.points


point : Point -> Svg Msg
point p =
  let
    (x, y) =
      Tuple.first p
    color =
      Tuple.second p
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px 10)
    , Attributes.fill <| Fill color
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 50 GetPoint

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    GetPoint _ ->
      ( model
      , newPointCmd
      )
    NewPoint ((x, y), rgba) ->
      ({ model |
        points =
          ( (toFloat (round x), toFloat (round y)), colorFromRgba rgba ) :: model.points
      }
      , Cmd.none
      )


colorFromRgba : List Float -> Color.Color
colorFromRgba rgba =
  let
    r =
      nth 0 0 rgba
    g =
      nth 1 0 rgba
    b =
      nth 2 0 rgba
    a =
      nth 3 0 rgba
  in
  Color.rgba r g b a


nth : Int -> a -> List a -> a
nth n default list =
    if n <= 0 then
      Maybe.withDefault default <| List.head list
    else
      nth (n-1) default (Maybe.withDefault [] <| List.tail list)

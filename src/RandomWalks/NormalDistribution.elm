module RandomWalks.NormalDistribution exposing (..)

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
  Float

type alias Model =
  { positions : List Position
  }

type Msg
  = GetPosition Time.Posix
  | NewPosition Position

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
  300


stepCmd : Cmd Msg
stepCmd =
  Random.generate NewPosition <| Random.Float.normal 300 40 


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
      slab
      model.positions


point : Position -> Svg Msg
point position =
  Svg.circle
    [ Attributes.cx (px position)
    , Attributes.cy (px 300)
    , Attributes.r (px 10)
    , Attributes.fill <| Fill (Color.rgba 0 0 0 0.1)
    ]
    []


slab : Position -> Svg Msg
slab position =
  Svg.rect
    [ Attributes.x (px position)
    , Attributes.y (px 0)
    , Attributes.width (px 20)
    , Attributes.height (px 600)
    , Attributes.fill <| Fill (Color.rgba 0 0 0 0.1)
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 100 GetPosition

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    GetPosition _ ->
      ( model
      , stepCmd
      )
    NewPosition newPosition ->
      ({ model |
        positions =
          newPosition :: model.positions
      }
      , Cmd.none
      )


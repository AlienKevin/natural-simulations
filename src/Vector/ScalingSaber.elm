module Vector.ScalingSaber exposing (..)

import Browser
import Browser.Events
import Json.Decode as Decode
import Color
import Html exposing (Html)
import Math.Vector2 as Vector2 exposing (Vec2)
import TypedSvg as Svg
import TypedSvg.Attributes as Attributes
import TypedSvg.Core exposing (Svg)
import TypedSvg.Types exposing (Fill(..), px)


type alias Model =
  { saberHead : Vec2
  }


type Msg
  = Grow
  | Shrink
  | Stay


width : Float
width =
  600


height : Float
height =
  600


saberTail : Vec2
saberTail =
  Vector2.vec2 0 height


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


init : () -> ( Model, Cmd Msg )
init _ =
  ( { saberHead =
    Vector2.add saberTail <| Vector2.vec2 100 -100
  }
  , Cmd.none
  )


view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px 600)
    , Attributes.height (px 600)
    , Attributes.viewBox 0 0 600 600
    ]
  <|
    [ arrow model.saberHead ]


arrow : Vec2 -> Svg Msg
arrow head =
  Svg.line
    [ Attributes.x1 (px <| Vector2.getX head)
    , Attributes.y1 (px <| Vector2.getY head)
    , Attributes.x2 (px <| Vector2.getX saberTail)
    , Attributes.y2 (px <| Vector2.getY saberTail)
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Browser.Events.onKeyDown keyDecoder


keyDecoder : Decode.Decoder Msg
keyDecoder =
  Decode.map toMsg (Decode.field "key" Decode.string)


toMsg : String -> Msg
toMsg string =
  case string of
    "ArrowUp" ->
      Grow

    "ArrowDown" ->
      Shrink

    _ ->
      Stay


scaleSaber : Float -> Vec2 -> Vec2
scaleSaber scale saberHead =
  Vector2.add saberTail <| Vector2.scale scale <| Vector2.sub saberHead saberTail


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Grow ->
      ({ model |
        saberHead = scaleSaber 2 model.saberHead
      }
      , Cmd.none
      )
    Shrink ->
      ({ model |
        saberHead = scaleSaber 0.5 model.saberHead
      }
      , Cmd.none
      )
    Stay ->
      ( model
      , Cmd.none
      )

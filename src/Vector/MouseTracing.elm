module Vector.MouseTracing exposing (..)

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
  { mousePosition : Vec2
  }


type Msg
  = GetMouseLocation Int Int


width : Float
width =
  600


height : Float
height =
  600


center : Vec2
center =
  Vector2.vec2 (width/2) (height/2)


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
  ( { mousePosition =
    center
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
    [ arrow model.mousePosition ]


arrow : Vec2 -> Svg Msg
arrow position =
  let
    { x, y } =
      Vector2.toRecord <| position
  in
  Svg.line
    [ Attributes.x1 (px <| x)
    , Attributes.y1 (px <| y)
    , Attributes.x2 (px <| Vector2.getX center)
    , Attributes.y2 (px <| Vector2.getY center)
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Browser.Events.onMouseMove
    ( Decode.map2 GetMouseLocation
      (Decode.field "pageX" Decode.int)
      (Decode.field "pageY" Decode.int)
    )



update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    GetMouseLocation x y ->
      ({ model |
        mousePosition = Vector2.vec2 (toFloat x) (toFloat y)
      }
      , Cmd.none
      )

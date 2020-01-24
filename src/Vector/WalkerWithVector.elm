module Vector.WalkerWithVector exposing (..)

import Browser
import Color
import Html exposing (Html)
import Math.Vector2 as Vector2 exposing (Vec2)
import Random
import Time
import TypedSvg as Svg
import TypedSvg.Attributes as Attributes
import TypedSvg.Core exposing (Svg)
import TypedSvg.Types exposing (Fill(..), px)


type alias Model =
  { positions : List Vec2
  }


type Msg
  = GetStep Time.Posix
  | NewStep ( Float, Float )


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


defaultPosition : Vec2
defaultPosition =
  Vector2.vec2 300 300


stepCmd : Cmd Msg
stepCmd =
  let
    step =
      Random.float -3 3
  in
  Random.generate NewStep <| Random.pair step step


init : () -> ( Model, Cmd Msg )
init _ =
  ( { positions = [ defaultPosition ]
    }
  , stepCmd
  )


view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px 600)
    , Attributes.height (px 600)
    , Attributes.viewBox 0 0 600 600
    ]
  <|
    List.map
      point
      model.positions


point : Vec2 -> Svg Msg
point position =
  let
    { x, y } =
      Vector2.toRecord position
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px 3)
    , Attributes.fill <| Fill Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 100 GetStep


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    GetStep _ ->
      ( model
      , stepCmd
      )

    NewStep ( x, y ) ->
      let
        position =
          Maybe.withDefault defaultPosition <| List.head model.positions

        delta =
          6

        newPosition =
          Vector2.add position <| Vector2.fromRecord
            { x = toFloat <| round x * delta
            , y = toFloat <| round y * delta
            }
      in
      ( { model
        | positions =
          newPosition :: model.positions
        }
      , Cmd.none
      )
